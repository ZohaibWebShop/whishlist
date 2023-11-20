<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WishlistProduct extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'wishlist_id'
    ];

    public function Wishlists()  {
        /**
         * Get the user associated with the WishlistProduct
         *
         * @return \Illuminate\Database\Eloquent\Relations\HasOne
         */
       return $this->hasOne(Wishlist::class, 'wishlist_id', 'id');
    }
}
