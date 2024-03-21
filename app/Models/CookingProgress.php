<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CookingProgress extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'local_reservation_id', 'confirmation_status', 'billing_status'
    ];

    public function localReservation()
    {
        return $this->belongsTo(LocalReservation::class);
    }
}
