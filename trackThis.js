//trackThis.js
//http://github.com/jonathanhaslett/trackThis.js
(function($){
	$.fn.trackThis = function(settings){
		settings = jQuery.extend({
			fileExt: 		"",
			UACode: 		"",
		}, settings);
		var init = function(){

			if(settings.UACode){
				console.log(settings.UACode);
				window._gaq = [];
				_gaq.push(['_setAccount', settings.UACode]);
				_gaq.push(['_trackPageview']);
				(function() {
				  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
				  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/u/ga_debug.js';
				  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
				})();
			}

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
			

			//FILE DOWNLOADS//
			//Default file extensions
			var trackExt = ["pdf", "zip", "dmg"];
			//check for file types defined by user
			userExt = settings.fileExt.split(",");
			userExt = trackExt.concat(userExt);

			//add jQuery selecters to each ext
			$.each(userExt, function(i, data){
				userExt[i] = 'a[href$=".' + $.trim(data) + '"]';
			});

			//combine reduce array into single string for searching
			userExt = userExt.join(",");
			console.log(userExt);
			// userExt = userExt.substr(0,userExt.length - 1);

			//File downloads, add additional file types if you want. also turns the link into target="_blank" rel="external".
			$(userExt).on("click", function(event){
					var theLabel = $(this).attr('href');
					$(this).attr('target','_blank').attr('rel','external');
					_gaq.push(
						['_trackEvent', 'File', 'Downloaded', theLabel],
						function(){
							return true;
						}
					);
			});
		}
		init();
	}
})(jQuery);
//END TrackThis();