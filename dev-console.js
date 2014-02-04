var page = require('webpage').create(), system = require('system'), username, password;

if (system.args.length !== 3) {
	console.log('Usage: dev-console.js username password');
	phantom.exit(1);
} else {
	username = system.args[1];
	password = system.args[2];
	page.open("https://play.google.com/apps/publish", function() {
		page.evaluate(function(name, pwd) {
			document.querySelector('input[id=Email]').value = name;
			document.querySelector('input[id=Passwd]').value = pwd;
			document.querySelector('input[id=signIn]').click();
			// document.querySelector('form').submit();
		}, username, password);
		window.setTimeout(function() {
			var links = page.evaluate(function() {
				return [].map.call(document
						.querySelectorAll('a[data-column=RATINGS]'), function(
						link) {
					return link.getAttribute("href") + ' ' + link.text;
				});
			});

			console.log(links.join('\n'));
			phantom.exit();
		}, 3000);
	});
}