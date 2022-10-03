<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $products = Product::all(); 
        return response()->json([
            'status' => 200,
            'products' => $products,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'category_id' => 'required|max:191',
            'name' => 'required|max:191',
            'slug' => 'required|max:191',
            'description' => 'required|max:191',
            'original_price' => 'required|max:191',
            'quantity' => 'required|max:191',
            'image' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ]);
        } else {
            $product = new Product;
            $product->category_id = $request->input('category_id');
            $product->name = $request->input('name');
            $product->slug = $request->input('slug');
            $product->description = $request->input('description');
            $product->original_price = $request->input('original_price');
            $product->selling_price = $request->input('selling_price');
            $product->quantity = $request->input('quantity');
            $product->status = $request->input('status');

            if($request->hasFile('image'))
            {
                $file = $request->file('image');
                $extension = $file->getClientOriginalExtension();
                $filename = time().'.'.$extension;
                $file->move('uploads/product', $filename);

                $product->image = 'uploads/product/'.$filename;
            }

            $product->save();
            return response()->json([
                'status' => 200,
                'message' => 'Product added successfully'
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
        $product = Product::find($id);
        if($product)
        {
            return response()->json([
                'status' => 200,
                'product' => $product
            ]);
        }
        else
        {
            return response()->json([
                'status' => 404,
                'message' => 'No product Id found'
            ]);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'category_id' => 'required|max:191',
            'name' => 'required|max:191',
            'slug' => 'required|max:191',
            'description' => 'required|max:191',
            'original_price' => 'required|max:191',
            'quantity' => 'required|max:191',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ]);
        } else {
            $product = Product::find($id);
            if($product)
            {
                $product->category_id = $request->input('category_id');
                $product->name = $request->input('name');
                $product->slug = $request->input('slug');
                $product->description = $request->input('description');
                $product->original_price = $request->input('original_price');
                $product->selling_price = $request->input('selling_price');
                $product->quantity = $request->input('quantity');
                $product->status = $request->input('status');
    
                if($request->hasFile('image'))
                {
                    $path = $product->image;
                    if(Storage::disk('public/uploads/product')->exists($path))
                    {
                        Storage::delete();   
                    }
                    $file = $request->file('image');
                    $extension = $file->getClientOriginalExtension();
                    $filename = time().'.'.$extension;
                    $file->move('uploads/product', $filename);    
                    $product->image = 'uploads/product/'.$filename;
                }
    
                $product->update();
                return response()->json([
                    'status' => 200,
                    'message' => 'Product updated successfully'
                ]);
            }
            else 
            {
                return response()->json([
                    'status' => 404,
                    'message' => 'Product Not found'
                ]);
            }
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
