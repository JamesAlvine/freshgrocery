<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Order;
use App\Models\Cart;
use App\Models\OrderItem;

class CheckoutController extends Controller
{
    public function placeOrder(Request $request)
    {
        if (auth('sanctum')->check()) 
        {
            $validator = Validator::make($request->all(), [
                'firstname' => 'required|max:255',
                'lastname' => 'required|max:255',
                'email' => 'required|email|max:255',
                'contact_no' => 'required|max:191',
                'destination_id' => 'required',
            ]);

            if ($validator->fails()) 
            {
                return response()->json([
                    'status' => 422,
                    'errors' => $validator->messages(),
                ]);
            } else 
            {
                $user_id = auth('sanctum')->user()->id;

                $order = new Order;
                $order->user_id = $user_id;
                $order->first_name = $request->input('firstname');
                $order->last_name = $request->input('lastname');
                $order->email = $request->input('email');
                $order->contact_no = $request->input('contact_no');
                $order->destination_id = $request->input('destination_id');

                $order->payment_mode = $request->payment_mode;
                $order->payment_id = $request->payment_id;
                $order->tracking_no = 'freshgrocerycom'.rand(1111, 9999);
                $order->save();
            

                $cart = Cart::where('user_id', $user_id)->get();

                $orderItems = [];

                foreach($cart as $item)
                {
                    $orderItems[] = [
                        'product_id' => $item->product_id,
                        'quantity' => $item->quantity_id,
                        'price' => $item->product->selling_price
                    ];

                    $item->product->update([
                        'quantity' => $item->product->quantity - $item->quantity_id
                    ]);
                }

                $order->orderItem()->createMany($orderItems);
                Cart::destroy($cart);

                return response()->json([
                    'status' => 200,
                    'message' => 'Order placed successfully',
                ]);
            }
        }
        else
        {
            return response()->json([
                'status' => 401,
                'message' => 'Login to add to continue'
            ]); 
        } 
    }
}
