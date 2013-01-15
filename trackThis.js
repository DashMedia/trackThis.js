//trackThis.js
//http://github.com/jonathanhaslett/trackThis.js
function trackThis(){
	//START <a> selector.
	$('a:not([href^="tel:"]).trackThis').each(function(){
		$(this).click(function(){
			var args = $(this).attr('data-trackThis').split(',');
			_gaq.push(
				['_trackEvent', args[0], args[1], args[2], parseInt(args[3], 10)]
			);
			return true;
		});
	});
	// END <a>" selector.
	//START <a href="tel:"> selector.
	$('a[href^="tel:"].trackThis').each(function(){
		if($('html').hasClass('no-touch')){
			var phoneNumber = $(this).html();
			$(this).html(phoneNumber.substring(0, phoneNumber.length-3) + '...');
			$(this).click(function(){
				var args = $(this).attr('data-trackThis').split(',');
				if($(this).hasClass('clicked')){
					_gaq.push(
						['_trackEvent', args[0], 'Clicked', args[2], 0]
					);
					return true;
				}else{
					$(this).addClass('clicked');
					$(this).html(phoneNumber);
					_gaq.push(
						['_trackEvent', args[0], 'Revealed', args[2], parseInt(args[3], 10)]
					);
					return false;
				}
			});
		}else{
			$(this).click(function(){
				var args = $(this).attr('data-trackThis').split(',');
				_gaq.push(
					['_trackEvent', args[0], args[1], args[2], parseInt(args[3], 10)]
				);
				return true;
			});//end function
		}//end else
	});
	// END <a href="tel:"> selector.
	//START input[type="submit"]
	/*
$('input[type="submit"].trackThis').each(function(){
		$(this).submit(function(){
			var args = $(this).attr('data-trackThis').split(',');
			_gaq.push(
				['_trackEvent', args[0], args[1], args[2], parseInt(args[3])]
			);
			return true;
		});
	});
*/
	// END input[type="submit"] selector.
}//END initTrackThis();