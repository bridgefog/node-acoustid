/* jshint node:true */
"use strict";

var path = require("path"),
	acoustid = require("./"),
	test = require("tape"),
	assert = require("assert");

var TEST_RESPONSE = require('./test_response'),
	KEY = "8XaBELgH";

test("get data", function(t) {
	call(null, function(err, results) {
		t.ok(results[0]);
		t.ok(results[0].recordings);
		t.ok(results[0].recordings[1]);
		t.ok(results[0].recordings[1].releasegroups);
		t.end();
	});
});

test("meta parameter", function(t) {
	call({
		meta: "recordingids",
	}, function(err, results) {
		t.ok(results[0]);
		t.ok(results[0].recordings);
		t.ok(results[0].recordings[0]);
		t.ok(results[0].recordings[0].id);
		t.notOk(results[0].recordings[0].title);
		t.end();
	});
});

// Call acoustid on test file
function call(options, callback) {
	options = options || {};
	options.key = KEY;
	acoustid(TEST_RESPONSE.fingerprint, TEST_RESPONSE.duration, options, function(err, results) {
		assert.ifError(err);
		assert(results);
		callback.apply(this, arguments);
	});
}
