<?php

class SessionsController extends BaseController {
	
	public function create() {

		if(Auth::attempt(Input::only('username','password'))) {
			return Redirect::to('/home');
		}
		
		return View::make('landing');
	}

	public function store() {
		
		if(Auth::attempt(Input::only('username','password'))) :
			return Redirect::to('/home');
		endif;

		return Redirect::to('/');
	}

	public function destroy() {
		Auth::logout();

		return Redirect::route('sessions.create');
	}

}

?>