<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RestaurantTable extends Model
{
    use HasFactory;
    protected $fillable = [
        'table_count', 'fixed_count', 'reservation_available'
    ];

    public function localCartCommands()
    {
        return $this->hasMany(LocalCartCommand::class);
    }
}
