<?php



namespace App\Services;

use App\Models\User;
use App\Models\WishlistProduct;
use Illuminate\Support\Facades\Auth;

class ShopifyServices{


    private $shop;

    public $error = [];

    protected $params = [];

    protected $currency = 'CAD';

    public $wishlist_id = null;



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
            $response = [
                'id'=>$product['id'],
                'title'=>$product['title'],
                'handle'=>$product['handle'],
                'image'=>$product['image']['src'],
                'variant_id'=>$product['variants']['0']['id'],
                'sku'=>$product['variants']['0']['sku'],
                'price'=>$product['variants']['0']['price']
            ];
        }else{
            $this->error = $products;
        }

        return $response;
    }

    function getMinPrice($variants){
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
                        'image'=>$product['image']['src'],
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

    function getProducts() {
        $response = [];
        $shopDomain = $this->shop->name;
        $params = $this->getParams();
        $products = $this->shop->api()->rest('GET', '/admin/api/2023-07/products.json', $params);
        if($products['status'] == 200){
            $products = $products['body']['products'];
        }

        return $products;
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
                $product['available'] = collect($product['variants'])->sum('inventory_quantity') > 0 ? true:false;
                $variants_genrated = [];
                foreach($product['variants'] as $key => $variant){
                    if($this->textContain($variant['title'], 'Boxed')){
                        if(!str_contains($product['tags'], 'boxed')){
                            $product['tags'] = $this->addTagIntotags($product['tags'], 'boxed');
                        }
                    }


                    if($this->textContain($variant['title'], 'Decant')){
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

    function getCustomers(){
        $params = $this->getParams();
        $customer = $this->shop->api()->rest('GET', "/admin/api/2023-07/customers.json", $params);
        if($customer['status'] == 200){
            return $customer['body']['customers'];
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



    function converter($price){
        if($this->currency == 'USD'){
           return number_format(round((floatval($price) / 1.333) / 0.95), 2, '.', '');
        }else{
            return $price;
        }
    }

}
