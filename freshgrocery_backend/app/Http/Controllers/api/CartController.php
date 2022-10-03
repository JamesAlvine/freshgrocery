<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Cart;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (auth('sanctum')->check()) {
            $user_id = auth('sanctum')->user()->id;
            $cartItems = Cart::where('user_id', $user_id)->get();
            return response()->json([
                'status' => 200,
                'cart' => $cartItems
            ]);
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Login to view cart data'
            ]);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if (auth('sanctum')->check()) {
            $user_id = auth('sanctum')->user()->id;
            $product_id = $request->product_id;
            $product_quantity = $request->product_quantity;

            $productCheck = Product::where('id', $product_id)->first();
            if ($productCheck) {
                if (Cart::where('product_id', $product_id)->where('user_id', $user_id)->exists()) {
                    return response()->json([
                        'status' => 409,
                        'message' => $productCheck->name . ' already added to Cart'
                    ]);
                } else {
                    $cartItem = new Cart;
                    $cartItem->user_id  = $user_id;
                    $cartItem->product_id  = $product_id;
                    $cartItem->quantity_id  = $product_quantity;
                    $cartItem->save();

                    return response()->json([
                        'status' => 201,
                        'message' => 'Added to cart'
                    ]);
                }
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'Product not found'
                ]);
            }
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Login to add to cart'
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update($card_id, $scope)
    {
        if (auth('sanctum')->check()) {
            $user_id = auth('sanctum')->user()->id;
            $cartItem = Cart::where('id', $card_id)->where('user_id', $user_id)->firstOrFail();
            if ($scope == 'inc') {
                $cartItem->quantity_id += 1;
            } else if ($scope == 'dec') {
                $cartItem->quantity_id -= 1;
            }
            $cartItem->update();

            return response()->json([
                'status' => 200,
                'message' => 'Quantity updated'
            ]);
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Login to continue'
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($card_id)
    {
        if (auth('sanctum')->check()) {
            $user_id = auth('sanctum')->user()->id;
            $cartItem = Cart::where('id', $card_id)->where('user_id', $user_id)->firstOrFail();

            if ($cartItem) {
                $cartItem->delete();
                return response()->json([
                    'status' => 200,
                    'message' => 'Cart item removed successfully'
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'Cart item not found'
                ]);
            }
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Login to continue'
            ]);
        }
    }

    public function cartCount()
    {
        if (auth('sanctum')->check()) 
        {
            $user_id = auth('sanctum')->user()->id;

             $cart = Cart::where('user_id', $user_id)->get();
             $cartCount = $cart->count();
             return response()->json([
                'status' => 200,
                'cartCount' => $cartCount
            ]);
        }
    }
}
