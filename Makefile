test:
	tap test/server/*.js

browser-test:
	browserify test/browser/test.js > test/browser/bundle.js
	open test/browser/test.html

build:
	browserify browser.js > dist/l10n-html.js -s l10nHTML

.PHONY: test browser-test build