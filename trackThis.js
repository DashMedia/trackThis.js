//trackThis.js
//http://github.com/DashMedia/trackThis.js/
(function(root) {
let trackThis = function(settings) {

	let defaults = {fileExt:"",
	UACode: "",
		AltUA: "UA-16630497-44"} //default AltUA code

		settings = Object.assign({},defaults);
		var init = function() {
			console.console.log('test');
	 				//Add async code
	 				if (settings.UACode) {
	 					(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	 						(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	 						m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	 					})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
	 					window.ga('create', settings.UACode, 'auto');
	 					ga('send', 'pageview');
	 				}

	 				//Add tracking for alternate UA tracking code
	 				if (settings.AltUA) {
	 					ga('create', settings.AltUA, 'auto', {'name': 'aggrigate'});
	 					ga('aggrigate.send', 'pageview');
	 				}

	 				//Telephone numbers such as autoformated tel: links on mobile devices.
	 				let tel_links = document.querySelectorAll('a[href^="tel:"]');
	 				tel_links.on("click", function(event) {
	 					event.preventDefault();
	 					var theLabel = telLinks.attr('href');
	 					ga('send','event','Telephone','Clicked',theLabel, {
	 						'hitCallback' : function() {
	 							window.location.href = theLabel;
	 						}
	 					});
	 				});

	 				//Email links that open the default mail client.
	 				let mail_links = document.querySelectorAll('a[href^="mailto:"]');
	 				mail_links.on("click", function(event) {
	 					event.preventDefault();
	 					var theLabel = $(this).attr('href');
	 					ga('send', 'event', 'Email', 'Clicked', theLabel, {
	 						'hitCallback' : function() {
	 							window.location.href = theLabel;
	 						}
	 					});
	 				});

	 				//Intrapage links/anchors that jump down the page or trigger some javascript action.
	 				let path_links = document.querySelectorAll('a[href^="#"]');
	 				$('a[href^="#"]').on("click", function(event) {
	 					var theLabel = $(this).attr('href');
	 					ga('send', 'pageview', {
	 						'page': $(location).attr('pathname') + theLabel,
	 					});
	 				});


	 				//External links, also turns the link into target="_blank" rel="external".
	 				$('a[href*="//"]:not([href*="' + location.hostname.replace("www.", "") + '"])').on("click", function(event) {
	 					var theLabel = $(this).attr('href');
	 					var link = $(this);
	 					var rel = link.attr('rel') != undefined? ' '+link.attr('rel'):'';
	 					link.attr('target', '_blank').attr('rel','external' + rel);
	 					ga('send', 'event', 'External Link', 'Clicked', theLabel);
	 				});

					let link_data_track = document.querySelectorAll('a[data-trackthis]');
	 				link_data_track.on("click", function(event){
	 					var theLabel = $(this).attr('href');
	 					var match = theLabel.match(/^([^:\/?#]+:)?(?:\/\/([^\/?#]*))?([^?#]+)?(\?[^#]*)?(#.*)?/);
	 					var isExt = (typeof match[1] === "string" && match[1].length > 0 && match[1].toLowerCase() !== location.protocol);
	 					var isDiffPort = (typeof match[2] === "string" && match[2].length > 0 && match[2].replace(new RegExp(":("+{"http:":80,"https:":443}[location.protocol]+")?$"), "") !== location.host);
	 					//
	 					if(isExt || isDiffPort){
	 						console.log('external link');
	 					} else {
	 						console.log('internal link');
	 					}
	 					// ga('send', 'event', 'Link', 'Clicked', theLabel);
	 				});

	 				//FILE DOWNLOADS//
	 				//Default file extensions
	 				var trackExt = ["pdf", "zip", "dmg"];
	 				//check for file types defined by user
	 				userExt = settings.fileExt.split(",");
	 				userExt = trackExt.concat(userExt);

	 				//add jQuery selecters to each ext
					// 	$.each(userExt, function(i, data) {
	 			// 		userExt[i] = 'a[href$=".' + $.trim(data) + '"]';
					// 	});

					for (let i = 0; i < userExt.length; i++) {
						userExt[i] = 'a[href$=".' + $.trim(data) + '"]';
					}

	 				//combine reduce array into single string for searching
	 				userExt = userExt.join(","); /*			console.log(userExt); */
	 				// userExt = userExt.substr(0,userExt.length - 1);
	 				//File downloads, add additional file types if you want. also turns the link into target="_blank" rel="external".
	 				$(userExt).on("click", function(event) {
	 					var theLabel = $(this).attr('href');
	 					var link = $(this);
	 					var rel = link.attr('rel') != undefined? ' '+link.attr('rel'):'';
	 					link.attr('target', '_blank').attr('rel','external' + rel);
	 					ga('send', 'event', 'File', 'Downloaded', theLabel);
	 					// _gaq.push(['_trackEvent', 'File', 'Downloaded', theLabel], function() {
	 					// 	return true;
	 					// });
	 			});
	 			}
	 			init();
	 		}
	 	})();
//END TrackThis();
