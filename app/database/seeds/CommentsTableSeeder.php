<?php
 
class CommentsTableSeeder extends Seeder {
 
  public function run()
  {
    $comments = array(
      array(
        'content'   => 'Lorem ipsum Nisi dolore ut incididunt mollit tempor proident eu velit cillum dolore sed',
        'author_name' => 'Testy McTesterson',
        'post_id'   => 1,
        'created_at' => date('Y-m-d H:i:s'),
        'updated_at' => date('Y-m-d H:i:s'),
      ),
      array(
        'content'   => 'Lorem ipsum Nisi dolore ut incididunt mollit tempor proident eu velit cillum dolore sed',
        'author_name' => 'Testy McTesterson',
        'post_id'   => 1,
        'created_at' => date('Y-m-d H:i:s'),
        'updated_at' => date('Y-m-d H:i:s'),
      ),
      array(
        'content'   => 'Lorem ipsum Nisi dolore ut incididunt mollit tempor proident eu velit cillum dolore sed',
        'author_name' => 'Testy McTesterson',
        'post_id'   => 2,
        'created_at' => date('Y-m-d H:i:s'),
        'updated_at' => date('Y-m-d H:i:s'),
      ),
    );
 
    // Uncomment the below to run the seeder
    DB::table('comments')->insert($comments);
  }
 
}