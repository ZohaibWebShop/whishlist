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
        $query = WishlistToken::with('WishlistsCount');

        if($request->has('sort')){
            $query->orderBy('id', str_replace('order ', '', $request->sort));
        }

        if($request->has('query')){
            $searchTerm = $request->input('query');
            $query->where('customer_id',  'LIKE', '%' . $searchTerm . '%');
        }

        return new WishlistTokenCollection($query->paginate());
    }

    function getWishlists(Request $request, $customer_id) {
        $shop = $request->shop;
        $isRegisterd = WishlistToken::where('customer_id', $customer_id)->first();
        if($isRegisterd){
            $query = Wishlist::with('products')->where('wishlist_token_id', $isRegisterd->id);
            if($request->has('sort')){
                $query->orderBy('id', str_replace('order ', '', $request->sort));
            }

            if($request->has('query')){
                $searchTerm = $request->input('query');
                $query->where('name',  'LIKE', '%' . $searchTerm . '%');
            }

            return new WishlistCollection($query->paginate());
        }

        return [];
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
