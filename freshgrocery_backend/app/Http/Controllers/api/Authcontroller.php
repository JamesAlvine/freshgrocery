<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class Authcontroller extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required||unique:users|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:8',
            //'confirm' => 'required|string|required_with:password|same:password'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->messages(),
            ]);
        } else {
            $user = User::create([
                'username' => $request->username,
                'email' => $request->email,
                'password' => Hash::make($request->password)
            ]);
            if($user->role_as == 1)
            {
                $role = 'admin';
                $token = $user->createToken($user->email . '_AdminToken',['server:admin'])->plainTextToken;
            }
            else 
            {
                $role = '';
                $token = $user->createToken($user->email . '_Token',[''])->plainTextToken;
            }
            return response()->json([
                'status' => 200,
                'username' => $user->username,
                'token' => $token,
                'message' => 'Registered successfully',
                'role' => $role
            ]);
        }
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|max:191',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->messages(),
            ]);
        } else {
            $user = User::where('email', $request->email)->first();

            if (!$user || !Hash::check($request->password, $user->password)) {
                return response()->json([
                    'status' => 401,
                    'message' => 'invalid Credentials',
                ]);
            } else {
                $token = $user->createToken($user->email . '_Token')->plainTextToken;

                return response()->json([
                    'status' => 200,
                    'username' => $user->username,
                    'token' => $token,
                    'message' => 'Logged in successfully'
                ]);
            }
        }
    }

    public function logout(Request $request)
    {
        auth()->user()->tokens()->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Logged Out Successfully',
        ]);
    }
}
