<?php namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Osiset\ShopifyApp\Objects\Values\ShopDomain;
use stdClass;
use App\Models\WishlistProduct;

class ProductDeleteJob implements ShouldQueue
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
        // Convert domain
        try {
            $this->shopDomain = ShopDomain::fromNative($this->shopDomain);
            $product_id = $this->data->id;
            $WishlistProduct = WishlistProduct::where('product_id', $product_id)->first();
    
            if($WishlistProduct){
                WishlistProduct::where('product_id', $product_id)->first();
                info('product data dlelete from our database');
            }else{
                info("product coul'nt find in our database");
            }
        } catch (\Exception $th) {
            //throw $th;
            info("Exception Error");
        }

        // Do what you wish with the data
        // Access domain name as $this->shopDomain->toNative()
    }
}
