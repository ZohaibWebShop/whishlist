<?php

namespace App\Http\Resources;

use App\Services\ShopifyServices;
use Illuminate\Http\Resources\Json\ResourceCollection;


class WishlistTokenCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $shopifySerivice = new ShopifyServices($request->shop);
        $wishlists = $this->collection;

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
}
