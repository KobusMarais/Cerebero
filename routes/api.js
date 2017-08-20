var express = require('express');
var router = express.Router();

router.post('/register', function(req,res){
    res.setHeader('Content-Type', 'application/json');
    console.log(req.body.name);
    console.log(req.body.surname);
    console.log(req.body.email);
    //Insert code here to check if email or username has been used before

    //generate new token for each user and create entry in db for that user.
    var text = '{"access_token" : "123abc"}';
    var obj = JSON.parse(text);
    res.send(obj);
});

router.post('/login', function(req,res){
    res.setHeader('Content-Type', 'application/json');
    console.log(req.body.username);
    console.log(req.body.password);

    //insert code here to check if email and password are correct.

    //generate new token for each user and create entry in db for that user.
    var text = '{"access_token" : "123abc"}';
    var obj = JSON.parse(text);
    res.send(obj);
});

router.post('/collectFunds', function(req,res){

    res.setHeader('Content-Type', 'application/json');
    console.log(req.body.access_token);
    console.log(req.body.province);
    //find access token in DB
    //calculate fund change according to dataset from db
    //save amount of funds user has to db.

    //return success and update funds
    var text = '{"success" : "1", "funds" : "3000"}';
    var obj = JSON.parse(text);
    res.send(obj);
});

router.post('/campaignProvince', function(req,res){

    res.setHeader('Content-Type', 'application/json');
    console.log(req.body.access_token);
    console.log(req.body.province);
    //find access token in DB
    //calculate support change according to dataset from db
    //save amount of funds user has to db.

    //return success and update funds
    var text = '{"success" : "1", "support" : "3000"}';
    var obj = JSON.parse(text);
    res.send(obj);
});

router.post('/pollProvince', function(req,res){
    res.setHeader('Content-Type', 'application/json');
    console.log(req.body.access_token);
    console.log(req.body.province);
    //find access token in DB
    //retrieve opponent's in that province from db
    //return support to user

    var text = '{"AI1" : "50", "AI2" : "30"}';
    var obj = JSON.parse(text);
    res.send(obj);
});

router.post('/getFunds', function(req, res, next) { //this is a national overall value
    res.setHeader('Content-Type', 'application/json');
    console.log(req.body.access_token);
    //find access token in DB
    //retrieve user funds from db
    //return user funds

    var text = '{"funds" : "10000"}';
    var obj = JSON.parse(text);
    res.send(obj);
});

router.post('/getProfile', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    console.log(req.body.access_token);
    //find access token in DB
    //retrieve user info from DB

    //return user data
    var text = '{"name" : "John", "surname" : "Doe"}';
    var obj = JSON.parse(text);
    res.send(obj);
});

router.post('/getScore', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    console.log(req.body.access_token);
    //find access token in DB
    //retrieve user score from DB

    //return score
    var text = '{"score" : "10000"}';
    var obj = JSON.parse(text);
    res.send(obj);
});

router.post('/getManpower', function(req, res, next) { //this is an overall national total
    res.setHeader('Content-Type', 'application/json');
    console.log(req.body.access_token);
    //find access token in DB
    //retrieve user score from DB
    //get current manpower support user has from db

    //return manpower user has currently
    var text = '{"manpower" : "10000"}';
    var obj = JSON.parse(text);
    res.send(obj);
});

router.post('/getSupport', function(req, res, next) { // each province has its own support
    res.setHeader('Content-Type', 'application/json');
    console.log(req.body.access_token);
    console.log(req.body.province);
    //find access token in DB
    //retrieve user support for that province from DB
    //get current support user has in that province from db

    var text = '{"support" : "10"}';
    var obj = JSON.parse(text);
    res.send(obj);
});

router.get('/getHighscoreBoard', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    var text = '{"Jack" : "10000", "John" : "80", "Jacky" : "70"}';
    var obj = JSON.parse(text);
    res.send(obj);
});

router.post('/startGame', function(req, res, next) { // initialises all values at the start of the game
    res.setHeader('Content-Type', 'application/json');
    console.log(req.body.access_token);
    //find access token in DB
    //create and retrieve all starter info for user


    //return everything that needs to be displayed on client side
    var text = '{"Username" : "Jack", "PartyName" : "Winners", "Funds" : "0", "TotalSupport" : "0", "Manpower": "0"}';
    var obj = JSON.parse(text);
    res.send(obj);
});

router.post('/setAI', function(req, res, next) { // each province has its own support
    res.setHeader('Content-Type', 'application/json');
    console.log(req.body.access_token);
    console.log(req.body.difficulty)
    //find access token in DB
    //create and retrieve all starter info for user


    //return everything that needs to be displayed on client side
    var text = '{"Success" : "1"}';
    var obj = JSON.parse(text);
    res.send(obj);
});

router.post('/endTurn', function(req, res, next) { // AIs make their final move and date increased.
    res.setHeader('Content-Type', 'application/json');
    console.log(req.body.access_token);
    //find access token in DB
    //run AI
    //Decrease time before election

    var text = '{"Success" : "1"}';
    var obj = JSON.parse(text);
    res.send(obj);
});



module.exports = router;
