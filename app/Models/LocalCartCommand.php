<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LocalCartCommand extends Model
{
    use HasFactory;
    protected $fillable = [
        'menu_id', 'restaurant_table_id', 'quantity', 'person_count', 'total_price', 'payment_type', 'payment_status', 'body_status'
    ];

    public function menu()
    {
        return $this->belongsTo(Menu::class);
    }

    public function restaurantTable()
    {
        return $this->belongsTo(RestaurantTable::class);
    }
}
