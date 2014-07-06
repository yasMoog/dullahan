<?php namespace Dullahan\Repositories;

use Forum;

class ForumRepository {

	public function getAll() {
		return Forum::All();
	}

}