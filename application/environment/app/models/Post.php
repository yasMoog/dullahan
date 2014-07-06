<?php

class Post extends Eloquent {

	use UserTrait, RemindableTrait;

	protected $fillable = ['post_content'];

	public static $rules = [
		'post_content' => 'required'
	];

	public $errors;

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'posts';

	/**
	 * The attributes excluded from the model's JSON form.
	 *
	 * @var array
	 */
	

	public function isValid() {
		$validation = Validator::make($this->attributes, static::$rules);

		if($validation->passes()) return true;

		$this->errors = $validation->messages();
		return false;
	}

	public function isAdmin() {
		
	}
}
