<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('profile', 'UserController@show')->name('profile');
Route::post('login', 'SessionController@create')->name('login');
Route::post('logout', "SessionController@destroy")->name('logout');
Route::put('update', "UserController@update")->name('update');
Route::post('skills/update','SkillController@update_skills')->name('skills.update');

Route::post('register', 'UserController@register')->name('register');
Route::post('reset/email', 'Auth\ForgotPasswordController@sendResetLinkEmail');
Route::post('reset/password', 'Auth\ResetPasswordController@reset');
Route::post('change/password', 'UserController@changePassword');

Route::get('users/{team}', 'UserController@index');

Route::post('project/create', 'ProjectController@store');
Route::put('project/update/{id}', 'ProjectController@update');
Route::delete('project/delete/{id}', 'ProjectController@destroy');
Route::get('projects/{team}', 'ProjectController@show');

Route::get('tasks/{team}', 'TaskController@show');
Route::post('task/create', 'TaskController@store');
Route::put('task/update/{id}','TaskController@update');
Route::delete('task/delete/{id}','TaskController@destroy');
Route::put('task/choose/{id}','TaskController@choose_task');
Route::put('task/status/update','TaskController@update_status');

Route::get('comments/{id}', 'CommentController@index');
Route::post('comment/create', 'CommentController@store');
Route::put('comment/update/{id}','CommentController@update');
Route::delete('comment/delete/{id}','CommentController@destroy');

Route::get('skills', 'SkillController@index');
Route::post('skill/create', 'SkillController@store');
Route::put('skill/update/{id}','SkillController@update');
Route::delete('skill/delete/{id}','SkillController@destroy');

Route::get('teams', 'TeamController@index');
Route::post('team/create', 'TeamController@store');
Route::put('team/update/{id}','TeamController@update');
Route::delete('team/delete/{id}','TeamController@destroy');
Route::post('team/user/add', 'TeamController@add_participant');
Route::post('team/user/remove','TeamController@remove_participant');
