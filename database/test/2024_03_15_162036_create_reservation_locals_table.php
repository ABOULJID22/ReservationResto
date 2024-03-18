<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reservation_local', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_cart_command_local');
            $table->timestamps();
            $table->foreign('id_cart_command_local')->references('id')->on('cart_command_local');
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservation_locals');
    }
};
