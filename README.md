#trackThis.js



Simple jQuery library for tracking events in Google Analytics based on a HTML class and data attribute.

##Setting Up

### \<a> Tags

Adds onClick event, records the analytics info then returns true as a callback.
	
	<a href="/" class="trackThis" data-trackThis="category,action,label,value(int)">Link Text</a>
	
### \<a href="tel:"> Tags

This functionality requires Modernizr's (https://github.com/Modernizr/Modernizr) *no-touch* class on the \<html> tag.

Adds onClick event just like \<a> above except that on .no-touch it hides the last 3 digits and replaces with "..." and clicking will reveal the number and add .revealed class, clicking again will perform the tel: action.
	
	<a href="tel:+61406650430" class="trackThis" data-trackThis="category,action,label,value(int)">tel:+61406650430</a>.
	
### \<input type="submit"> Tags

Adds onSubmit event, records the analytics info the returns true as a callback.
	
	<input type="submit" name="submit" id="submit" value="Send Message" class="trackThis" data-trackThis="category,action,label,value(int)">


