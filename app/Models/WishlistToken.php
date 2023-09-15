<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WishlistToken extends Model
{
    use HasFactory;

    protected $fillable = [
        'wishlist_token',
        'token_expiration',
        'customer_id',
        'user_ip'
    ];




    public function Wishlists(){
        return $this->hasMany(Wishlist::class, 'wishlist_token_id', 'id')->with('products');
    }

    public function WishlistsCount(){
        return $this->hasMany(Wishlist::class, 'wishlist_token_id', 'id');
    }
}
