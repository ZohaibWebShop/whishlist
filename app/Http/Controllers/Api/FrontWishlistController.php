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
        $shopifySerivice = new ShopifyServices($request->shop);
        $wishlists = WishlistToken::with('WishlistsCount')->get();

        $customers = $wishlists->map(function($wishlist){
            return $wishlist['customer_id'];
        });

        $customers = collect($this->getAllCustomers($request, $customers->toArray()));

        $wishlists->transform(function ($item) use($customers) {
            $customer_id =  $item['customer_id'];
            $filterCustomerById = $customers->filter(function($customer) use($customer_id){
                return $customer['id'] == $customer_id;
            })->values()->first();


            if(!is_null($filterCustomerById)){
                $item['customer'] = $filterCustomerById;
            }else{
                $item['customer'] = [
                            "first_name"=>"Customer",
                            "last_name"=>"Deleted",
                            "email"=>""
                        ];
            }

            // if(!is_null($filterCustomerById)){
            //     if(!is_null($filterCustomerById['first_name']) && !is_null($filterCustomerById['last_name'])){
            //         $item['customer'] = [
            //             "first_name"=>"NA",
            //             "last_name"=>"",
            //             "email"=>$filterCustomerById['email']
            //         ];
            //     }
            //     $item['customer'] = [
            //         ...$filterCustomerById,
            //         "result"=>$filterCustomerById
            //     ];
            // }else{
            //     $item['customer'] = [
            //         "first_name"=>"Customer",
            //         "last_name"=>"Deleted",
            //         "email"=>""
            //     ];
            // }
            return $item;
        });

        return $wishlists;
    }

    function getWishlists(Request $request, $customer_id) {
        $shop = $request->shop;
        $isRegisterd = WishlistToken::where('customer_id', $customer_id)->first();
        $query = Wishlist::with('products')->where('wishlist_token_id', $isRegisterd->id);
        return $query->get();
    }

    function getProducts(Request $request, $customer_id, $wishlist_id) {
        $isRegisterd = WishlistToken::where('customer_id', $customer_id)->first();
        $products = WishlistProduct::where('wishlist_id', $wishlist_id)->get();
        $shopifySerivice = new ShopifyServices($request->shop);
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

        return $products;
    }

    function deleteCustomer($id) {
        $wishlistToken = WishlistToken::find($id);
        if($wishlistToken){
            $wishlists = $wishlistToken->Wishlists;
            foreach($wishlists as $wishlist){
                $wishlist->products()->delete();
                $wishlist->delete();
            }
            $wishlistToken->delete();
            return \response()->json([
               'errors' =>false,
               "message"=>"wishlist deleted Successfully"
            ]);
        }

        return \response()->json([
            'errors' =>true,
            "message"=>"Wishlist not exist"
         ]);
    }


    function deleteWishlist($id) {
        $wishlists = Wishlist::find($id);
        if($wishlists){
            $wishlists->products()->delete();
            $wishlists->delete();

            return \response()->json([
               'errors' =>false,
               "message"=>"wishlist deleted Successfully"
            ]);
        }

        return \response()->json([
            'errors' =>true,
            "message"=>"Wishlist not exist"
         ]);
    }

    function deleteProduct($id) {
        $product = WishlistProduct::find($id);
        if($product){
            $product->delete();

            return \response()->json([
               'errors' =>false,
               "message"=>"product deleted Successfully"
            ]);
        }

        return \response()->json([
            'errors' =>true,
            "message"=>"Product not exist",
         ]);
    }

    function getAllProducts(Request $request, $productIds){
        $products = [];
        $nextPage = null;
        $isNextPage = false; // Initialize the next page token as null
        $shopify = new ShopifyServices($request->shop);

        do {
            // Create a request to fetch products with optional pagination
            $requestParams = [
                'fields' => 'id,title,variants',
                'limit' => 50,
            ];

            if(!is_null($nextPage)){
                $requestParams['page_info'] = $nextPage;
            }else{
                $requestParams['ids'] = implode(',', $productIds);
            }

            // Set the request parameters and make the API request
            $getProducts = $shopify->setParams($requestParams)->getProducts(true);

            // Add the fetched products to the $products array
            $product_shop = collect($getProducts['products'])->toArray();
            $products = array_merge($products, $product_shop);

            // $products[] = $getProducts['next_page'];
            // Check if there are more pages of products
            $nextPage = isset($getProducts['next_page']) && !is_null($getProducts['next_page']) ? $getProducts['next_page'] : null;
            $isNextPage = isset($getProducts['next_page']) && !is_null($getProducts['next_page']) ? true :false;

        } while ($isNextPage);

        return $products;
    }

    function getAllCustomers(Request $request, $customerIds){
        $customers = [];
        $nextPage = null; // Initialize the next page token as null
        $isNextPage = false;
        $shopify = new ShopifyServices($request->shop);

        do {
            $requestParams = [
                'fields' => 'id,first_name,last_name,email',
                'limit' => 50,
            ];

            if(!is_null($nextPage)){
                $requestParams['page_info'] = $nextPage;
            }else{
                $requestParams['ids'] = implode(',', $customerIds);
            }

            $getCustomers = $shopify->setParams($requestParams)->getCustomers(true);

            $shopCustomers = collect($getCustomers['customers'])->toArray();
            $customers = array_merge($customers, $shopCustomers);

            $nextPage = isset($getCustomers['next_page']) && !is_null($getCustomers['next_page']) ? $getCustomers['next_page'] : null;
            $isNextPage = isset($getCustomers['next_page']) && !is_null($getCustomers['next_page']) ? true :false;

        } while ($isNextPage);

        return $customers;
    }

    function getCustomer(Request $request, $customerIds){
        $shopify = new ShopifyServices($request->shop);
        $getCustomers = $shopify->getCustomer($customerIds);
        return $getCustomers;
    }

    function exportToCSV(Request $request) {
        $wishlistTokens = WishlistToken::with('Wishlists.products')->get();

        $customerIds = WishlistToken::pluck('customer_id')->toArray();
        $productIds = WishlistProduct::pluck('product_id')->toArray();


        $products = [];
        $getProducts = collect($this->getAllProducts($request, $productIds));
        $getCustomers = collect($this->getAllCustomers($request, $customerIds));


        $csvFileName = 'exported_data.csv';
        $csvFilePath = storage_path($csvFileName);
        $csvFile = fopen($csvFilePath, 'w');

        // // Write the CSV header
        fputcsv($csvFile, [
            'WishlistToken',
            'CustomerID',
            'CustomerName',
            'CustomerEmail',
            'RegisteredAt',
            'WishlistName',
            'DefaultWishlist',
            'WishlistCreatedAt',
            'ProductID',
            'ProductTitle',
            'ProductSku',
            'ProductAddedAt',
        ]);

        foreach ($wishlistTokens as $wishlistToken) {
            foreach ($wishlistToken->Wishlists as $wishlist) {
                foreach ($wishlist->products as $product) {

                    $shopifyProduct = $getProducts->where('id', $product->product_id)->first();
                    $shopifyCustomer = $getCustomers->where('id', $wishlistToken->customer_id)->first();
                    $minVariant = $this->getMinPriceVariant($shopifyProduct->variants);

                    fputcsv($csvFile, [
                        $wishlistToken->wishlist_token,
                        $wishlistToken->customer_id,
                        $shopifyCustomer->first_name." ".$shopifyCustomer->last_name,
                        $shopifyCustomer->email,
                        $wishlistToken->created_at,
                        $wishlist->name,
                        $wishlist->default,
                        $wishlist->created_at,
                        $product->id,
                        $shopifyProduct->title,
                        $minVariant->sku,
                        $product->created_at,
                    ]);
                }
            }
        }

        fclose($csvFile);

        // // Download the CSV file
        return response()->download($csvFilePath, $csvFileName)->deleteFileAfterSend();
        // return $products;
    }

    function getMinPriceVariant($variants){
        $variantCollection = collect($variants);

          $minPrice =   $variantCollection->filter(function ($variant) {
                return $variant['inventory_quantity'] > 0;
            })
            ->min('price');

            if(!is_null($minPrice)){
                $variant = $variantCollection->where('price', $minPrice)->values()->first();
            }else{
                $variant = $variantCollection->first();
            }

            return $variant;
    }

    function exportCustomer(Request $request) {
        $wishlistToken = WishlistToken::with('Wishlists.products')->where('customer_id', $request->customer_id)->first();
        // return $wishlistTokens;

        $customer = WishlistToken::where('customer_id', $request->customer_id)->first();
        $productIds = WishlistProduct::pluck('product_id')->toArray();

        $customer = $this->getCustomer($request, $request->customer_id);
        $getProducts = collect($this->getAllProducts($request, $productIds));


        $csvFileName = 'exported_data.csv';
        $csvFilePath = storage_path($csvFileName);
        $csvFile = fopen($csvFilePath, 'w');

        // Write the CSV header
        fputcsv($csvFile, [
            'WishlistToken',
            'CustomerID',
            'CustomerName',
            'CustomerEmail',
            'RegisteredAt',
            'WishlistName',
            'DefaultWishlist',
            'WishlistCreatedAt',
            'ProductID',
            'ProductTitle',
            'ProductSku',
            'ProductAddedAt',
        ]);

         foreach ($wishlistToken->Wishlists as $wishlist) {
            foreach ($wishlist->products as $product) {

                    $shopifyProduct = $getProducts->where('id', $product->product_id)->first();
                    $minVariant = $this->getMinPriceVariant($shopifyProduct->variants);

                    fputcsv($csvFile, [
                        $wishlistToken->wishlist_token,
                        $wishlistToken->customer_id,
                        $customer->first_name." ".$customer->last_name,
                        $customer->email,
                        $wishlistToken->created_at,
                        $wishlist->name,
                        $wishlist->default,
                        $wishlist->created_at,
                        $product->id,
                        $shopifyProduct->title,
                        $minVariant->sku,
                        $product->created_at,
                    ]);
            }
         }

        fclose($csvFile);

        // // // Download the CSV file
        return response()->download($csvFilePath, $csvFileName)->deleteFileAfterSend();
    }

}
