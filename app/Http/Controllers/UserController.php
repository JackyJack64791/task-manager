<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\JWTAuth;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    public function register(Request $request)
    {
        $this->validate($request, [
            'full_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'login' => 'required|string|max:20|unique:users',
            'address' => 'required|string|max:255',
            'phone'=>'required|regex:/[0-9]{1}[0-9]{10}/|unique:users',
            'password' => 'required|confirmed|string|min:6',
            'bank_card'=>'required|numeric|unique:users']);
        $user = User::create([
            'full_name'=>$request->get('full_name'),
            'email'=>$request->get('email'),
            'login'=>$request->get('login'),
            'address'=>$request->get('address'),
            'phone'=>$request->get('phone'),
            'password'=>bcrypt($request->get('password')),
            'bank_card'=>$request->get('bank_card'),
        ]);
        $token = JWTAuth->fromUser($user);
        //auth()->login($user,$request->get('remember'));
        //return response()->json(["name"=>Auth::user()->getAuthIdentifierName()]);
        return response()->json(compact($token));

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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        if(Auth::check()) return response()->json(Auth::user());
        else return response()->json(["your mom"=>"is very hot chick"]);
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
    public function update(Request $request, $id)
    {
        //
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
