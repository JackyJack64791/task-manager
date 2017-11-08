<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Exceptions\JWTException;
use JWTAuth;

class SessionController extends Controller
{
    public function __construct()
    {
        $this->middleware('jwt.auth')->except('create');
    }
    public function index()
    {
        return User::all();
    }
    public function create(Request $request)
    {
        $credentials = [
            'email'=>$request->get('email'),
            'password'=>$request->get('password'),
            //'remember'=>$request->get('remember'),
            //TODO::remember me
            ];
        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(["you're so" => "retard"], 401);
            }
        } catch (JWTException $e) {
            return response()->json(["It's not" => "for you"], 500);
        }
       // Auth::attempt(["email" => $credentials['email'],"password"=> $credentials['password']]);
        return response()->json(compact('token'));
    }

//    public function destroy()
//    {
//        Auth::logout();
//
//        return response()->json(["name" => Auth::user()]);
//    }
}
