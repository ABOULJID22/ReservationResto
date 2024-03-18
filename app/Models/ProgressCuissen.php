<?php

namespace App\Models\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProgressCuissen extends Model
{
    use HasFactory;
 
    protected $fillable = [
        'id_reservation_local', 'statuConfirme', 'Statusfacture',
    ];

    public function reservationLocal()
    {
        return $this->belongsTo(ReservationLocal::class, 'id_reservation_local');
    }
}
