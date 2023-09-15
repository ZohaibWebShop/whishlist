<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Wishlist extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'wishlist_token_id',
        'default'
    ];

    function products()  {
        return $this->hasMany(WishlistProduct::class, 'wishlist_id', 'id');
    }

}
