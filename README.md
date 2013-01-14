#trackThis.js

Simple Javascript/jQuery script for tracking events in Google Analytics based on a HTML class and data attributes.

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

### 3. Add the trackThis.js attributes to your html.

Example of the "data-trackThis" attribute.

	data-trackThis="category,action,label,value(int)"
	
Example of the "class" attribute.

	class="trackThis"

##Supported Tags

### \<a> Tags

Adds onClick event, records the analytics info then returns true.
	
	<a href="/" class="trackThis" data-trackThis="category,action,label,value(int)">Link Text</a>
	
### \<a href="tel:"> Tags

This option requires Modernizr's (https://github.com/Modernizr/Modernizr) *no-touch* class on the \<html> tag.

Adds onClick event just like \<a> above except that on .no-touch it hides the last 3 digits and replaces with "..." and clicking will reveal the number and add .revealed class, clicking again will perform the default tel: action.
	
	<a href="tel:+61406650430" class="trackThis" data-trackThis="category,action,label,value(int)">tel:+61406650430</a>.
	
### \<input type="submit"> Tags

**I'm still testing this one.**

Adds onSubmit event, records the analytics info the returns true.
	
	<input type="submit" name="submit" id="submit" value="Send Message" class="trackThis" data-trackThis="category,action,label,value(int)">


