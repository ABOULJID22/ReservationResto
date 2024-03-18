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
        Schema::create('cart_command_local', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_menu');
            $table->integer('quantite');
            $table->decimal('total_price', 10, 2);
            $table->string('payement_type');
            $table->string('statu_payement');
            $table->timestamps();

            $table->foreign('id_menu')->references('id')->on('menus');
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cart_command_locals');
    }
};
