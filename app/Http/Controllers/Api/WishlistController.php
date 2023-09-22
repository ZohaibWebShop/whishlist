<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Wishlist;
use App\Models\WishlistProduct;
use App\Models\WishlistToken;
use App\Services\ShopifyServices;
use App\Services\ProductFilterService;
use App\Services\UserService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use SebastianBergmann\Type\TrueType;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;
use AmrShawky\LaravelCurrency\Facade\Currency;

class WishlistController extends Controller
{

    function showAll(Request $request) {
        $isToken = WishlistToken::with('wishlists')->where('wishlist_token', $request->token)->first();

        if($isToken){
            $Wishlist = [];
            foreach($isToken->wishlists as $key => $wishlist){
                if(count($wishlist->products) > 0){
                    $productIds = $this->getWishlistProductId($wishlist->products);
                    $shopify = new ShopifyServices($request->shop);
                    $shopify->setCurrency($request->currency);
                    $shopify->setParams(['ids'=> $productIds,'fields'=>'id,title,handle,image,variants']);
                    $products = $shopify->getProductByIds();
                    $Wishlist[] = [
                       'id'=>$wishlist->id,
                       'name'=>$wishlist->name,
                       'default'=>$wishlist->default,
                       'products'=>$products
                    ];
                }else{
                    $Wishlist[] = [
                        'id'=>$wishlist->id,
                        'name'=>$wishlist->name,
                        'default'=>$wishlist->default,
                        'products'=>[]
                     ];
                }
            }


            return [
              'wishlist_token'=>$isToken->wishlist_token,
              'token_expiration'=>$isToken->token_expiration,
              'wishlists'=>$Wishlist
            ];


        }


        return [
            'errors'=>false,
            'message'=>"Token Not found"
        ];
    }

    function getWishlistAll(Request $request) {
        $isToken = WishlistToken::with('wishlists')->where('wishlist_token', $request->token)->first();
        if($isToken){
            $Wishlist = [];
            foreach($isToken->wishlists as $wishlist){
                if(count($wishlist->products) > 0){
                    $productIds = $this->getWishlistProductId($wishlist->products);
                    $shopify = new ShopifyServices($request->shop);
                    $shopify->setParams(['ids'=>$productIds]);
                    $shopify->setCurrency($request->currency);
                    $products = $shopify->getProductByIdsFull();
                    $Wishlist[] = [
                       'id'=>$wishlist->id,
                       'name'=>$wishlist->name,
                       'default'=>$wishlist->default,
                       'products'=>$products
                    ];
                }else{
                    $Wishlist[] = [
                        'id'=>$wishlist->id,
                        'name'=>$wishlist->name,
                        'default'=>$wishlist->default,
                        'products'=>[]
                     ];
                }
            }

            return [
                'wishlist_token'=>$isToken->wishlist_token,
                'token_expiration'=>$isToken->token_expiration,
                'wishlists'=>$Wishlist
              ];
        }

        return [
            'errors'=>false,
            'message'=>"Token Not found"
        ];

     }

    function createWishlist(Request $request) {
        $name = $request->name;
        $token = $request->token;
        $isToken = WishlistToken::where('wishlist_token', $token)->first();

        if($isToken){
            $createWishlist = Wishlist::create([
                'name'=>$name,
                'wishlist_token_id'=>$isToken->id,
                'default'=>false
            ]);

            return response()->json([
                'errors'=>true,
                'message'=>'Wishlist Created Successfully',
                'id'=>$createWishlist->id,
                'name'=>$createWishlist->name
            ]);
        }else{
            return response()->json([
                'errors'=>true,
                'message'=>'Token could not be founded in our database'
            ]);
        }
    }

    function storeWishlist(Request $request) {
        $token = $request->token;
        $product_id = $request->product_id;
        $wishlist_id = null;
        if($request->has('wishlist_id')){
            $wishlist_id = $request->wishlist_id;
        }


        $wishlist = WishlistToken::where('wishlist_token', $token)->first();

        if($wishlist && is_null($wishlist_id)){
            $defaultWishlist =  Wishlist::where('wishlist_token_id', $wishlist->id)->where('default', 1)->first();
            $wishlistCreate = WishlistProduct::create([
                'product_id'=>$product_id,
                'wishlist_id'=>$defaultWishlist->id
           ]);

            return response()->json([
                'errors'=>false,
                'message'=>'Product Add To Wishlist successfully',
                'data'=>$wishlistCreate
            ]);
        }else{

            if($wishlist){

                $wishlist = Wishlist::where('id', $wishlist_id)->first();
                $wishlistCreate = WishlistProduct::create([
                    'product_id'=>$product_id,
                    'wishlist_id'=>$wishlist->id,
                ]);

                 return response()->json([
                    'errors'=>false,
                    'message'=>'Product Add To Wishlist successfully',
                ]);
            }

            return response()->json([
                'errors'=>true,
                'message'=>'No Wishlist Exists'
            ], 200);

        }


     }

