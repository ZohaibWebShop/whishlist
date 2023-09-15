<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateWishlistTokensTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('wishlist_tokens', function (Blueprint $table) {
            $table->id();
            $table->text('wishlist_token');
            $table->timestamp('token_expiration')->nullable();
            $table->bigInteger('customer_id')->nullable();
            $table->text('user_ip');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('wishlist_tokens');
    }
}
