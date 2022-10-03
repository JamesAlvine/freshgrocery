<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $category = Category::all();
        return response()->json([
            'status' => 200,
            'category' => $category,
        ]);
    }

    
    public function allCategory()
    {
        
        $category = Category::all();
        return response()->json([
            'status' => 200,
            'category' => $category,
        ]);
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
            'name' => 'required|max:191',
            'slug' => 'required|max:191'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages()
            ]);
        } else {
            $category = new Category;
            $category->name = $request->input('name');
            $category->slug = $request->input('slug');
            $category->save();
            return response()->json([
                'status' => 200,
                'message' => 'Category added successfully'
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
        $category = Category::find($id);
        if($category)
        {
            return response()->json([
                'status' => 200,
                'category' => $category
            ]);
        }
        else
        {
            return response()->json([
                'status' => 404,
                'message' => 'No category Id found'
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
            'name' => 'required|max:191',
            'slug' => 'required|max:191'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ]);
        } else {
            $category = Category::find($id);
            if($category) 
            {
                $category->name = $request->input('name');
                $category->slug = $request->input('slug');
                $category->save();
                return response()->json([
                    'status' => 200,
                    'message' => 'Category updated successfully'
                ]);
            }
            else
            {
                return response()->json([
                    'status' => 404,
                    'message' => 'Category not found'
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
        $category = Category::find($id);
        if($category)
        {
            $category->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Category deleted successfully'
            ]);
        }
        else
        {
            return response()->json([
                'status' => 404,
                'message' => 'Category not found'
            ]);
        }
    }
}
