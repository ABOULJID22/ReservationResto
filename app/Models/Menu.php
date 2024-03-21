<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    use HasFactory;

    protected $fillable = [
        'img', 'title', 'quantity_served', 'offer', 'views', 'price', 'new_price', 'category_id', 'with_sauce', 'type', 'is_available_delivery', 'is_popular'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
