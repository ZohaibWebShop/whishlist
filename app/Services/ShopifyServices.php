<?php



namespace App\Services;

use App\Models\User;
use App\Models\WishlistProduct;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;

class ShopifyServices{


    private $shop;

    public $error = [];

    protected $params = [];

    protected $currency = 'CAD';

    public $currencyRate = 0;

    public $currencyToCountry = [
        'USD' => 'US',
        'CAD' => 'CA',
    ];

    protected $priceList = [];


    public $wishlist_id = null;

    public $product_type = [];



    function __construct($shop=null)
    {
        if(Auth::check()){
            $this->shop = Auth::user();
        }else{
            $user = User::where('name', $shop)->first();
            $this->shop = $user;
        }
    }

    function setParams($param) {
        $this->params = $param;
        return $this;
    }

    function setCurrency($currency) {
        $this->currency = $currency;
        return $this;
    }

    function setCurrencyRate($rate) {
        $this->currencyRate = \floatval($rate);
        return $this;
    }

    function setProductType($param) {
        $this->product_type = $param;
        return $this;
    }

    function wishlistId($id) {
        $this->wishlist_id = $id;
        return $this;
    }

    protected function getParams()  {
        return $this->params;
    }


    function getProductById($id) {
        $response = [];
        $products = $this->shop->api()->rest('GET', "/admin/api/2023-07/products/{$id}.json");
        if($products['status'] == 200){
            $product = $products['body']['product'];
            $variant_r = collect($product['variants'])->map(function ($variant) {
                // Calculate the total price based on your logic
                $variant['price'] = $this->converter($variant['price']);
                $variant['compare_at_price'] = $this->converter($variant['compare_at_price']); // Example calculation
                return $variant;
            })->sortBy('price')->values()->toArray();
            $product['url'] = "/products/{$product['handle']}";
            $product['variants'] = $variant_r;
            $minVar = $this->getMinPrice($variant_r);
            $maxVar = $this->getMaxPrice($variant_r);
            $product['min_price'] = $this->converter($minVar['price']);
            $product['max_price'] = $this->converter($maxVar['price']);
            $product['available'] = collect($product['variants'])->sum('inventory_quantity') > 0 ? true:false;
            return $product;
        }else{
            $this->error = $products;
        }

        return $response;
    }

    function getFilterVariantByType($variants){
        $variantCollection = collect($variants);

        $type = str_replace("giftset", "gift set", collect($this->product_type)->first());
        if(!empty($type)){
            $filterVariant = $variantCollection->filter(function($v) use($type){
                return \str_contains(strtolower($v['title']), strtolower($type));
            })->values()->toArray();
            return $filterVariant;
        }

        return $variants;
    }

    function getMinPrice($variants){
        // $getFilterVariantByType = $this->getFilterVariantByType($variants);
        $variantCollection = collect($variants);

          $minPrice =   $variantCollection->filter(function ($variant) {
                return $variant['inventory_quantity'] > 0;
            })
            ->min('price');

            if(!is_null($minPrice)){
                $variant = $variantCollection->where('price', $minPrice)->values()->first();
            }else{
                $variant = $variantCollection->first();
            }

            return $variant;
    }


    function getMaxPrice($variants){
        $variantCollection = collect($variants);

          $minPrice =   $variantCollection->max('price');

            if(!is_null($minPrice)){
                $variant = $variantCollection->where('price', $minPrice)->values()->first();
            }else{
                $variant = $variantCollection->first();
            }

            return $variant;
    }


    function getProductByIds() {
        $response = [];
        $shopDomain = $this->shop->name;
        $params = $this->getParams();
        $products = $this->shop->api()->rest('GET', '/admin/api/2023-07/products.json', $params);
        if($products['status'] == 200){
            $products = $products['body']['products'];
            foreach($products as $product){

                    $varCol = $this->getMinPrice($product['variants']);

                    $response[] = [
                        'id'=>$product['id'],
                        'title'=>$product['title'],
                        'handle'=>$product['handle'],
                        'image'=>isset($product['image']['src'])?$product['image']['src']:'https://cdn.shopify.com/s/files/1/0215/6845/4756/products/FragFlex_20Image_20Coming_20Soon_a609ebe0-1688-455b-a1a8-0f2a23c5a362.jpg?v=1697609743',
                        'url'=>"/products/{$product['handle']}",
                        'variant_id'=>$varCol->id,
                        'sku'=>$varCol->sku,
                        "price"=>$this->converter($varCol->price),
                        "compare_at_price"=>$this->converter($varCol->compare_at_price),
                        "available"=>$varCol->inventory_quantity > 0 ? true:false,
                    ];
            }

            return $response;
        }else{
            $this->error = $products;
        }

        return $response;
    }

    function getProducts($fulldata=false) {
        $response = [];
        $shopDomain = $this->shop->name;
        $params = $this->getParams();
        $products_r = $this->shop->api()->rest('GET', '/admin/api/2023-07/products.json', $params);
        if($products_r['status'] == 200){
            $product = [];
            if($fulldata){
                 return [
                    "products"=>$products_r['body']['products'],
                    "next_page"=>!is_null($products_r['link'])?$products_r['link']['next']:null,
                 ];
            }else{
                return $products_r['body']['products'];

            }
        }else{
            return $products_r;
        }

    }

