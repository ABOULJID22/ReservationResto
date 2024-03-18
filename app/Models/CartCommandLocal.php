<?php

namespace App\Models\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CartCommandLocal extends Model
{
    use HasFactory;
    protected $fillable = [
        'id_menu','nbr_persons', 'quantite', 'total_price', 'payement_type', 'statu_payement',
    ];

    public function menu()
    {
        return $this->belongsTo(Menu::class, 'id_menu');
    }
}
