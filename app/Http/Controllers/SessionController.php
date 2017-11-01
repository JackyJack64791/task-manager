<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SessionController extends Controller
{
    public function create()
    {
        if(auth()->attempt(['email' => request()->get('email'), 'password' => request()->get('password')]))
        {
            //auth()->login();
            return response()->json(["name" => Auth::user()]);
        }
        else return response()->json(["your_mom"=>"disgusting"]);
    }

    public function destroy()
    {
        auth()->logout();

        return response()->json(["name" => Auth::user()]);
    }
}
