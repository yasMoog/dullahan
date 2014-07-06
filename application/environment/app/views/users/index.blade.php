@extends('layouts.default')

@section('header')
	<!-- <h1>Register</h1> -->
@stop

@section('content')

	@foreach ($users as $user)
		{{ link_to('users/' . $user->username, $user->username) }}
	@endforeach

@stop