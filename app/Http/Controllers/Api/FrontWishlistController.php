<?php

namespace App\Http\Controllers\Api;

use App\Models\WishlistToken;
use App\Models\Wishlist;
use App\Models\WishlistProduct;
use App\Services\ShopifyServices;
use App\Http\Controllers\Controller;
use App\Http\Resources\WishlistTokenCollection;
use App\Http\Resources\WishlistCollection;
use App\Http\Resources\WishlistProductCollection;
use Illuminate\Http\Request;

class FrontWishlistController extends Controller
{
    function GetCustomers(Request $request) {
        $shop = $request->shop;
        $shopifySerivice = new ShopifyServices($request->shop);
        $wishlists = WishlistToken::with('WishlistsCount')->get();

        $customers = $wishlists->map(function($wishlist){
            return $wishlist['customer_id'];
        });

        $customer_ids = implode(',', $customers->toArray());
        $shopifySerivice->setParams(['ids'=>$customer_ids,'fields'=>"id,email,first_name,last_name"]);
        $customers = collect($shopifySerivice->getCustomers());

        $wishlists->transform(function ($item) use($customers) {
            $customer_id =  $item['customer_id'];

            $item['customer'] = $customers->filter(function($customer) use($customer_id){
                return $customer['id'] == $customer_id;
            })->values()->first();
            return $item;
        });

        return $wishlists;
    }

    function getWishlists(Request $request, $customer_id) {
        $shop = $request->shop;
        $isRegisterd = WishlistToken::where('customer_id', $customer_id)->first();
        $query = Wishlist::with('products')->where('wishlist_token_id', $isRegisterd->id);
        return $query->get();
    }

    function getProducts(Request $request, $customer_id, $wishlist_id) {
        $isRegisterd = WishlistToken::where('customer_id', $customer_id)->first();
        $products = WishlistProduct::where('wishlist_id', $wishlist_id)->get();
        $shopifySerivice = new ShopifyServices($request->shop);
        $product_ids_array = $products->map(function($product){
                return $product['product_id'];
        });

        $product_ids = implode(',', collect($product_ids_array)->toArray());
        $shopifySerivice->setParams(['ids'=>$product_ids,'fields'=>"id,title,handle"]);
        $shop_products = collect($shopifySerivice->getProducts());

        $products->transform(function ($item) use($shop_products) {
            $product_id =  $item['product_id'];

            $item['product'] = $shop_products->filter(function($product) use($product_id){
                return $product['id'] == $product_id;
            })->values()->first();
                return $item;
        });

        return $products;
    }

    function deleteCustomer($id) {
        $wishlistToken = WishlistToken::find($id);
        if($wishlistToken){
            $wishlists = $wishlistToken->Wishlists;
            foreach($wishlists as $wishlist){
                $wishlist->products()->delete();
                $wishlist->delete();
            }
            $wishlistToken->delete();
            return \response()->json([
               'errors' =>false,
               "message"=>"wishlist deleted Successfully"
            ]);
        }

        return \response()->json([
            'errors' =>true,
            "message"=>"Wishlist not exist"
         ]);
    }


    function deleteWishlist($id) {
        $wishlists = Wishlist::find($id);
        if($wishlists){
            $wishlists->products()->delete();
            $wishlists->delete();

            return \response()->json([
               'errors' =>false,
               "message"=>"wishlist deleted Successfully"
            ]);
        }

        return \response()->json([
            'errors' =>true,
            "message"=>"Wishlist not exist"
         ]);
    }

    function deleteProduct($id) {
        $product = WishlistProduct::find($id);
        if($product){
            $product->delete();

            return \response()->json([
               'errors' =>false,
               "message"=>"product deleted Successfully"
            ]);
        }

        return \response()->json([
            'errors' =>true,
            "message"=>"Product not exist"
         ]);
    }

}
