<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Laravel\Sanctum\PersonalAccessToken;


class AuthController extends Controller
{
    //

    public function signup(Request $request){
        
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6|confirmed',
        ]);
        
        if ($validator->fails()) {
            $data = [
                'message' => $validator->errors(),
                'status' => 400
            ];
            return response()->json($data,400);
        };

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        $token = $user->createToken('main')->plainTextToken;

        if(!$user){
            $data = [
                'message' => 'User not created',
                'status' => 400
            ];
            return response()->json($data,400);
        }

        $data = [
            'user' => $user,
            'token' => $token,
            'status' => 201,
        ];
        return response()->json($data,201);


    }

    public function login(Request $request){
        $credentials = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if ($credentials->fails()) {
            $data = [
                'message' => $credentials->errors(),
                'status' => 400
            ];
            return response()->json($data,400);
        }

        $credentials = $request->only('email', 'password');

        if(!Auth::attempt($credentials)){
            return response([
                'message' => 'Provided email or password is incorrect'
            ], 422);
        }
        
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;
        
        $data = [
            'user' => $user,
            'token' => $token,
            'status' => 200,
        ];

        return response()->json($data,200);

    }

    public function logout(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = $request->user();

        /** @var PersonalAccessToken $token */
        $token = $user->currentAccessToken();
        $token->delete();
        
        return response()->json([
            'message' => 'Logout successfully'],
             200);
    }
    

}
