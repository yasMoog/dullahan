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

	// Route::get('sessions/destroy', [
	// 	'as' => 'logout',
	// 	'use' => 'SessionsController@destroy'
	// ]);

	Route::get('logout', 'SessionsController@destroy');

	Route::get('sessions/create', [
		'as' => '/',
		'uses' => 'SessionsController@create'
	]);

	Route::get('login', [
		'as' => 'login',
		'uses' => 'SessionsController@create'
	]);

Route::get('users/create', [
	'as' => 'register',
	'uses' => 'UsersController@create'
]);


Route::group(array('before' => 'auth'), function()
{

	Route::get('/', 'SessionsController@create');

    // Users
	Route::resource('users', 'UsersController');
		
		Route::get('forgot-password', [
			'as' => 'forgot-password',
			'uses' => 'UsersController@forgot'
		]);
		
		Route::get('users/{username}', 'UsersController@show');
		// Route::get('users/{username}/edit', 'UsersController@edit'); // Maybe? Would need to default back to logged in user if there's an attempt to edit someone elses profile
		Route::get('users', ['as' => 'memberslist', 'use' => 'UsersController@index']);

	// Route::resource('profile', 'ProfilesController'); // Maybe? Would be cleaner than the above alternative, but redundancy much?

	// Pages
	Route::get('home', 'HomeController@index');

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

	Route::get('chat', 'PagesController@chatroom');
});

