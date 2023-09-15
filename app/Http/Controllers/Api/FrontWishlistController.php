<?php

namespace App\Http\Controllers\Api;

use App\Models\WishlistToken;
use App\Models\Wishlist;
use App\Services\ShopifyServices;
use App\Http\Controllers\Controller;
use App\Http\Resources\WishlistTokenCollection;
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
        $isRegisterd = WishlistToken::where('customer_id', $customer_id)->first();
        if($isRegisterd){
            $wishlist = Wishlist::with('products')->where('wishlist_token_id', $isRegisterd->id)->get();
            return response()->json($wishlist, 200);
        }

        return [];

    }

}
