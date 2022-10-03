<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\DeliveryDestination;

class DeliveryDestinationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
       $destination = DeliveryDestination::all();
        return response()->json([
            'status' => 200,
            'destination' =>$destination,
        ]);
    }

    
    public function allDestination()
    {
        
       $destination = DeliveryDestination::all();
        return response()->json([
            'status' => 200,
            'destination' =>$destination,
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
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages()
            ]);
        } else {
           $destination = new DeliveryDestination;
           $destination->name = $request->input('name');
           $destination->save();
            return response()->json([
                'status' => 200,
                'message' => 'Destination added successfully'
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
       $destination = DeliveryDestination::find($id);
        if($destination)
        {
            return response()->json([
                'status' => 200,
                'destination' =>$destination
            ]);
        }
        else
        {
            return response()->json([
                'status' => 404,
                'message' => 'No destination found'
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
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ]);
        } else {
           $destination = DeliveryDestination::find($id);
            if($destination) 
            {
               $destination->name = $request->input('name');
               $destination->save();
                return response()->json([
                    'status' => 200,
                    'message' => 'Destination updated successfully'
                ]);
            }
            else
            {
                return response()->json([
                    'status' => 404,
                    'message' => 'Destination not found'
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
        $destination = DeliveryDestination::find($id);
        if($destination)
        {
            $destination->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Destination deleted successfully'
            ]);
        }
        else
        {
            return response()->json([
                'status' => 404,
                'message' => 'Destination not found'
            ]);
        }
    }
}
