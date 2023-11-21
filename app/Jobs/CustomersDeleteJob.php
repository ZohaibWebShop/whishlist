<?php namespace App\Jobs;

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
            // Convert domain
            $this->shopDomain = ShopDomain::fromNative($this->shopDomain);
            Log::info("customer_id ".json_encode($this-data));


            // Do what you wish with the data
            // Access domain name as $this->shopDomain->toNative()
        } catch (\Exception $th) {
            info('Error');
        }
       
    }
  
}
