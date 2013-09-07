test:
	tape test/server/*.js

browser-test:
	browserify test/browser/test.js | testling

build:
	browserify browser.js > dist/l10n-html.js -s l10nHTML

.PHONY: test browser-test build