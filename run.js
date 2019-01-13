var exec = require("child_process").exec;

(function referral_traffic_via_tor(i) {
	exec("phantomjs --proxy-type=socks5 --proxy=127.0.0.1:9050 referral_traffic.js", (err, out) => {
		console.log(err, out);
		
		setTimeout(() => {
			referral_traffic_via_tor();	
		}, Math.random()*1500+1000);	
	
	});

})(0);


(function base_traffic_no_tor(i) {
	exec("phantomjs traffic.js", (err, out) => {
		console.log(err, out);
		
		setTimeout(() => {
		 base_traffic_no_tor();		
		}, Math.random()*1500+1000);	
	});

})(0);


