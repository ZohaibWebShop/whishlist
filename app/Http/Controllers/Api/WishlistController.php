<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Wishlist;
use App\Models\WishlistProduct;
use App\Models\WishlistToken;
use App\Models\User;
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
                    $products = $shopify->setCurrency($request->currency)
                            ->setCurrencyRate($request->rate)
                            ->setParams(['ids'=> $productIds,'fields'=>'id,title,handle,image,variants'])
                            ->getPriceList()
                            ->getProductByIds();

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


    function getWishlishOny(Request $request) {
        # get wishlist from wishlist table
        $wishlistToken = WishlistToken::with('wishlists')->where('wishlist_token', $request->token)->first();
        if($wishlistToken){
            $wishlistWithProductsCount = [];
            foreach($wishlistToken->wishlists as $wishlist){
                $wishlistWithProductsCount[] = [
                    'wishlist_id' => $wishlist->id,
                    'name'=>$wishlist->name,
                    'default'=>$wishlist->default,
                    'product_count' => count($wishlist->products)
                ];
            }
            return [
                "errors"=>false,
                "token"=>$request->token,
                'data' => $wishlistWithProductsCount
            ];
        } else {
            return [
                'errors' => true,
                'message' => "Token Not found"
            ];
        }



    }

    function getWishlistAll(Request $request) {
        $isToken = WishlistToken::with('wishlists')->where('wishlist_token', $request->token)->first();
        if($isToken){
            $Wishlist = [];
            foreach($isToken->wishlists as $wishlist){
                if(count($wishlist->products) > 0){
                    $productIds = $this->getWishlistProductId($wishlist->products);
                    $shopify = new ShopifyServices($request->shop);
                    $products = $shopify->setParams(['ids'=>$productIds])
                            ->setCurrency($request->currency)
                            ->setCurrencyRate($request->rate)
                            ->getPriceList()
                            ->getProductByIdsFull();
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



    function wishlistFilter(Request $request){
        $productService = new ProductFilterService($request);
        return $productService->filterd();
    }

    function wishlistVendors(Request $request){
        $productService = new ProductFilterService($request);
        return $productService->wishlistVendors();
    }

    function wishlistFilterTest(Request $request){
        $shopify = new ShopifyServices($request->shop);
        $priceList = $shopify->marketByGeography('CA')['priceList'];
        if(is_array($priceList) && array_key_exists('parent', $priceList)){
            return (int)$priceList['parent']['adjustment']['value'];
        }
        return 0;
    }


    function getProduct(Request $request, $id)  {
        $shopify = new ShopifyServices($request->shop);
        $product = $shopify->setCurrency($request->currency)
            ->setCurrencyRate($request->rate)
            ->getPriceList()
            ->getProductById($id);
        return $product;
    }
}
