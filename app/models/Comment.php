<?php
/**
 * Represent a Comment Item, or Collection
 */
class Comment extends Eloquent {
 
  /**
   * Items that are "fillable"
   * meaning we can mass-assign them from the constructor
   * or $comment->fill()
   * @var array
   */
  protected $fillable = array(
    'post_id', 'content', 'author_name'
  );
 
  /**
   * Validation Rules
   * this is just a place for us to store these, you could
   * alternatively place them in your repository
   * @var array
   */
  public static $rules = array(
    'post_id'   => 'required|numeric',
    'content'   => 'required',
    'author_name' => 'required'
  );
 
  /**
   * Define the relationship with the posts table
   * @return Model parent Post model
   */
  public function post()
  {
    return $this->belongsTo('Post');
  }
 
}