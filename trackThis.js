//trackThis.js
//http://github.com/DashMedia/trackThis.js/

// export default class trackThis {
//

// code
class trackThis {

	constructor(settings, userExt){
		let defaults = {
			fileExt: "",
			UACode: "",
			AltUA: "UA-16630497-44" //default AltUA code
		};

		settings = Object.assign(defaults, settings);
		this.userExt = userExt;
		this.settings = settings;
		this.init();
		this.attachEvents();
	}


	init() {
		// console.log('test');
		//Add async code
		if (this.settings.UACode) {
			(function(i, s, o, g, r, a, m) {i['GoogleAnalyticsObject'] = r;
			i[r] = i[r] || function() {(i[r].q = i[r].q || []).push(arguments)}, i[r].l = 1 * new Date();
			a = s.createElement(o),m = s.getElementsByTagName(o)[0];
			a.async = 1;
			a.src = g;
			m.parentNode.insertBefore(a, m)
		})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
		window.ga('create', settings.UACode, 'auto');
		ga('send', 'pageview');
	}

	//Add tracking for alternate UA tracking code
	if (this.settings.AltUA) {
		ga('create', this.settings.AltUA, 'auto', {'name': 'aggrigate'});
		ga('aggrigate.send', 'pageview');
	}
}

attachEvents(){
	//Telephone numbers such as autoformated tel: links on mobile devices.
	let tel_links = document.querySelectorAll('a[href^="tel:"]');
	for (let i = 0; i < tel_links.length; i++) {

		tel_links[i].addEventListener("click", function(event) {
			event.preventDefault();
			let theLabel = tel_links[i].getAttribute('href');
			ga('send', 'event', 'Telephone', 'Clicked', theLabel, {
				'hitCallback': function() {
					window.location.href = theLabel;
				}
			});
			console.log('tel event');
		});

	}

	//Email links that open the default mail client.
	let mail_links = document.querySelectorAll('a[href^="mailto:"]');
	for (let i = 0; i < mail_links.length; i++) {

		mail_links[i].addEventListener("click", function(event){
			event.preventDefault();
			let theLabel = mail_links[i].getAttribute('href');
			ga('send', 'event', 'Email', 'Clicked', theLabel, {
				'hitCallback': function() {
					window.location.href = theLabel;
				}
			});
			console.log('mail event');
		});

	}

	//Intrapage links/anchors that jump down the page or trigger some javascript action.
	let path_links = document.querySelectorAll('a[href^="#"]');
	for (let i = 0; i < path_links.length; i++) {

		path_links[i].addEventListener("click", function(event){
			let theLabel = path_links[i].getAttribute('href');
			ga('send', 'pageview', {
				'page': window.location.pathname + theLabel,
			});
			console.log('internal event');
		});

	}

	//External links, also turns the link into target="_blank" rel="external".
	let ext_links = document.querySelectorAll('a[href*="//"]:not([href*="' + location.hostname.replace("www.", "") + '"])');
	for (let i = 0; i < ext_links.length; i++) {
		ext_links[i].addEventListener("click",function(event){

			let link = ext_links[i];

			let theLabel = link.getAttribute('href');
			let rel = link.getAttribute('rel') != undefined ? ' ' + link.getAttribute('rel') : '';

			link.setAttribute('target', '_blank');
			link.setAttribute('rel', 'external' + rel);
			ga('send', 'event', 'External Link', 'Clicked', theLabel);

		});

	}


	let link_data_track = document.querySelectorAll('a[data-trackthis]');
	for (let i = 0; i < link_data_track.length; i++) {

		link_data_track[i].addEventListener("click",function(event){
			let theLabel = link_data_track.getAttribute('href');
			let match = theLabel.match(/^([^:\/?#]+:)?(?:\/\/([^\/?#]*))?([^?#]+)?(\?[^#]*)?(#.*)?/);
			let isExt = (typeof match[1] === "string" && match[1].length > 0 && match[1].toLowerCase() !== location.protocol);
			let isDiffPort = (typeof match[2] === "string" && match[2].length > 0 && match[2].replace(new RegExp(":(" + {
				"http:": 80,
				"https:": 443
			}[location.protocol] + ")?$"), "") !== location.host);
			//
			if (isExt || isDiffPort) {
				console.log('external link');
			} else {
				console.log('internal link');
			}
			ga('send', 'event', 'Link', 'Clicked', theLabel);
		});
	}

	//FILE DOWNLOADS//
	//Default file extensions
	let trackExt = ["pdf", "zip", "dmg"];
	//check for file types defined by user
	this.userExt = this.settings.fileExt.split(",");
	this.userExt = trackExt.concat(this.userExt);

	// sadd jQuery selecters to each ext
	for (let i = 0; i < this.userExt.length; i++) {
		let data = this.userExt[i];
		let data_trimmed = data.toString().replace(/^\s\s*/, '').replace(/\s\s*$/, '');
		this.userExt[i] = 'a[href$=".' + data_trimmed + '"]';
		console.log(this.userExt[i]);
	}

	//combine reduce array into single string for searching
	this.userExt = this.userExt.join(",");
	// this.userExt = this.userExt.substr(0,this.userExt.length - 1);
	// select all items that match

	// File downloads, add additional file types if you want. also turns the link into target="_blank" rel="external".
	let link = document.querySelectorAll(this.userExt);
	console.log(link);
	for (let i = 0; i < link.length; i++) {
		link[i].addEventListener("click", function(event){

			let theLabel = link[i].getAttribute('href');
			let rel = link[i].getAttribute('rel') != undefined ? ' ' + link[i].getAttribute('rel') : '';
			link[i].setAttribute('target', '_blank');
			link[i].setAttribute('rel', 'external' + rel);
			ga('send', 'event', 'File', 'Downloaded', theLabel);
			// _gaq.push(['_trackEvent', 'File', 'Downloaded', theLabel], function() {
			// 	return true;

		});
	}
}
}






//END TrackTthis();
