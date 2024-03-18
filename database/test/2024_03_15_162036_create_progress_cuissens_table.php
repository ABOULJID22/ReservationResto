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
        Schema::create('progress_cuissen', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_reservation_local');
            $table->string('statuConfirme');
            $table->string('Statusfacture');
            $table->timestamps();

            $table->foreign('id_reservation_local')->references('id')->on('reservation_local');
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('progress_cuissens');
    }
};
