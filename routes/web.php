<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// Route::get('/', [HomeController::class, 'index']);
// Route::get('/', function () {
//     return view('welcome');
// })->middleware(['verify.shopify'])->name('home');

// Route::get('/inertia', [HomeController::class, 'index']);

Route::middleware(['verify.shopify'])->group(function () {
    Route::get('/', [HomeController::class, 'index'])->name('home');
    Route::get('/customer/{customer_id}/wishlists', [HomeController::class, 'wishlists'])->name('wishlists');
    Route::get('/customer/{customer_id}/wishlist/{wishlist_id}', [HomeController::class, 'Products'])->name('wishlist.products');
});


Route::get('/artisan/{command}', function($command) {
    try {
     return Artisan::call($command);
    } catch (\Exception $e) {
         return [
             'errors'=>true,
             'message'=>$e->getMessage()
         ];
    }
});