    function addTagIntotags($tags, $value) {
        if(empty($tags)){
            return $value;
        }else{
            $tags .= ",{$value}";
            return $tags;
        }
    }
    function textContain($text, $value)  {
       return strpos($text, $value) !== false;
    }

    function getProductByIdsFull() {
        $response = [];
        $params = $this->getParams();
        $products = $this->shop->api()->rest('GET', '/admin/api/2023-07/products.json', $params);
        if($products['status'] == 200){
            $products = $products['body']['products'];
            $shopDomain = $this->shop->name;
            foreach($products as $key => $product){


                if(!is_null($this->wishlist_id)){
                    $wishlist = WishlistProduct::where('wishlist_id', $this->wishlist_id)->where('product_id', $product['id'])->first();
                    $product['wishlist_created_at'] = date('Y-m-d H:i:s', strtotime($wishlist->created_at));
                }

                $product['url'] = "/products/{$product['handle']}";
                $variants = collect($product['variants'])->toArray();
                $minVar = $this->getMinPrice($product['variants']);
                $maxVar = $this->getMaxPrice($product['variants']);
                $product['min_price'] = $this->converter($minVar['price']);
                $product['max_price'] = $this->converter($maxVar['price']);
                $type = collect($this->product_type)->first();
                $product['min_compare_at_price'] = $this->converter($minVar['compare_at_price']);
                $product['max_compare_at_price'] = $this->converter($maxVar['compare_at_price']);
                $product['available'] = collect($product['variants'])->sum('inventory_quantity') > 0 ? true:false;
                $variants_genrated = [];
                foreach($product['variants'] as $key => $variant){
                    if(strtolower(substr($variant['sku'], -1)) == 'b') {
                        if(!str_contains($product['tags'], 'boxed')){
                            $product['tags'] = $this->addTagIntotags($product['tags'], 'boxed');
                        }
                    }


                    if(strtolower(substr($variant['sku'], -1)) == 'd') {
                        if(!str_contains($product['tags'], 'decant')){
                            $product['tags'] = $this->addTagIntotags($product['tags'], 'decant');
                        }
                    }


                }

                $variant_r = collect($variants)->map(function ($variant) {
                    // Calculate the total price based on your logic
                    $variant['price'] = $this->converter($variant['price']);
                    $variant['compare_at_price'] = $this->converter($variant['compare_at_price']); // Example calculation
                    return $variant;
                })->all();
                $product['variants'] = $variant_r;
                $response[] = $product;
            }
        }else{
            $this->error = $products;
        }

        return $response;
    }

    function getProductCount() {
        $products = $this->shop->api()->rest('GET', '/admin/api/2023-07/products/count.json');
        return $products;
    }

    function getCustomer($id){
        $customer = $this->shop->api()->rest('GET', "/admin/api/2023-07/customers/{$id}.json");
        if($customer['status'] == 200){
            return $customer['body']['customer'];
        }else{
            return $customer;
        }
    }

    function getCustomers($fulldata=false){
        $params = $this->getParams();
        $customer = $this->shop->api()->rest('GET', "/admin/api/2023-07/customers.json", $params);
        if($customer['status'] == 200){
            // return $customer['body']['customers'];
            if($fulldata){
                return [
                   "customers"=>$customer['body']['customers'],
                   "next_page"=>!is_null($customer['link'])?$customer['link']['next']:null,
                ];
           }else{
               return $customer['body']['customers'];
           }
        }else{
            return $customer;
        }
    }


    function getShop(){
        $shop = $this->shop->api()->rest('GET', "/admin/api/2023-07/shop.json");
        if($shop['status'] == 200){
            return $shop['body']['shop'];
        }else{
            return $shop;
        }
    }

    function getPriceList() {
        $currency = $this->currency;
        $currencyToCountry = $this->currencyToCountry;
        $country_code =  $this->currencyToCountry[$currency];
        $this->priceList = Cache::remember("priceList_".$country_code, now()->addMinutes(30), function () use ($country_code) {
            return $this->marketByGeography($country_code)['priceList'];
        });

        return $this;
    }

    function converter($price){

        $priceList = $this->priceList;
        $adjustment_value = 0;

        if(is_array($priceList) && array_key_exists('parent', $priceList)){
            $adjustment_value = (int)$priceList['parent']['adjustment']['value'];
        }

        if(!is_null($priceList)){
            $price_actual = ($price * $this->currencyRate);
            $culculated = ceil($price_actual + (($price_actual / 100) * $adjustment_value));
           return number_format($culculated, 2);
        }else{
            return $price;
        }
    }

    function marketByGeography($countryCode) {
        $graphqlQuery = <<<GRAPHQL
                {
                    marketByGeography(countryCode:$countryCode){
                        name
                        primary
                        priceList{
                            parent{
                                adjustment{
                                    type
                                    value
                                }
                            }
                        }
                    }
                }
            GRAPHQL;

        $response = $this->shop->api()->graph($graphqlQuery);
        if($response['status'] == 200){
            return (array)$response['body']['data']['marketByGeography']['container'];
        }

        return [];
    }




}
