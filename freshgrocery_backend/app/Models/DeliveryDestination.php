<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DeliveryDestination extends Model
{
    use HasFactory;

    protected $table = "delivery_destinations";

    protected $fillable = ['name'];
    
    public function users()
    {
        return $this->hasMany(Product::class, 'deliveryDestination_id');
    }
}
