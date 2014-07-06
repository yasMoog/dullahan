<?php namespace Dullahan\Composers;

use Auth;
use User;
use Dullahan\Repositories\ForumRepository;
use Thread;

class GlobalComposer {

	protected $user;
	protected $forum;
	protected $thread;

	public function __construct(User $user, ForumRepository $forum, Thread $thread) {
		$this->user = $user;
		$this->forum = $forum;
		$this->thread = $thread;
	}

	public function compose($view) {
		$data = array(
			'current_user' => Auth::user(),
			'forums' => $this->forum->getAll(),
			'threads' => Thread::all()
		);

		$view->with('current_user', 'John Smith');

		// $view->with('current_user', Auth::user());
		// $view->with('forums', $this->forum->getAll());
		// $view->with('threads', Thread::all());
	}

}