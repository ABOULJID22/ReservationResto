<?php

namespace App\Models\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    use HasFactory;

    protected $fillable = [
        'img', 'title', 'quantite_serve', 'offre', 'view', 'price', 'new_price', 'category_id', 'with_sauce', 'type', 'is_available_delevery', 'is_most_popular',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
