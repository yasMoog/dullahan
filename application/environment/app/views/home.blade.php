@extends('layouts.default')

@section('content')
	<h1>Welcome, {{ isset($current_user) ? $current_user->username : "Undefined" }}</h1>
	
	@if(isset($forums))
	<ul>
		@foreach($forums as $forum)
			<li>{{ link_to("/" . $forum->title , $forum->title) }}</li>
		@endforeach
	</ul>
	@endif

	
	@if(isset($threads))
		<ul>
			@foreach($threads as $thread)
				<li>{{ link_to("/" . $thread->title , $thread->title) }}</li>
			@endforeach
		</ul>
	@endif

@stop