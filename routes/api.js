var express = require('express');
var router = express.Router();

router.post('/register', function(req,res){
    res.setHeader('Content-Type', 'application/json');
    console.log(req.body.name);
    console.log(req.body.surname);
    console.log(req.body.email);
    var text = '{"success" : "1"}';
    var obj = JSON.parse(text);
    res.send(obj);
});

router.post('/login', function(req,res){
    res.setHeader('Content-Type', 'application/json');
    var text = '{"success" : "1"}';
    var obj = JSON.parse(text);
    res.send(obj);
});

router.post('/collectFunds', function(req,res){
    res.setHeader('Content-Type', 'application/json');
    var text = '{"success" : "1"}';
    var obj = JSON.parse(text);
    res.send(obj);
});

router.post('/pollProvince', function(req,res){
    res.setHeader('Content-Type', 'application/json');
    var text = '{"success" : "1"}';
    var obj = JSON.parse(text);
    res.send(obj);
});

router.get('/getFunds', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    var text = '{"funds" : "10000"}';
    var obj = JSON.parse(text);
    res.send(obj);
});

router.get('/getProfile', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    var text = '{"name" : "John", "surname" : "Doe"}';
    var obj = JSON.parse(text);
    res.send(obj);
});

router.get('/getScore', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    var text = '{"score" : "10000"}';
    var obj = JSON.parse(text);
    res.send(obj);
});

router.get('/getManpower', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    var text = '{"manpower" : "10000"}';
    var obj = JSON.parse(text);
    res.send(obj);
});

router.get('/getSupport', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    var text = '{"support" : "10000"}';
    var obj = JSON.parse(text);
    res.send(obj);
});

router.get('/getHighscoreBoard', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    var text = '{"Jack" : "10000", "John" : "80", "Jacky" : "70"}';
    var obj = JSON.parse(text);
    res.send(obj);
});


module.exports = router;
