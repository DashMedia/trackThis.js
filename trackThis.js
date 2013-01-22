//trackThis.js
//http://github.com/jonathanhaslett/trackThis.js
function trackThis(){
	
	//Telephone numbers such as autoformated tel: links on mobile devices.
	$('a[href^="tel:"]').on("click", function(event){
			var theLabel = $(this).attr('href');
			_gaq.push(
				['_trackEvent', 'Telephone', 'Clicked', theLabel],
				function(){
					return true;
				}
			);
	});
	
	//Email links that open the default mail client.
	$('a[href^="mailto:"]').on("click", function(event){
			var theLabel = $(this).attr('href');
			_gaq.push(
				['_trackEvent', 'Email', 'Clicked', theLabel],
				function(){
					return true;
				}
			);
	});
	
	//Intrapage links/anchors that jump down the page or trigger some javascript action.
	$('a[href^="#"]').on("click", function(event){
			var theLabel = $(this).attr('href');
			_gaq.push(
				['_trackPageview', $(location).attr('pathname') + theLabel],
				function(){
					return true;
				}
			);
	});
	
	//External links, also turns the link into target="_blank" rel="external".
	$('a[href*="://"]:not([href*="'+location.hostname.replace("www.","")+'"])').on("click", function(event){
			var theLabel = $(this).attr('href');
			$(this).attr('target','_blank').attr('rel','external');
			_gaq.push(
				['_trackEvent', 'External Link', 'Clicked', theLabel],
				function(){
					return true;
				}
			);
	});
	
	//File downloads, add additional file types if you want. also turns the link into target="_blank" rel="external".
	$('a[href$=".pdf"],a[href$=".zip"],a[href$=".dmg"]').on("click", function(event){
			var theLabel = $(this).attr('href');
			$(this).attr('target','_blank').attr('rel','external');
			_gaq.push(
				['_trackEvent', 'File', 'Downloaded', theLabel],
				function(){
					return true;
				}
			);
	});
	
}//END TrackThis();
trackThis();