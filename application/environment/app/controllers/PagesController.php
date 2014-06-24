<?php

class PagesController extends BaseController {

	/*
	|--------------------------------------------------------------------------
	| Default Home Controller
	|--------------------------------------------------------------------------
	|
	| You may wish to use controllers instead of, or in addition to, Closure
	| based routes. That's great! Here is an example controller method to
	| get you started. To route to this controller, just add the route:
	|
	|	Route::get('/', 'HomeController@showWelcome');
	|
	*/

	public function home()
	{
		return View::make('home');
	}

	// public function forum($name) {
	// 	$forum = Forums::where('title', '=', $name);
	// 	$threads = Threads::where('forum_id', '=', $forum->id);

	// 	return View::make('forum')->with('threads', $threads);
	// }

	// public function thread($name, $page = 1) {
	// 	$thread = Threads::where('title', '=', $name);
	// 	$posts = Posts::where('thread_id', '=', $thread->id)->take($page*10);

	// 	return View::make('thread')->with('posts', $posts);
	// }

	// public function invite()
	// {
	// 	return View::make('invite');
	// }

	// public function memberlist($page = 1)
	// {
	// 	$members = Users::get()->take($page*10);
	// 	return View::make('memberlist')->with('members', $members);
	// }

	// public function chatroom()
	// {
	// 	return View::make('chatroom');
	// }

}
