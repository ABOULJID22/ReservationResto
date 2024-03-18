<?php

namespace App\Models\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'title', 'nbr_items', 'img',
    ];

    public function menus()
    {
        return $this->hasMany(Menu::class);
    }
}
