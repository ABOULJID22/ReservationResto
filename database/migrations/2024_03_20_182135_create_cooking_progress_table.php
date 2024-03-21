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
        Schema::create('cooking_progress', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('local_reservation_id');
            $table->string('confirmation_status')->default('Not Confirmed');
            $table->string('billing_status')->default('Not Billed');
            $table->timestamps();
            $table->foreign('local_reservation_id')->references('id')->on('local_reservations');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cooking_progress');
    }
};