    function getWishlistProductId($wishlistProduct) {
        $ids = [];
        $dates = [];
        foreach($wishlistProduct as $product){
            $ids[] = $product->product_id;
        }

        if(count($ids) > 0){
            return  implode(",", $ids);
        }

        return false;
    }

    function ceateToken(Request $request) {

        $request->validate([
            'token'=>['required']
        ]);


        $is_customer = WishlistToken::where('customer_id', $request->customer_id)->first();

        if(!$is_customer){
            $isToken = WishlistToken::where('wishlist_token', $request->token)->first();
            if(!$isToken){
                $tokenExpiration = now()->addDays(5);
                if($request->has('token_expiration')){
                    $tokenExpiration = Carbon::createFromFormat('d-m-Y h:i A', $request->token_expiration);
                }
                $customer_id = null;
                if($request->has('customer_id')){
                    $customer_id = $request->customer_id;
                }

                $userService = new UserService();
                $ip = $userService->getIp();

                $token = WishlistToken::create([
                    'wishlist_token'=>$request->token,
                    'token_expiration'=>$tokenExpiration->format('Y-m-d H:i:s'),
                    'user_ip'=>$ip,
                    'customer_id'=>$customer_id
                ]);

                if($token){
                    $wishlist = Wishlist::create([
                        'name'=>"My Wishlist",
                        'wishlist_token_id'=>$token->id,
                        'default'=>true
                    ]);

                    return $token;
                }
            }

            return response()->json([
                'errors'=>true,
                'message'=>"token already registerd",
                'token'=>$isToken
            ]);
        }

        return $is_customer;
    }

    function  updateWishlistExpireDate(Request $request) {
        $token = $request->input('token');

        $isToken = WishlistToken::where('wishlist_token', $token)->first();

        if($isToken){

            if($request->has('token_expiration')){
                $isToken->token_expiration = Carbon::parse($request->token_expiration)->format('Y-m-d H:i:s');
            }else{
                $isToken->token_expiration = now()->addDays(5)->format('Y-m-d H:i:s');
            }

            return response()->json([
                'errors'=>false,
                'message' => 'Expiration dates updated successfully',
                'updated_records' =>$isToken
            ]);
        }

        return response()->json([
            'errors'=>true,
            'message' => 'No Record found with this token',
        ]);
    }


    function setWishlistDefault(Request $request) {
        $request->validate([
            'token'=>['required'],
            'wishlist_id'=>['required']
        ]);

        $isToken = WishlistToken::where('wishlist_token', $request->token)->first();

        if($isToken){


            $Wishlists = Wishlist::where('wishlist_token_id', $isToken->id)->where('default', 1)->update([
                'default'=>0,
            ]);

            if($Wishlists){
                Wishlist::where('wishlist_token_id', $isToken->id)->where('id', $request->wishlist_id)->update([
                    'default'=>1
                ]);

                return response()->json([
                    'errors'=>false,
                    'message'=>"Wishlist Set To Default Successfully"
                ]);
            }



        }else{
            return response()->json([
                'errors'=>true,
                'message'=>"Token not exist in our database",
            ], 200);
        }
    }

    function wishlistProductDelete(Request $request) {
          $wishlist_id = $request->wishlist_id;
          $product_id = $request->product_id;

         $deleteWishlist = WishlistProduct::where([
            'product_id'=>$product_id,
            'wishlist_id'=>$wishlist_id
          ])->delete();

          if($deleteWishlist){
            return response()->json([
                'errors'=>false,
                'message'=>"Product Delete from Wishlist"
            ]);
          }

          return response()->json([
            'errors'=>true,
            'message'=>'Some Wrong!'
          ]);
    }

