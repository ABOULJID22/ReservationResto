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
        Schema::create('local_cart_commands', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('menu_id');
            $table->unsignedBigInteger('restaurant_table_id');
            $table->integer('quantity');
            $table->integer('person_count');
            $table->decimal('total_price', 10, 2);
            $table->string('payment_type');
            $table->boolean('payment_status')->default(false);
            $table->string('body_status')->default('0');
            $table->timestamps();

            $table->foreign('menu_id')->references('id')->on('menus')->onDelete('cascade');
            $table->foreign('restaurant_table_id')->references('id')->on('restaurant_tables')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('local_cart_commands');
    }
};
