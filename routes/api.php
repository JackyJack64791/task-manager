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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
    //Route::get('login','HomeController@index');
    //Route::get('login', 'Auth\LoginController@showLoginForm')->name('login');
    Route::get('profile','UserController@show')->name('profile');
    //Route::post('login', 'Auth\LoginController@login')->name('login');
    Route::get('login','SessionController@index');
    Route::post('login','SessionController@create')->name('login');
    Route::put('update', "UserController@update")->name('update');
//    Route::post('logout', 'SessionController@destroy')->name('logout');

// Registration Routes...
//    Route::get('register', function(){
//       return response("GET::api/register");
//    });
    Route::post('register', 'UserController@register')->name('register');

// Password Reset Routes...
//Route::post('password/email', 'Auth\ForgotPasswordController@getResetToken');
Route::post('reset/email','Auth\ForgotPasswordController@sendResetLinkEmail');
Route::post('reset/password', 'Auth\ResetPasswordController@reset')->name('password.reset');


