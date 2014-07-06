<?php

class SessionsController extends BaseController {
	
	public function create() {
		
		return View::make('landing');
	}

	public function store() {
		
		if(Auth::attempt(Input::only('username','password'), true)) :
			return Redirect::to('/home');
		endif;

		return Redirect::to('/');
	}

	public function destroy() {
		Auth::logout();

		return Redirect::to('/home');
	}

}

?>