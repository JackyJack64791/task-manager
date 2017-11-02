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
    Route::resource('login','SessionController',['only'=>['index']]);
    Route::post('login','SessionController@create')->name('login');
    Route::post('logout', 'SessionController@destroy')->name('logout');

// Registration Routes...
    Route::get('register', function(){
       return response("GET::api/register");
    });
    Route::post('register', 'UserController@register')->name('register');

// Password Reset Routes...
//$this->get('password/reset', 'Auth\ForgotPasswordController@showLinkRequestForm')->name('password.request');
    Route::post('password/email', 'Auth\ForgotPasswordController@sendResetLinkEmail')->name('password.email');
//$this->get('password/reset/{token}', 'Auth\ResetPasswordController@showResetForm')->name('password.reset');
    Route::post('password/reset', 'Auth\ResetPasswordController@reset');