    function DeleteWishlist(Request $request){
        $wishlist_id = $request->wishlist_id;
        $deleteWishlistProduct = WishlistProduct::where('wishlist_id', $wishlist_id);
        if($deleteWishlistProduct->count() > 0){
            $deleteWishlistProduct->delete();
        }

        $deleteWishlist = Wishlist::where('id', $wishlist_id)->delete();
        return response()->json([
            'errors'=>false,
            'message'=>"Wishlist Delete Successfully"
        ]);
    }

    function clearAllWishlist(Request $request){
        $token = $request->token;
        $deleteWishlist = WishlistToken::where('wishlist_token', $token)->first();
        if(count($deleteWishlist) > 0){
            $deleteWishlist = Wishlist::where('id', $deleteWishlist->id)->get();
            foreach($deleteWishlist as $wishlist){
                $wishlist->products()->delete();
                $wishlist->delete();
            }

            return response()->json([
                'errors'=>false,
                "message"=>'All wishlist attached with this token was clear'
            ], 200);

        }else{
            return response()->json([
                'errors'=>true,
                "message"=>'no wishlist attached with this token'
            ], 200);
        }
    }

    function fillter(Request $request){
        return [];
    }


    function getGender($type=null) {
        if(is_null($type) || strtolower($type) == 'man/woman' || strtolower($type) == 'woman/man'){
            return ['For Man/Woman', 'For Man', 'For Woman'];
        }elseif(strtolower($type) == "man"){
            return ['For Man', 'For Man/Woman'];
        }elseif(strtolower($type) == "woman"){
            return ['For Woman', 'For Man/Woman'];
        }
    }

    function wishlistFilter(Request $request){
        $productService = new ProductFilterService($request);
        return $productService->filterd();
    }

    function wishlistFilterTest(Request $request){
        $productService = new ProductFilterService($request);
        return $productService->filterd();
    }



    function priceRangeFilter($products, $min, $max) {
        return $products->whereBetween('min_price', [$min, $max])->values()->toArray();
    }


    function inStockProducts($products) {
        return $products->filter(function ($product)  {

            $varaints = $product->variants;
            $variants_final = [];

            foreach($varaints as $variant){
                if($variant->inventory_quantity > 0){
                    $variants_final[] = $variant;
                }
            }

            if(count($variants_final) > 0){
                $product->variants = $variants_final;
                return $product;
            }


        })->values()->toArray();
    }

    function outOfStockProducts($products) {
        return $products->filter(function ($product)  {
            $varaints = collect($product->variants);
            $quatity = $varaints->sum('inventory_quantity');
            if($quatity == 0){
                return $product;
            }
        })->values()->toArray();
    }


    function FilterStock($products, $stock, $request) {
        if(!empty($stock)){
            if($stock == 1){
                return $this->inStockProducts($products);
            }else if($stock == 0 && !is_null($request)){
                return $this->outOfStockProducts($products);
            }
        }else{
            return $products->toArray();
        }

    }


    function getVendors(Request $request) {
        $params = [
            "fields"=>"vendor",
            "limit"=>250
        ];
        $shopify = new ShopifyServices($request->shop);
        $shopify->setParams($params);
        $products = (array)$shopify->getProductByIdsFull()['container'];
        $uniqueVendors = array_unique(array_column($products, 'vendor'));
        $uniqueVendors = array_values($uniqueVendors);
        return $uniqueVendors;
    }
    function extractVariantPrice($product) {
        return floatval($product["variants"][0]["price"]);
    }

    function sort($products, $sortType) {
        switch($sortType){
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



    function filterByGender($products, $genderToFilterBy) {
        $filter = $products->filter(function ($product) use ($genderToFilterBy) {
            return in_array($product['product_type'], $genderToFilterBy);
        })->values();

        return $filter->toArray();
    }

    function filterByVendor($products, $vendorToFilterBy){
        $filter = $products->filter(function ($product) use ($vendorToFilterBy) {
            return in_array($product['vendor'], $vendorToFilterBy);
        })->values();

        return $filter->toArray();
    }

    function doesAnyValueExistInSecondArray($firstArray, $secondArray) {
        return false;
    }

    function filterByType($products, $typeToFilterBy){
        $filter = $products->filter(function ($product) use($typeToFilterBy){
            $tags = explode(",", $product['tags']);
            $tagsToLower = $this->arrayToLoweCase($tags);
            $typeToFilterByToLowercase = $this->arrayToLoweCase($typeToFilterBy);
            $intersection = array_intersect($tagsToLower, $typeToFilterByToLowercase);
            return !empty($intersection);
        })->values();

        return $filter->toArray();
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
}
