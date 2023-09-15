<?php



namespace App\Services;

use App\Models\User;
use GuzzleHttp\Client;

class UserService{

    public $publicIpAddress = "";

    function __construct()
    {
        $client = new Client();

        try {
            $response = $client->get('https://api.ipify.org?format=json');
            $data = json_decode($response->getBody(), true);

            $this->publicIpAddress = $data['ip'];
        } catch (\Exception $e) {
            $this->publicIpAddress  = "Error fetching public IP address";
        }
    }

    function getIp() {
        return $this->publicIpAddress;
    }

}
