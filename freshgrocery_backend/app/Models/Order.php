<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $table = "orders";

    protected $fillable = ['user_id', 'first_name', 'last_name', 'email', 'contact_no', 'payment_id', 'payment_mode', 'tracking_no', 'destination_id', 'status', 'remark'];

    public function orderItem()
    {
        return $this->hasMany(OrderItem::class, 'order_id','id');
    }
}
