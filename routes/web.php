<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get("reset/password","HomeController@index")->name('password.reset');

Route::group(['middleware'=>'web'],function(){
    Route::get('/{path?}', [
        'uses' => 'HomeController@index',
        'as' => 'index',
        'where' => ['path' => '^((?!api).)*$']
    ]);
});
