
// Main JS Functions in here.

$(function() {
	
	var $mobile_nav = $('.mobile-nav');

	$('.mobile-nav-trigger').on('click', function(e){
		e.preventDefault();
		$mobile_nav.slideToggle();
		return false;
	});

	var $mobile_share = $('.mobile-share-nav .nav');

	$('.mobile-share-nav-trigger').on('click', function(e){
		e.preventDefault();
		$mobile_share.slideToggle();
		return false;
	});

	var $popout = $('.popout-video');
	var $blackout = $('.blackout');
	var $vid = $('.watch-video');

	$vid.on('click', function(e){
		e.preventDefault();
		var vid_code = $vid.attr('data-video');
		
		$blackout.fadeIn('slow');
		$popout.find('iframe').attr('src', '//www.youtube.com/embed/'+ vid_code +'?rel=0');
		$popout.fadeIn('slow');

		return false;
	});
	

	$('.close').on('click', function(e){
		e.preventDefault;

		$blackout.hide();
		$popout.hide().find('iframe').attr('src', '');

		return false;
	});

	// twitterFetcher.fetch('391077876331577345', 'tweet', 1, true, false);

	twitterFetcher.fetch('391077876331577345', '', 1, true, false, true, '', false, handleTweets);

      function handleTweets(tweets){
          var x = tweets.length;
          var n = 0;
          var element = document.getElementById('tweet');
          var html = '';
          while(n < x) {
            html += '<p>' + tweets[n] + '</p>';
            n++;
          };
          element.innerHTML = html;
      }

});