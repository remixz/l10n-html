test:
	tap test/server/*.js

browser-test:
	browserify test/browser/test.js > test/browser/bundle.js
	open test/browser/test.html

.PHONY: test browser-test