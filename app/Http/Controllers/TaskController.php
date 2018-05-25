<?php

namespace App\Http\Controllers;

use App\Skill;
use Illuminate\Http\Request;
use JWTAuth;
use App\Task;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;

class TaskController extends Controller
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
        //
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

//        return response()->json($request->get('skills')[0]['label'],407);
        $this->validate($request, [
            'project' => 'required',
            'title' => 'required|string',
            'description' => 'required|string',
            'priority' => 'required',
            'difficulty'=>'required',
            'hours_count'=>'numeric|nullable',
            'date_completion'=>'date|nullable',
            'possible_performer_id'=>'numeric|nullable',
            'time_search'=>'date_format:H:i|nullable',
        ]);
        $task = Task::create([
            'author_id' => auth()->id(),
            'project_id' => $request->get('project'),
            'title' => $request->get('title'),
            'description' => $request->get('description'),
            'priority' => $request->get('priority'),
            'difficulty'=> $request->get('difficulty'),
            'status'=> "new_task",
            'completion_percent'=> 0,
            'hours_count'=> $request->get('hours_count'),
            'date_completion'=> $request->get('date_completion'),
            'possible_performer_id'=> $request->get('possible_performer_id'),
            'time_search'=> $request->get('time_search'),
        ]);
        if($request->get('skills'))
        {
            foreach ($request->get('skills') as $skill)
            {
                if(Skill::where('skill', $skill['skill']))
                $task->skills()->attach($skill['id']);
                else {
                    $newSkill = Skill::create([
                        'skill' => $skill['skill']
                    ]);
                    return response()->json($newSkill,200);
                    $task->skills()->attach($newSkill->id);
                }
            }
        }

        return response()->json([],200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($team)
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
        $getTeam = auth()->user()->teams()->find($team);
        if($getTeam) {
            $tasks = [];
            foreach ($getTeam->projects()->get() as $project)
            {
                $tasks = array_merge($tasks, $project->tasks()->with('skills')->get()->toArray());
//                $count++;
            }
            return response()->json($tasks);
        }
        else return response()->json([],200);
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
        $task = Task::findOrFail($id);
        $this->validate($request, [
            'title' => 'required|string',
            'description' => 'required|string',
            'priority' => 'required',
            'difficulty'=>'required',
            'hours_count'=>'numeric|nullable',
            'date_completion'=>'date|nullable',
            'possible_performer_id'=>'numeric|nullable',
            'time_search'=>'date_format:H:i:s|nullable',
            ]);
        $task->update($request->all());
        if($request->get('skills'))
        {
            $skills = array_where($request->get('skills'), function($value, $key) {
               return Skill::find($value['id']);
            });
            $newSkills = array_map('unserialize',array_diff(array_map('serialize',$request->get('skills')), array_map('serialize',$skills)));
            $task->skills()->sync(array_column($skills,'id'));
            foreach($newSkills as $skill)
            {
                $newSkill = Skill::create([
                        'skill' => $skill['skill']
                    ]);
                    $task->skills()->attach($newSkill->id);
            }
//            return response()->json($results);
//            foreach ($request->get('skills') as $skill)
//            {
//                if(Skill::where('skill', $skill['skill']))
//                    if($task->skills()->contains($skill))
//                    $task->skills()->syncWithoutDetaching([$skill['id']]);
//                else {
//                    $newSkill = Skill::create([
//                        'skill' => $skill['skill']
//                    ]);
//                    $task->skills()->attach($newSkill->id);
////                    return response()->json($newSkill,200);
//                }
//            }
        }

        return response()->json([],200);
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
        $task = Task::findOrFail($id)->delete();

        return response()->json([],200);
    }

    public function update_status(Request $request)
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
//        $this->validate($request,[
//           'id' => 'required',
//           'status' => "in:new_task,task_is_performing,task_is_testing,task_is_ready,task_is_confirmed"
//        ]);
        $task = Task::find($request->get('id'));
        $task->update([
           'status' => $request->get('status')
        ]);
        return response()->json([],200);
    }

    public function choose_task($id)
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
        $task = Task::find($id);
        $task->update([
            'performer_id' => auth()->user()->id,
            'status' => 'task_is_performing'
        ]);

        return response()->json([],200);
    }
}
