<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;

class UserController extends Controller
{

    public function __construct()
    {
        $this->middleware('jwt.auth')->except('register');
//        $this->middleware('jwt.refresh')->except('register');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {

            if (! $user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['user_not_found'], 404);
            }

        } catch (TokenExpiredException $e) {
            try {
                $refreshed = JWTAuth::refresh(JWTAuth::getToken());
                $user = JWTAuth::setToken($refreshed)->toUser();
                header('Authorization: Bearer ' . $refreshed);

            } catch (JWTException $e) {
                return response()->json(['token_expired'], $e->getStatusCode());
            }

        } catch (TokenInvalidException $e) {

            return response()->json(['token_invalid!'], $e->getStatusCode());

        } catch (JWTException $e) {

            return response()->json(['token_absent'], $e->getStatusCode());

        }
        return response()->json(User::where('id', '!=', auth()->id())->get());
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

        $token = JWTAuth::fromUser($user);
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
//    public function getToken($id){
//
//    }
    public function show()
    {
        try {

            if (! $user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['user_not_found'], 404);
            }

        } catch (TokenExpiredException $e) {
//            try {
//                $refreshed = JWTAuth::refresh(JWTAuth::getToken());
//                $user = JWTAuth::setToken($refreshed)->toUser();
//                header('Authorization: Bearer ' . $refreshed);
//
//            } catch (JWTException $e) {
                return response()->json(['token_expired'], $e->getStatusCode());
//            }

        } catch (TokenInvalidException $e) {

            return response()->json(['token_invalid'], $e->getStatusCode());

        } catch (JWTException $e) {

            return response()->json(['token_absent'], $e->getStatusCode());

        }
        // the token is valid and we have found the user via the sub claim
        return response()->json(compact('user'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {

    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        try {

            if (! $user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['user_not_found'], 404);
            }

        } catch (TokenExpiredException $e) {
            try {
                $refreshed = JWTAuth::refresh(JWTAuth::getToken());
                $user = JWTAuth::setToken($refreshed)->toUser();
                header('Authorization: Bearer ' . $refreshed);

            } catch (JWTException $e) {
                return response()->json(['token_expired'], $e->getStatusCode());
            }

        } catch (TokenInvalidException $e) {

            return response()->json(['token_invalid'], $e->getStatusCode());

        } catch (JWTException $e) {

            return response()->json(['token_absent'], $e->getStatusCode());

        }
        $user_entity = User::findOrFail($request->id);
        $this->validate($request, [
            'full_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,'.$request->id,
            'login' => 'required|string|max:20|unique:users,login,'.$request->id,
            'address' => 'required|string|max:255',
            'phone' => 'required|regex:/[0-9]{1}[0-9]{10}/|unique:users,phone,'.$request->id,
            'bank_card'=> 'required|numeric|unique:users,bank_card,'.$request->id]);
        $user_entity->update($request->all());
        $token = JWTAuth::fromUser($user_entity);
        // the token is valid and we have found the user via the sub claim
        return response()->json(compact('token'));

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
