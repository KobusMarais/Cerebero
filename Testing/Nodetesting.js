var mocha = require('mocha');
var chai = require('chai');
var assert = require('chai').assert;
var AI = require('../routes/AI');
var apis = require('../routes/api');
var index = require('../routes/index');
var users = require('../routes/users');
var request = require('supertest');
var app = require('../app');


describe('AI', function() {
    it("Returns a string of test data run by the python script", function() {
        request(app)
        .get('/AI')
            .expect(200)
            .end(function(err, res) {
                res.body.should.contain("45");
                done();
            });
    });
});

describe('register', function() {
    it("Returns a string of test data run by register calls", function() {
        request(app)
            .post('/api/register')
            .send({
                "name": "John",
                "surname" : "Doe",
                "email":"John.Doe@gmail.com"
            })
            .expect(200)
            .expect('Content-Type', 'application/json')
            .end(function(err, res) {
                res.body.should.have.property("success","1");
                done();
            });
    });
});

describe('login', function() {
    it("Returns a string of test data run by login calls", function() {
        request(app)
            .post('/api/login')
            .send({
                "username": "Johndoe",
                "password" : "1234abcd"
            })
            .expect(200)
            .expect('Content-Type', 'application/json')
            .end(function(err, res) {
                res.body.should.have.property("access_token");
                done();
            });
    });
});

describe('collectFunds', function() {
    it("Returns a string of test data run by collectFunds calls", function() {
        request(app)
            .post('/api/collectFunds')
            .send({
                "access_token": "123abc",
                "province" : "Gauteng"
            })
            .expect(200)
            .expect('Content-Type', 'application/json')
            .end(function(err, res) {
                res.body.should.have.property("success", "1");
                res.body.should.have.property("funds");
                done();
            });
    });
});
describe('pollProvince', function() {
    it("Returns a string of test data run by pollProvince calls", function() {
        request(app)
            .post('/api/pollProvince')
            .send({
                "access_token": "123abc",
                "province" : "Gauteng"
            })
            .expect(200)
            .expect('Content-Type', 'application/json')
            .end(function(err, res) {
                res.body.should.have.property("AI1");
                res.body.should.have.property("AI2");
                done();
            });
    });
});

describe('getFunds', function() {
    it("Returns a string of test data run by getFunds calls", function() {
        request(app)
            .post('/api/getFunds')
            .send({
                "access_token": "123abc"
            })
            .expect(200)
            .expect('Content-Type', 'application/json')
            .end(function(err, res) {
                res.body.should.have.property("funds");
                done();
            });
    });
});

describe('getProfile', function() {
    it("Returns a string of test data run by getProfile calls", function() {
        request(app)
            .post('/api/getProfile')
            .send({
                "access_token": "123abc"
            })
            .expect(200)
            .expect('Content-Type', 'application/json')
            .end(function(err, res) {
                res.body.should.have.property("name");
                res.body.should.have.property("surname")
                done();
            });
    });
});