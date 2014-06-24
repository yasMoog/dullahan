@extends('layouts.default')

@section('header')
	<!-- <h1>Register</h1> -->
@stop

@section('content')

	{{ Form::open(['route' => 'users.store']) }}
		
		<div class="form-group">
			{{ Form::label('username', 'Username') }}
			{{ Form::text('username') }}
			{{ $errors->first('username') }}
		</div>

		<div class="form-group">
			{{ Form::label('email', 'Email') }}
			{{ Form::email('email') }}
			{{ $errors->first('email') }}
		</div>

		<div class="form-group">
			{{ Form::label('password', 'Password') }}
			{{ Form::password('password') }}
			{{ $errors->first('password') }}
		</div>	

		{{ Form::Submit() }}

	{{ Form::close() }}

@stop