<?php



namespace App\Services;

use App\Models\User;
use App\Models\WishlistProduct;
use Illuminate\Support\Facades\Auth;

class ShopifyServices{


    private $shop;

    public $error = [];

    protected $params = [];

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


    function getProductByIds() {
        $response = [];
        $shopDomain = $this->shop->name;
        $params = $this->getParams();
        $products = $this->shop->api()->rest('GET', '/admin/api/2023-07/products.json', $params);
        if($products['status'] == 200){
            $products = $products['body']['products'];
            foreach($products as $product){

                $variantCollection = collect($product['variants']);

                $minPrice =   $variantCollection->filter(function ($variant) {
                        return $variant['inventory_quantity'] > 0;
                    })
                    ->min('price');

                    $variant = null;
                    if(!is_null($minPrice)){
                        $variant = $variantCollection->where('price', $minPrice)->values()->first();
                    }else{
                        $variant = $variantCollection->first();
                    }

                    $varCol = collect($variant);

                    $response[] = [
                        'id'=>$product['id'],
                        'title'=>$product['title'],
                        'handle'=>$product['handle'],
                        'image'=>$product['image']['src'],
                        'url'=>"/products/{$product['handle']}",
                        'variant_id'=>$varCol->get('id'),
                        'sku'=>$varCol->get('sku'),
                        "price"=>$varCol->get('price'),
                        "compare_at_price"=>$varCol->get('compare_at_price'),
                        "available"=>$varCol->get('inventory_quantity') > 0 ? true:false,
                    ];
            }
        }else{
            $this->error = $products;
        }

        return $response;
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
                $product['min_price'] = min(array_column($variants, "price"));
                $product['max_price'] = max(array_column($variants, "price"));

                foreach($product['variants'] as $variant){
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


}
