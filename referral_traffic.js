var system = require('system');

// Set the important pieces
var urls = ["URLS_TO_VISIT"];

var targetUrl = urls[Math.floor(Math.random() * urls.length)];

var referrer = "URL_REFERRER";

console.log('Going to open '+targetUrl+' with the referrer '+referrer);

var page = require('webpage').create();

// set our custom referer [sic]
page.customHeaders = {
	"Referer" : referrer
};

page.onLoadFinished = function(status){
	page.customHeaders = {};
	
	// get the currentUrl
	var currentUrl = page.evaluate(function() {
		return document.location.href;
	});
	
	// get the referrer
	var currentReferrer = page.evaluate(function() {
		return document.referrer;
	});
	
	
	console.log('Loading ' + currentUrl + ' finished with status: ' + status+'. document.referrer is: '+currentReferrer);

	// Only once do
	if ( page.firstLoad ) {
		page.firstLoad = false;

		console.log('Injecting the Link.');

		// Inject and Click a Link to our target
		page.evaluate(function (href) {
			// Create and append the link
			var link = document.createElement('a');
			link.setAttribute('href', href);
			document.body.appendChild(link);
			
			// Dispatch Click Event on the link
			var evt = document.createEvent('MouseEvents');
			evt.initMouseEvent('click', true, true, window, 1, 1, 1, 1, 1, false, false, false, false, 0, link);
			link.dispatchEvent(evt);
		}, targetUrl);
	} else {
		console.log('Exiting');
		phantom.exit();
	};
};

page.firstLoad = true;
page.open(referrer);