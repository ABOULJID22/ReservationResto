<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LocalReservation extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'local_cart_command_id'
    ];

    public function localCartCommand()
    {
        return $this->belongsTo(LocalCartCommand::class);
    }
}
