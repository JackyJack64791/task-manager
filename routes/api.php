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

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});
    Route::get('profile','UserController@show')->name('profile');
    Route::get('login','SessionController@index');
    Route::post('login','SessionController@create')->name('login');
    Route::put('update', "UserController@update")->name('update');
//    Route::post('logout', 'SessionController@destroy')->name('logout');
    Route::post('register', 'UserController@register')->name('register');
Route::post('reset/email','Auth\ForgotPasswordController@sendResetLinkEmail');
Route::post('reset/password', 'Auth\ResetPasswordController@reset');

Route::get('users','UserController@index');

Route::post('project/create','ProjectController@store');
Route::put('project/update/{id}','ProjectController@update');
Route::delete('project/delete/{id}', 'ProjectController@destroy');
Route::get('projects','ProjectController@show');