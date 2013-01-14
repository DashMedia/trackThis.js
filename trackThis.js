//trackThis.js
//http://github.com/jonathanhaslett/trackThis.js
function trackThis(){
	//START <a> selector.
	$('a:not([href^="tel:"]).trackThis').each(function(){
		$(this).click(function(){
			var arguments = $(this).attr('data-trackThis').split(',');
			_gaq.push(['_trackEvent', arguments[0], arguments[1], arguments[2], parseInt(arguments[3])]);		
			_gaq.push(function(){
			    return true;
			});
		});
	}); 
	// END <a>" selector.
	//START <a href="tel:"> selector.
	$('a[href^="tel:"].trackThis').each(function(){
		if($('html').hasClass('no-touch')){
			var phoneNumber = $(this).html();
			$(this).html(phoneNumber.substring(0, phoneNumber.length-3) + '...'); 
			$(this).click(function(){
				var arguments = $(this).attr('data-trackThis').split(',');
				if($(this).hasClass('clicked')){
					_gaq.push(['_trackEvent', arguments[0], 'Clicked', arguments[2], 0]);		
					_gaq.push(function(){
						return true;
					});
				}else{
					$(this).addClass('clicked');
					$(this).html(phoneNumber);
					_gaq.push(['_trackEvent', arguments[0], 'Revealed', arguments[2], parseInt(arguments[3])]);		
					return false;
				}
			});
		}else{
			$(this).click(function(){
				var arguments = $(this).attr('data-trackThis').split(',');
				_gaq.push(['_trackEvent', arguments[0], arguments[1], arguments[2], parseInt(arguments[3])]);		
				_gaq.push(function(){
			    return true;
			  });
			});//end function
		}//end else
	}); 
	// END <a href="tel:"> selector.
	//START input[type="submit"]
	$('input[type="submit"].trackThis').each(function(){
		$(this).submit(function(){
			var arguments = $(this).attr('data-trackThis').split(',');
			_gaq.push(['_trackEvent', arguments[0], arguments[1], arguments[2], parseInt(arguments[3])]);		
			_gaq.push(function(){
		    return true;
		  });
		});
	}); 
	// END input[type="submit"] selector.
}//END initTrackThis();