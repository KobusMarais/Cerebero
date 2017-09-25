var express = require('express');
var router = express.Router();
var queries = require('./queries.js');


router.post('/register', function(req,res){
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    let i = req.body;
    //generate new token for each user and create entry in db for that user.
    queries.register(i.name, i.surname, i.email, i.username, i.password, function(err, result) {
        if (err) return console.log("error: ", err)
        var obj = JSON.parse(result);
        res.send(obj);
    });
    //Insert code here to check if email or username has been used before

});

router.post('/login', function(req,res){
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    //insert code here to check if email and password are correct and return accesskey.
    let i = req.body;
    queries.login(i.username, i.password, function(err, result) {
        if (err) return console.log("error: ", err);
        var obj = JSON.parse(result);
        res.send(obj);
    });
});

router.post('/collectFunds', function(req,res){

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    console.log(req.body.access_token);
    console.log(req.body.province);
    //find access token in DB
    //calculate fund change according to dataset from db
    //save amount of funds user has to db.

    //return success and update funds
    var text = '{"success" : "1", "funds" : "3000", "AI1Move" : "Collect Funds Gauteng", "AI2Move" : "Campaign Limpopo" , "AI3Move" : "Campaign Western Cape", "AI4Move" : "Collect Funds Freestate"}';
    var obj = JSON.parse(text);
    res.send(obj);
});

router.post('/campaignProvince', function(req,res){

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    console.log(req.body.access_token);
    console.log(req.body.province);
    //find access token in DB
    //calculate support change according to dataset from db
    //save amount of funds user has to db.

    //return success and update funds
    var text = '{"success" : "1", "support" : "3000", "AI1Move" : "Campaign Western Cape", "AI2Move" : "Collect Funds Freestate" , "AI3Move" : "Poll Limpopo", "AI4Move" : "Poll Gauteng"}';
    var obj = JSON.parse(text);
    res.send(obj);
});

router.post('/pollProvince', function(req,res){
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    console.log(req.body.access_token);
    console.log(req.body.province);
    //find access token in DB
    //retrieve opponent's in that province from db
    //return support to user

    var text = '{"User": "40", "AI1" : "10", "AI2" : "10", "AI3": "20", "AI4" : "20", "AI1Move" : "Poll Gauteng", "AI2Move" : "Poll Limpopo" , "AI3Move" : "Collect Funds Freestate", "AI4Move" : "Campaign Western Cape"}';
    var obj = JSON.parse(text);
    res.send(obj);
});

router.post('/getFunds', function(req, res, next) { //this is a national overall value
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    console.log(req.body.access_token);
    //find access token in DB
    //retrieve user funds from db
    //return user funds
    queries.getFunds(req.body.access_token, function(err, result) {
        if (err) return console.log("error: ", err)
        var obj = JSON.parse(result);
        res.send(obj);
    });
});

router.post('/getFundsProvince', function(req, res, next) { //this is how many funds available per province
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    console.log(req.body.access_token);
    //find access token in DB
    //retrieve province available funds from db
    //return province funds funds
    queries.getFundsProvince(req.body.access_token, function(err, result) {
        if (err) return console.log("error: ", err)
        var obj = JSON.parse(result);
        res.send(obj);
    });

});

router.post('/getProfile', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    console.log(req.body.access_token);
    //find access token in DB
    //retrieve user info from DB

    //return user data
    queries.getProfile(req.body.access_token, function(err, result) {
        if (err) return console.log("error: ", err)
        var obj = JSON.parse(result);
        res.send(obj);
    });
});

router.post('/getScore', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    //find access token in DB
    //retrieve user score from DB

    //return score
    queries.getScore(req.body.access_token, function(err, result) {
        if (err) return console.log("error: ", err)
        var obj = JSON.parse(result);
        res.send(obj);
    });
});

router.post('/getManpower', function(req, res, next) { //this is an overall national total
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    console.log(req.body.access_token);
    //find access token in DB
    //retrieve user score from DB
    //get current manpower support user has from db

    //return manpower user has currently
    queries.getManpower(req.body.access_token, function(err, result) {
        if (err) return console.log("error: ", err)
        var obj = JSON.parse(result);
        res.send(obj);
    });
});

router.post('/getSupport', function(req, res, next) { // each province has its own support
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    //find access token in DB
    //retrieve user support for that province from DB
    //get current support user has in that province from db

    queries.getSupport(req.body.access_token, req.body.province, function(err, result) {
        if (err) return console.log("error: ", err)
        var obj = JSON.parse(result);
        res.send(obj);
    });
});

router.get('/getHighscoreBoard', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    queries.getHighscoreBoard(function(err, result) {
        if (err) return console.log("error: ", err);
        var obj = JSON.parse(result);
        res.send(obj);
    });
});

router.post('/startGame', function(req, res, next) { // initialises all values at the start of the game
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    //console.log(req.body.access_token);
    //console.log(req.body.difficulty); //sets difficulty

    //find access token in DB
    //create and retrieve all starter info for user


    //return everything that needs to be displayed on client side
    queries.startGame(req.body.access_token, function(err, result) {
        if (err) return console.log("error: ", err);
        var obj = JSON.parse(result);
        res.send(obj);
    });
});


//this function has been deprecated, no need to use it anymore, will be removed soon...
router.post('/setAI', function(req, res, next) { // initialises all values at the start of the game
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    console.log(req.body.access_token);
    console.log(req.body.difficulty); //sets difficulty

    //find access token in DB
    //create and retrieve all starter info for user

    //return everything that needs to be displayed on client side
    var text = '{"Username" : "Jack", "Funds" : "0", "TotalSupport" : "0", "Manpower": "0", "Weeks" : "3"}';
    var obj = JSON.parse(text);
    res.send(obj);
});

router.post('/endTurn', function(req, res, next) { // AIs make their final move and date increased.
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    console.log(req.body.access_token);
    //find access token in DB
    //run AI
    //Decrease time before election and returns it

    queries.endTurn(req.body.access_token, function(err, result) {
        if (err) return console.log("error: ", err);
        var obj = JSON.parse(result);
        res.send(obj);
    });
});

router.post('/endHighScore', function(req, res, next) { // receives user score and inserts into leaderboard
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    queries.endHighScore(req.body.access_token, req.body.userScore, function(err, result) {
        if (err) return console.log("error: ", err);
        var obj = JSON.parse(result);
        res.send(obj);
    });
});

router.get('/getIssues', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    queries.getIssues(function(err, result) {
        if (err) return console.log("error: ", err);
        var obj = JSON.parse(result);
        res.send(obj);
    });
});

router.post('/getStances', function(req, res, next) { // receives user score and inserts into leaderboard
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    let i = req.body.issues; // for brevity
    queries.getStances(i[0], i[1], i[2], i[3], function(err, result) {
        if (err) return console.log("error: ", err)
        var obj = JSON.parse(result);
        res.send(obj);
    });
});

router.post('/setIssues', function(req, res, next) { // receives user score and inserts into leaderboard
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    //console.log(req.body.access_token);
    console.log(req.body.issues[0].issue);
    console.log(req.body.issues[0].stance);

    let i = req.body; // for brevity
    queries.setIssues(i.access_token, i.issues, function(err, result) {
        if (err) return console.log("error: ", err)
        var obj = JSON.parse(result);
        res.send(obj);
    });
});
//query.on('end', () => { client.end(); });
module.exports = router;
