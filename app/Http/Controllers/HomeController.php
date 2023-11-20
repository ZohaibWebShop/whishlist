<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Artisan;


class HomeController extends Controller
{
    function index() {
        return Inertia::render('Home');
   }

    function about() {
       return Inertia::render('About');
    }

    function wishlists($customer_id) {
        return Inertia::render('Wishlists', [
            'customer_id'=>$customer_id
        ]);
     }

     function Products($customer_id, $wishlist_id) {
        return Inertia::render('Products', [
            'customer_id'=>$customer_id,
            'wishlist_id'=>$wishlist_id
        ]);
     }

}
