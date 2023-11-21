<?php namespace App\Jobs;


use App\Models\WishlistToken;
use App\Models\WishlistProduct;
use App\Models\Wishlist;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Osiset\ShopifyApp\Objects\Values\ShopDomain;
use stdClass;



class CustomersDeleteJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Shop's myshopify domain
     *
     * @var ShopDomain|string
     */
    public $shopDomain;

    /**
     * The webhook data
     *
     * @var object
     */
    public $data;

    /**
     * Create a new job instance.
     *
     * @param string   $shopDomain The shop's myshopify domain.
     * @param stdClass $data       The webhook data (JSON decoded).
     *
     * @return void
     */
    public function __construct($shopDomain, $data)
    {
        $this->shopDomain = $shopDomain;
        $this->data = $data;

    }

   

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {

        try {

            // use App\Models\WishlistToken;
            // use App\Models\WishlistProduct;
            // use App\Models\Wishlist;

            // Convert domain
            $this->shopDomain = ShopDomain::fromNative($this->shopDomain);
            $customer_id = $this->data->id;

            $wishlistToken = WishlistToken::where('customer_id', $customer_id)->first();
            if ($wishlistToken) {
                $wishlists = Wishlist::where('wishlist_token_id', $wishlistToken->id)->get();

                foreach ($wishlists as $wishlist) {
                    // Delete WishlistProducts first
                    WishlistProduct::where('wishlist_id', $wishlist->id)->delete();
                }

                // Delete Wishlists
                Wishlist::where('wishlist_token_id', $wishlistToken->id)->delete();

                // Delete WishlistToken
                $wishlistToken->delete();
                info("Delete All data assigned with this customer_id ".json_encode($this->data->id));
            }else{
                info("Customer dos'nt register with our database ".json_encode($this->data->id));
            }


            // Do what you wish with the data
            // Access domain name as $this->shopDomain->toNative()
        } catch (\Exception $th) {
            info('Error');
        }
       
    }
  
}
