<?php

use App\Http\Controllers\Api\WishlistController;
use App\Http\Controllers\Api\FrontWishlistController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('/storeWishlists', [WishlistController::class, 'storeWishlist']);
Route::post('/deleteWishlistProduct', [WishlistController::class, 'wishlistProductDelete']);

Route::post('/getWishlistFilter', [WishlistController::class, 'wishlistFilter']);
Route::post('/filterWishlist', [WishlistController::class, 'wishlistFilter']);
Route::post('/test/filterWishlist', [WishlistController::class, 'wishlistFilterTest']);
Route::get('/vendors', [WishlistController::class, 'getVendors']);


Route::get('/getWishlistFull', [WishlistController::class, 'getWishlistAll']);
Route::get('/getWishlists', [WishlistController::class, 'showAll']);
Route::post('/createWishlist', [WishlistController::class, 'createWishlist']);
Route::post('/createToken', [WishlistController::class, 'ceateToken']);
Route::post('/makeWishlistDefault', [WishlistController::class, 'setWishlistDefault']);
Route::post('/deleteWishlist', [WishlistController::class, 'DeleteWishlist']);
Route::post('/update-expiration', [WishlistController::class, 'updateWishlistExpireDate']);
Route::post('/clear-all', [WishlistController::class, 'clearAllWishlist']);


Route::prefix('front')->group(function(){
    Route::get('/customers', [FrontWishlistController::class, 'GetCustomers'])->name('front.customer');
    Route::get('/customer/{customer_id}/wishlists', [FrontWishlistController::class, 'getWishlists'])->name('front.customer.wishlist');
    Route::get('/customer/{customer_id}/wishlist/{wishlist_id}', [FrontWishlistController::class, 'getProducts'])->name('front.customer.wishlist.products');
    Route::get('/customer/delete/{id}', [FrontWishlistController::class, 'deleteCustomer'])->name('front.customer.delete');
    Route::get('/wishlist/delete/{id}', [FrontWishlistController::class, 'deleteWishlist'])->name('front.wishlist.delete');
    Route::get('/product/delete/{id}', [FrontWishlistController::class, 'deleteProduct'])->name('front.product.delete');
});
