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

// Sessions
Route::resource('sessions', 'SessionsController');
	Route::get('logout', 'SessionsController@destroy');

// Users
Route::resource('users', 'UsersController');
	Route::get('register', 'UsersController@create');
	Route::get('forgot-password', 'UsersController@forgot');
	Route::get('users/{username}', 'UsersController@show');
	// Route::get('users/{username}/edit', 'UsersController@edit'); // Maybe? Would need to default back to logged in user if there's an attempt to edit someone elses profile
	Route::get('memberslist', 'UsersController@index');

// Route::resource('profile', 'ProfilesController'); // Maybe? Would be cleaner than the above alternative, but redundancy much?

// Pages
Route::get('/', 'SessionsController@create');
Route::get('home', 'PagesController@home');

// Forums
Route::resource('forums', 'ForumsController');

//	Threads
Route::resource('threads', 'ThreadsController');
	Route::get('threads', 'ThreadsController@create');
	Route::get('{forum}/{thread}', 'ThreadsController@show');

// Posts
Route::resource('posts', 'PostsController');
	Route::get('posts', 'PostsController@create');
	Route::get('{forum}/{thread}/{id}', 'PostsController@show');

// Invites
Route::resource('invites', 'InvitesController');

// Members List
Route::get('memberlist', 'PagesController@memberlist');
	// Pagination (simple for now, possibly turned into a reusable function)
	Route::get('memberslist/page/{page}', 'PageController@memberlist');

Route::get('chat', 'PagesController@chatroom');