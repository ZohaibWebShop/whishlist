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
        if($isRegisterd){
            $query = WishlistProduct::where('wishlist_id', $wishlist_id);
            if($request->has('sort')){
                $query->orderBy('id', str_replace('order ', '', $request->sort));
            }

            if($request->has('query')){
                $searchTerm = $request->input('query');
                $query->where('name',  'LIKE', '%' . $searchTerm . '%');
            }
            return new WishlistProductCollection($query->paginate());
        }

        return [];
    }

}
