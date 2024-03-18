<?php

namespace App\Models\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReservationLocal extends Model
{
    use HasFactory;
   
    protected $fillable = [
        'id_cart_command_local',
    ];

    public function cartCommandLocal()
    {
        return $this->belongsTo(CartCommandLocal::class, 'id_cart_command_local');
    }
}
