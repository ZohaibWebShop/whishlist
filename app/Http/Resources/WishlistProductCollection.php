<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use App\Services\ShopifyServices;
use Illuminate\Http\Resources\Json\ResourceCollection;

class WishlistProductCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        $shopifySerivice = new ShopifyServices($request->shop);
        $products = $this->collection;

        $product_ids_array = $products->map(function($product){
            return $product['product_id'];
        });
        $product_ids = implode(',', collect($product_ids_array)->toArray());
        $shopifySerivice->setParams(['ids'=>$product_ids,'fields'=>"id,title,handle"]);
        $shop_products = collect($shopifySerivice->getProducts());

        $products->transform(function ($item) use($shop_products) {
            $product_id =  $item['product_id'];

            $item['product'] = $shop_products->filter(function($product) use($product_id){
                return $product['id'] == $product_id;
            })->values()->first();
                return $item;
        });

        return \collect($products)->toArray();
    }
}
