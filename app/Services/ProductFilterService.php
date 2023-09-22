<?php



namespace App\Services;

use Illuminate\Support\Collection;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\WishlistToken;
use App\Services\ShopifyServices;


class ProductFilterService{

    protected $request;

    public $currency = 'USD';

    public $response = [];

    function __construct(Request $request)
    {
        $this->request = $request;
        $this->setCurrency($request->currency);
    }

    function getToken()  {
        return $this->request->token;
    }

    function getCurrency()  {
        return $this->currency;
    }

    function getShop()  {
        return $this->request->shop;
    }

    function getWishlistId()  {
        return $this->request->wishlist_id;
    }

    function getVendors()  {
        return $this->request->vendor;
    }

    function getTypes()  {
        return $this->request->type;
    }

    function getGender()  {
        return $this->request->gender;
    }

    function getStock()  {
        return (int)$this->request->stock;
    }

    function getSort()  {
        return (int)$this->request->sort;
    }

    function getMinPrice()  {
        return (int)$this->request->price_min;
    }

    function getMaxPrice()  {
        return (int)$this->request->price_max;
    }

    function setCurrency($currency)  {
        return $this->currency = $currency;
    }

    function isWishlistToken($token) {
        return WishlistToken::where('wishlist_token', $token)->first();
    }

    function getWishlistsByToken($token) {
        return $token->wishlists()->where('id', $this->getWishlistId())->first();
    }

    function hasFilter($input) {
        if($this->request->has($input)){
            if(gettype($this->request->get($input)) == "integer"){
                return true;
            }else{
               if(!empty($this->request->get($input))){
                    return true;
               }

               return false;

            }
        }
        return false;
    }

    function setResponse($data = []) {
        $this->response = $data;
    }

    function getWishlistProductIds($wishlistProduct) {
       $ids = collect($wishlistProduct)->map(function($product){
            return $product->product_id;
        })->toArray();

        if(count($ids) > 0){
            return  implode(",", $ids);
        }
    }

    function getShopProducts($products) {
        $shopify = new ShopifyServices($this->getShop());
        $params['ids'] = $products;
        $shopify->setParams($params);
        $shopify->setCurrency($this->getCurrency());
        $shopify->wishlistId($this->getWishlistId());
        return $shopify->getProductByIdsFull();
    }

    function arrayToLoweCase($array) {
        Collection::macro('toLower', function () {
            return $this->map(function (string $value) {
                return Str::lower(trim($value));
            });
        });
        $collection = collect($array);
        $upper = $collection->toLower()->toArray();
        return $upper;
    }

    function filterByVendor($products) {
        $vendor = $this->getVendors();

        if($this->hasFilter('vendor')){
            $filter = $products->filter(function ($product) use ($vendor) {
                return in_array($product['vendor'], $vendor);
            })->values();

            return $filter->toArray();
        }

        return $products->toArray();
    }

    function filterByType($products) {
        $type = $this->getTypes();

        if($this->hasFilter('type')){
            $filter = $products->filter(function ($product) use ($type) {
                $tags = explode(",", $product['tags']);
                $tagsToLower = $this->arrayToLoweCase($tags);
                $typeToFilterByToLowercase = $this->arrayToLoweCase($type);
                $intersection = array_intersect($tagsToLower, $typeToFilterByToLowercase);
                return !empty($intersection);
            })->values();

            return $filter->toArray();
        }

        return $products->toArray();
    }

    function getGenderArray($type=null) {
        if(is_null($type) || strtolower($type) == 'man/woman' || strtolower($type) == 'woman/man'){
            return ['For Man/Woman', 'For Man', 'For Woman'];
        }elseif(strtolower($type) == "man"){
            return ['For Man', 'For Man/Woman'];
        }elseif(strtolower($type) == "woman"){
            return ['For Woman', 'For Man/Woman'];
        }
    }

    function filterByGender() {
        $gender = $this->getGenderArray($this->getGender());

        if($this->hasFilter('gender')){
            $filter = $products->filter(function ($product) use ($gender) {
                return in_array($product['product_type'], $gender);
            })->values();

            return $filter->toArray();
        }

        return $products->toArray();
    }

    function filterByStock($products) {
        $stock = $this->getStock();

        if($this->hasFilter('stock')){
            $filter = $products->filter(function ($product) use ($stock) {
                $varaints = collect($product->variants);
                $quatity = $varaints->sum('inventory_quantity');
                if($stock == 0 && $quatity == 0){
                    return $product;
                }else if($stock == 1 && $quatity > 0){
                    return $product;
                }
            })->values();

            return $filter->toArray();
        }

        return $products->toArray();
    }

    function filterByPrice($products) {
        $minPrice = $this->getMinPrice();
        $maxPrice = $this->getMaxPrice();

        if($this->hasFilter('price_min') && $this->hasFilter('price_max')){
            $filteredProducts = $products->filter(function ($product) use ($minPrice, $maxPrice) {
                $productPrice = (int)$product->min_price;
                if($productPrice >= $minPrice && $productPrice <= $maxPrice){
                    return $productPrice;
                }
            });
           return  $filteredProducts->values()->toArray();;
        }

        return $products->toArray();
    }

    function SortManual($products) {
        $sort = $this->getSort();

        if($this->hasFilter('sort')){
            switch($sort){
                case 1:
                    $sortedByLatestProduct = $products->sortByDesc('min_price')->values();
                    return $sortedByLatestProduct->toArray();
                    break;
                 case 2:
                    $sortedByLatestProduct = $products->sortBy('min_price')->values();
                    return $sortedByLatestProduct->toArray();
                    break;
                 case 3:
                    return $products->sortByDesc('wishlist_created_at')->values()->toArray();
                    break;
               case 4:
                    return $products->sortByDesc('published_at')->values()->toArray();
                    break;
            };
        }

        return $products->toArray();
    }

    function filterd() {
        $isToken = $this->isWishlistToken($this->getToken());
        if($isToken){
            $wishlists = $this->getWishlistsByToken($isToken);

            if($wishlists){


                if(count($wishlists->products) > 0){
                    $productIds = $this->getWishlistProductIds($wishlists->products);
                    $products = $this->getShopProducts($productIds);
                    $products = $this->filterByVendor(collect($products));
                    $products = $this->filterByType(collect($products));
                    $products = $this->filterByStock(collect($products));
                    $products = $this->filterByPrice(collect($products));
                    $products = $this->SortManual(collect($products));
                    $this->setResponse($products);
                }else{
                    $this->setResponse([]);
                }


            }else{
                $this->setResponse([
                    "errors"=>true,
                    "message"=>"Wishlist not attached with this token"
                ]);
            }

        }else{
            $this->setResponse([
                'errors'=>true,
                'message'=>'Token is not register in our database'
            ]);
        }



        return response()->json($this->response, 200);
    }

}
