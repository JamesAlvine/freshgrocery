<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $table = "products";
    
    protected $fillable = ['name', 'slug','description','original_price','selling_price', 'quantity','status','image', 'category_id'];

    protected $with = ['category'];
    public function category ()
    {
        return $this->belongsTo(Category::class);
    }

    public function products ()
    {
        return $this->hasMany(Cart::class, 'product_id');
    }
}
