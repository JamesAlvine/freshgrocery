<?php

use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\DeliveryDestinationController;
use App\Http\Controllers\api\Authcontroller;
use App\Http\Controllers\api\FrontendController;
use App\Http\Controllers\api\CartController;
use App\Http\Controllers\api\CheckoutController;
use App\Http\Controllers\api\OrderController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('register', [Authcontroller::class, 'register']);
Route::post('login', [Authcontroller::class, 'login']);

Route::get('get-category', [FrontendController::class, 'category']);
Route::get('get-product', [FrontendController::class, 'product']);
Route::get('get-productCategory/{category_slug}', [FrontendController::class, 'productCategory']);
Route::get('view-productDetails/{category_slug}/{product_slug}', [FrontendController::class, 'viewProduct']);

//Cart
Route::get('cart', [CartController::class, 'index']);
Route::post('add-to-cart', [CartController::class, 'store']);
Route::put('cart-quantityUpdate/{card_id}/{scope}', [CartController::class, 'update']);
Route::delete('delete-cartItem/{card_id}', [CartController::class, 'destroy']);
Route::get('get-cart-count', [CartController::class, 'cartCount']);

//Order
Route::get('admin/orders', [OrderController::class, 'index']);

//Checkout
Route::get('all-destination', [DeliveryDestinationController::class, 'allDestination']);
Route::post('place-order', [CheckoutController::class, 'placeOrder']);

Route::middleware(['auth:sanctum', 'isApiAdmin'])->group(function(){
    Route::get('checkingAuthenticated', function () {
        return response()->json(['message'=>'You are in', 'status'=>200], 200);
    });

    //Category
    Route::get('view-category', [CategoryController::class, 'index']);
    Route::post('store-category', [CategoryController::class, 'store']);
    Route::get('edit-category/{id}', [CategoryController::class, 'edit']);
    Route::put('update-category/{id}', [CategoryController::class, 'update']);
    Route::delete('delete-category/{id}', [CategoryController::class, 'destroy']);
    Route::get('all-category', [CategoryController::class, 'allCategory']);

    //Product
    Route::get('view-product', [ProductController::class, 'index']);
    Route::post('store-product', [ProductController::class, 'store']);
    Route::get('edit-product/{id}', [ProductController::class, 'edit']);
    Route::post('update-product/{id}', [ProductController::class, 'update']);
    Route::delete('delete-product/{id}', [ProductController::class, 'destroy']);

    //Destination
    Route::get('view-destination', [DeliveryDestinationController::class, 'index']);
    Route::post('store-destination', [DeliveryDestinationController::class, 'store']);
    Route::get('edit-destination/{id}', [DeliveryDestinationController::class, 'edit']);
    Route::put('update-destination/{id}', [DeliveryDestinationController::class, 'update']);
    Route::delete('delete-destination/{id}', [DeliveryDestinationController::class, 'destroy']);
});
    
   

Route::middleware(['auth:sanctum'])->group(function(){
    Route::post('logout', [Authcontroller::class, 'logout']);
});


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
