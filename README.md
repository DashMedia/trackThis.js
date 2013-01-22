#trackThis.js

Simple Javascript/jQuery script for turbo charging Google Analytics by tracking a variety of page events that aren't tracked by default.

##Initialisation Args

You can optionally pass the following args:

- UACode (Optional)
	- This is your Google Analytics Tracking Code, if you do not have a async Google Analytics snippit present in your page you can provide your code here and trackThis will implement one.
	- If no code is provided, trackThis assumes the Google ANanlytics async code has been implemented
- fileExt (Optional)
	- adds file extensions to the list of file extensions to be checked by trackThis, the defaults are: pdf, zip, dmg
	- value must be comma seperated string WITHOUT '.'
- Examples Args

		$(document).ready(function(){
	            $(this).trackThis({
	                fileExt: "docx, 7z",
	                UACode: "UA-XXXXXXX-XX"
	            });
	        });
	

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
	
### External Links

jQuery selector:

	a[href*='://']:not([href*='"+location.hostname.replace
           ("www.","")+"'])
	
The equivalent google analytics call:

	_gaq.push(['_trackEvent', 'External Link', 'Opened', 'http://google.com/']);

Also forces external links to open in a new window by changing the target attribute to "_blank".

### File Download Links

	a[href$=".pdf"],a[href$=".zip"],a[href$=".dmg"]
	
The equivalent google analytics call:

	_gaq.push(['_trackEvent', 'File', 'Downloaded', '/path-to/file.pdf']);

##Setting Up
		
### 1. Add trackThis.js

Use the minified version for production and include it with your other *.js files to reduce the number of http requests.

Alternatively you can include it in the head, **after jQuery and your Google Async Tracking** (if you are not useing the optional UACode variable) but **before your script**

### 2. Initialise trackThis

Inside your .js file initialise trackThis on the parent element you wish to track from, for most situations the *document* object will be perfect

	$(document).ready(function(){
		$(this).trackThis({
			//optional args
		});
	});

### 3. There is no step 3

That's it, you're done.