#trackThis.js

Simple Javascript/jQuery script for turbo charging Google Analytics by tracking a variety of page events that aren't tracked by default.

You can try the live demo at http://dev.jon.haslett.id.au/trackthis/

##Target Elements

trackThis.js targets the following elements:

###Telephone Numbers	
	a[href^="tel:"]
	
The equivalent google analytics call:

	_gaq.push(['_trackEvent', 'Phone Number', 'Dialed', '+61406650430']);
		
###Email Addresses	

	a[href^="mailto:"]
	
The equivalent google analytics call:

	_gaq.push(['_trackEvent', 'Email Address', 'Clicked', 'trackThis@dashmedia.com.au']);
	
###Intrapage Links

	a[href^="#"]
	
The equivalent google analytics call:
	
	gaq.push(['_trackPageview', '/page-url/#anchor']);

##Setting Up

### 1. Use Google Analytics Async Tracking Code

Something like…
	
	<!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
    <script type="text/javascript">
		var _gaq = _gaq || [];
		_gaq.push(['_setAccount', 'UA-XXXXX-X']);
		_gaq.push(['_trackPageview']);
		(function() {
			var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
			ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
			var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
		})();
	</script>
		
If you have old Google Analytics code you might need to update it.
		
### 2. Add trackThis.js

Use the minified version for production and include it with your other *.js files to reduce the number of http requests.

### 3. There is no step 3

That's it, you're done.