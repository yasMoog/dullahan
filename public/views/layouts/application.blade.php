<!DOCTYPE html>
<html lang="en">
<head>
 <meta charset="utf-8">
 <title>Laravel4 &amp; Backbone | Nettuts</title>
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <meta name="description" content="A single page blog built using Backbone.js, Laravel, and Twitter Bootstrap">
 <meta name="author" content="Conar Welsh">
 
 <link href="{{ asset('css/styles.css') }}" rel="stylesheet">
 
 <!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
 <!--[if lt IE 9]>
 <script src="{{ asset('js/html5shiv.js') }}"></script>
 <![endif]-->
</head>
<body>
 

 
<nav class="navbar navbar-inverse" role="navigation">
  <div class="container-fluid">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="#">The Dollars</a>
    </div>

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">
        <li class="active"><a href="#">Link</a></li>
        <li><a href="#">Link</a></li>
        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown <b class="caret"></b></a>
          <ul class="dropdown-menu">
            <li><a href="#">Action</a></li>
            <li><a href="#">Another action</a></li>
            <li><a href="#">Something else here</a></li>
            <li class="divider"></li>
            <li><a href="#">Separated link</a></li>
            <li class="divider"></li>
            <li><a href="#">One more separated link</a></li>
          </ul>
        </li>
      </ul>
      <form class="navbar-form navbar-left" role="search">
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Search">
        </div>
        <button type="submit" class="btn btn-default">Submit</button>
      </form>
      <ul class="nav navbar-nav navbar-right">
        <li><a href="#">Link</a></li>
        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown <b class="caret"></b></a>
          <ul class="dropdown-menu">
            <li><a href="#">Action</a></li>
            <li><a href="#">Another action</a></li>
            <li><a href="#">Something else here</a></li>
            <li class="divider"></li>
            <li><a href="#">Separated link</a></li>
          </ul>
        </li>
      </ul>
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>

<div class="alert"></div>


 <div class="container" data-role="main">
  {{--since we are using mustache as the view, it does not have a concept of sections like blade has, so instead of using @yield here, our nested view will just be a variable that we can echo--}}
 
  {{ $content }}
 
 </div> <!-- /container -->
 
 <!-- Placed at the end of the document so the pages load faster -->
 <script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js"></script> <!-- use Google CDN for jQuery to hopefully get a cached copy -->
 <script src="{{ asset('node_modules/underscore/underscore-min.js') }}"></script>
 <script src="{{ asset('node_modules/backbone/backbone-min.js') }}"></script>
 <script src="{{ asset('node_modules/mustache/mustache.js') }}"></script>
 <script src="{{ asset('js/bootstrap.min.js') }}"></script>
 <script src="{{ asset('js/app.js') }}"></script>
 @yield('scripts')
</body>
</html>