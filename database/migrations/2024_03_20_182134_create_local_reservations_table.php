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

        
        Schema::create('local_reservations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('local_cart_command_id');
            $table->timestamps();
            $table->foreign('local_cart_command_id')->references('id')->on('local_cart_commands');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('local_reservations');
    }
};
