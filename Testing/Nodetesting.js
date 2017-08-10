var mocha = require('mocha');
var chai = require('chai');
var assert = require('chai').assert;
var AI = require('../routes/AI');
var apis = require('../routes/api');
var index = require('../routes/index');
var users = require('../routes/users');

describe('AI', function() {
    it("Returns a string of test data run by the python script", function() {
        var output = AI.router.get('/');
        assert.equal(output, "Sum of numbers=43");
    });
});

describe('AI', function() {
    it("Returns a string of test data run by register calls", function() {
        var output = apis.router.get('/register')
        assert.equal(output, "{Success: 200}");
    });
});

describe('AI', function() {
    it("Returns a string of test data run by login calls", function() {
        var output = apis.router.get('/login')
        assert.equal(output, "{Success: 200}");
    });
});

describe('AI', function() {
    it("Returns a string of test data run by collectFunds calls", function() {
        var output = apis.router.get('/collectFunds')
        assert.equal(output, "{Success: 200}");
    });
});
describe('AI', function() {
    it("Returns a string of test data run by pollProvince calls", function() {
        var output = apis.router.get('/pollProvince')
        assert.equal(output, "{Success: 200}");
    });
});

describe('AI', function() {
    it("Returns a string of test data run by getFunds calls", function() {
        var output = apis.router.get('/getFunds')
        assert.equal(output, "{Success: 200}");
    });
});

describe('AI', function() {
    it("Returns a string of test data run by getProfile calls", function() {
        var output = apis.router.get('/getProfile')
        assert.equal(output, "{Success: 200}");
    });
});