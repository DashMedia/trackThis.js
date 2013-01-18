//trackThis.js
//http://github.com/jonathanhaslett/trackThis.js
function trackThis(){
	
	$('a[href^="tel:"]').on("click", function(event){
			var theLabel = $(this).attr('href');
			_gaq.push(
				['_trackEvent', 'Telephone', 'Dialed', theLabel]
			);
	});
	
	$('a[href^="mailto:"]').on("click", function(event){
			var theLabel = $(this).attr('href');
			_gaq.push(
				['_trackEvent', 'Email', 'Clicked', theLabel]
			);
	});
	
	$('a[href^="#"]').on("click", function(event){
			var theLabel = $(this).attr('href');
			_gaq.push(
				['_trackPageview', $(location).attr('pathname') + theLabel]
			);
	});
	
}//END TrackThis();
trackThis();