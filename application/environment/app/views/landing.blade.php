<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>darazu e yokoso</title>
</head>
<body>
	
	{{ Form::open(['route' => 'sessions.store']) }}
		{{ Form::password('passcode')}}
		{{ $errors->first('passcode') }}

		{{ Form::text('username')}}
		{{ Form::password('password')}}
		{{ Form::submit() }}
	{{ Form::close() }}

</body>
</html>