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
    public function create(Request $request)
    {
        $credentials = [
            'email'=>$request->get('email'),
            'password'=>$request->get('password'),
            ];
        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(["error" => 'wrong_credentials'], 401);
            }
        } catch (JWTException $e) {
            return response()->json(["error" => "for you"], 500);
        }
        return response()->json(compact('token'));
    }

    public function destroy()
    {
        try {

            if (! $user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(["error" => 'user_not_found'], 404);
            }

        } catch (TokenExpiredException $e) {
            try {
                $refreshed = JWTAuth::refresh(JWTAuth::getToken());
                $user = JWTAuth::setToken($refreshed)->toUser();
                header('Authorization: Bearer ' . $refreshed);

            } catch (JWTException $e) {
                return response()->json(["error" => 'token_expired'], $e->getStatusCode());
            }

        } catch (TokenInvalidException $e) {

            return response()->json(["error" => 'token_invalid'], $e->getStatusCode());

        } catch (JWTException $e) {

            return response()->json(["error" => 'token_absent'], $e->getStatusCode());

        }

        JWTAuth::invalidate();
        Auth::logout();


        return response()->json([],200);
    }
}
