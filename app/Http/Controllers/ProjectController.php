<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Project;
use App\User;
use Illuminate\Support\Facades\Input;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;

class ProjectController extends Controller
{

    public function __construct()
    {
        $this->middleware('jwt.auth');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
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

        $this->validate($request, [
            'customer' => 'required',
            'title' => 'required',
            'deadline' => 'required|date',
            'description' => 'required|string',
            'specification'=>'string',
            ]);
        $project = Project::create([
            'customer_id'=>$request->get('customer'),
            'manager_id'=>auth()->id(),
            'title' => $request->get('title'),
            'deadline'=>$request->get('deadline'),
            'description'=>$request->get('description'),
            'specification'=>$request->get('specification'),
        ]);

//        return response()->json(compact('project'));
        return response()->json([],200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show()
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
        return response()->json(auth()->user()->projectsManager()->get());

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
        $project = Project::findOrFail($id)->delete();

        return response()->json([],200);

    }
}
