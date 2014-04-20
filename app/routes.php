<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

//create a group of routes that will belong to APIv1
Route::group(array('prefix' => 'v1'), function()
{
  //... insert API routes here...
});

Route::get('/', function()
{
	//change our view name to the view we created in a previous step
	//notice that we do not need to provide the .mustache extension
	return View::make('layouts.application')->nest('content', 'app');
});