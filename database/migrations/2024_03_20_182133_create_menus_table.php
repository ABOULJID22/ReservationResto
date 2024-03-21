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

Schema::create('menus', function (Blueprint $table) {
    $table->id();
    $table->string('img');
    $table->string('title');
    $table->integer('quantity_served');
    $table->string('offer')->nullable();
    $table->integer('views')->nullable();
    $table->decimal('price', 10, 2);
    $table->decimal('new_price', 10, 2)->nullable();
    $table->unsignedBigInteger('category_id');
    $table->string('with_sauce')->nullable();
    $table->string('type'); // Salads, pizzas, etc.
    $table->boolean('is_available_delivery');
    $table->boolean('is_popular');
    $table->timestamps();
    $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('menus');
    }
};
