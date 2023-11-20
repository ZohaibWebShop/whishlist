<?php



namespace App\Services;

use Illuminate\Support\Collection;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\WishlistToken;
use App\Models\WishlistProduct;
use App\Services\ShopifyServices;


class ProductFilterService{

    protected $request;

    public $currency = 'USD';

    public $response = [];

    public $vendors = [];

    public $shopify;

    public $minPrice = 0;
    public $maxPrice = 1000;


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
        return $this->request->stock;
    }

    function getSort()  {
        return (int)$this->request->sort;
    }

    function getMinPrice()  {
        return (float)$this->request->price_min;
    }

    function getMaxPrice()  {
       return (float)$this->request->price_max;
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
        if($this->request->has($input) && !empty($this->request->get($input))){
            if(gettype($this->request->get($input)) == "integer"){
                return true;
            }else{
                return true;
            }
        }
        return false;
    }

    function per_page()  {
        if($this->hasFilter('per_page')){
            return (int)$this->request->per_page;
        }

        return 12;
    }

    function page_offset()  {
        if($this->hasFilter('page')){
            $page = (int)$this->request->page;
            return ($page - 1) * $this->per_page();
        }

        return (1 - 1) * $this->per_page();
    }

    function current_page()  {
        if($this->hasFilter('page')){
            $page = (int)$this->request->page;
            return $page;
        }

        return 1;
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
        $params['limit'] = 250;
        $this->shopify = $shopify;
        $products = $shopify->setParams($params)
                ->setCurrency($this->getCurrency())
                ->setCurrencyRate($this->request->rate)
                ->setProductType($this->request->type)
                ->wishlistId($this->getWishlistId())
                ->getPriceList()
                ->getProductByIdsFull();

        $minPrice_array = collect($products)->map(function($product){
            return $product['min_price'];
        })->sort()->values();

        $this->minPrice = floor((float)$minPrice_array->first());
        $this->maxPrice = ceil($minPrice_array->last());
        return $products;
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

    function filterByGender($products) {
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
            if($stock == 'is'){
                  $filter = $products->filter(function ($product){
                        $varaints = collect($product->variants);
                        $quatity = $varaints->sum('inventory_quantity');
                        return $quatity > 0;
                 })->values();
                 return $filter->toArray();
            }else{
                $filter = $products->filter(function ($product){
                    $varaints = collect($product->variants);
                    $quatity = $varaints->sum('inventory_quantity');
                    return $quatity == 0;
                })->values();
                 return $filter->toArray();
            }
        }

        return $products->toArray();

    }

    function filterByPrice($products) {
        $minPrice = 0;
        $maxPrice = 500;

        $minPrice_array = $products->map(function($product){
            return $product['min_price'];
        })->sort()->values();

        if($this->hasFilter('price_min') && $this->hasFilter('price_max')){
            $minPrice = $this->getMinPrice();
            $maxPrice = $this->getMaxPrice();
        }

        if(!$this->hasFilter('price_min') && $this->hasFilter('price_max')){
            $minPrice = floor($minPrice_array->first());
            $maxPrice = $this->getMaxPrice();
        }

        if($this->hasFilter('price_min') && !$this->hasFilter('price_max')){
            $minPrice =  $this->getMinPrice();
            $maxPrice =  ceil($minPrice_array->last());
        }

        if(!$this->hasFilter('price_min') && !$this->hasFilter('price_max')){
            $minPrice =  floor((float)$minPrice_array->first());
            $maxPrice =  ceil($minPrice_array->last());
        }


        $filteredProducts = $products->filter(function ($product) use ($minPrice, $maxPrice) {
                    $productPrice = (float)$product->min_price;
                    if($productPrice >= $minPrice && $productPrice <= $maxPrice){
                        return $productPrice;
                    }
        });
         return  $filteredProducts->values()->toArray();
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


    function wishlistVendors() {
        $isToken = $this->isWishlistToken($this->getToken());
        if($isToken){
            $wishlists = $this->getWishlistsByToken($isToken);
            if($wishlists){
                if(count($wishlists->products) > 0){
                    $productIds = $this->getWishlistProductIds($wishlists->products);
                    $params['ids'] = $productIds;
                    $params['fields'] = "vendor";
                    $shopify = new ShopifyServices($this->getShop());
                    $products = $shopify->setParams($params)->getProducts();
                    $products = collect($products);
                    $uniqueVendors = $products->pluck('vendor')->unique()->values()->all();
                    return $uniqueVendors;
                }

                return response()->json([
                    'errors'=>true,
                    'message'=>"wishlist dos'nt have products"
                ]);
            }

            return response()->json([
                'errors'=>true,
                'message'=>"please recheck your wishlist and try again!"
            ]);
        }

        return response()->json([
            'errors'=>true,
            'message'=>"please recheck your token and try again!"
        ]);
    }

    function getType($type) {
        switch ($type) {
            case 'boxed':
                return 'b';
                break;
            case 'decant':
                return 'd';
                break;
            case 'tester':
                return 't';
                break;
            case 'giftset':
                return 's';
                break;
            default:
                return '';
                break;
        }
    }

    function filterVariantByType($products){
        if($this->hasFilter('type')){
            // $type = str_replace("giftset", "gift set", collect($this->getTypes())->first());
            $type = collect($this->getTypes())->first();
            $type = $this->getType(strtolower($type));
            $mapProducts = $products->map(function($product) use ($type){
                $variants = collect($product['variants']);
                $product_variants = $variants->filter(function($variant) use($type) {
                    if ($type == 's') {
                        return \str_contains(strtolower(substr($variant['sku'], -1)), $type) || str_contains(strtolower(substr($variant['sku'], -1)), 'm');
                    }
                    return \str_contains(strtolower(substr($variant['sku'], -1)), $type);
                })->values()->toArray();
                if (!empty($product_variants)) {
                    $product['available'] = collect($product_variants)->sum('inventory_quantity') > 0 ? true:false;
                    $minPriceVar = $this->shopify->getMinPrice($product_variants);
                    $maxPriceVar = $this->shopify->getMaxPrice($product_variants);
                    $product['min_price'] = $minPriceVar->price;
                    $product['max_price'] = $maxPriceVar->price;
                    $product['min_compare_at_price'] = $minPriceVar->compare_at_price;
                    $product['max_compare_at_price'] = $maxPriceVar->compare_at_price;
                    $product['variants'] = $product_variants;
                } else {
                    $product['variants'] = [];
                }
                return $product;
            });

            return $mapProducts;
        }

        return collect($products)->toArray();
    }

    function removeProductsEmptyVariants($products) {
        return $products->filter(function ($product) {
            return count($product['variants']) > 0;
        });
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
                    $products = $this->filterByGender(collect($products));
                    $products = $this->filterVariantByType(collect($products));
                    $products = $this->removeProductsEmptyVariants(collect($products));
                    $prices = $this->filterByPrice(collect($products));
                    $products = $this->filterByStock(collect($products));
                    $products = $this->SortManual(collect($products));



                    if(count($products)){
                        $this->vendors = collect($products)->pluck('vendor')->unique()->values()->all();
                        $minPrice_array = collect($products)->map(function($product){
                            return $product['min_price'];
                        })->sort()->values();

                        $this->minPrice = floor((float)$minPrice_array->first());
                        $this->maxPrice = ceil($minPrice_array->last());
                    }

                    $collection = new Collection($products);
                    $totalItems = $collection->count();

                    $currentPageItems = $collection->slice($this->page_offset(), $this->per_page())->values();

                    $this->setResponse([
                        "token"=>$isToken->wishlist_token,
                        "wishlist_id"=>$wishlists->id,
                        "name"=>$wishlists->name,
                        'total_products'=>$totalItems,
                        "current_page"=>$this->current_page(),
                        'total_pages' => ceil($totalItems /  $this->per_page()),
                        "products"=>$currentPageItems,
                        "vendors"=>$this->vendors,
                        "min_price"=>$this->minPrice,
                        "max_price"=>$this->maxPrice,
                        "prices"=>$prices
                    ]);
                }else{
                    $this->setResponse([
                        "token"=>$isToken->wishlist_token,
                        "wishlist_id"=>$wishlists->id,
                        "name"=>$wishlists->name,
                        'total_products'=>0,
                        "current_page"=>$this->current_page(),
                        'total_pages' =>1,
                        "vendors"=>$this->vendors,
                        "products"=>[]
                    ]);
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
