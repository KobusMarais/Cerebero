const express = require('express');
const router = express.Router();
const path = require('path');
const queries = require('./queries.js');

/* API Calls */
router.post('/register', function(req,res){
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if(!req.body.name || !req.body.email || !req.body.username || !req.body.password)
    {
        console.log("register API call name or email or username or password not set");
        const obj = new Object();
        obj.success = 0;
        const result = JSON.stringify(obj);
        const parsedObject = JSON.parse(result);
        res.send(parsedObject);
    }
    else {
        let i = req.body;
        //generate new token for each user and create entry in db for that user.
        queries.register(i.name, i.surname, i.email, i.username, i.password, function (err, result) {
        if (err) return console.log("error: ", err);
        const obj = JSON.parse(result);
            res.send(obj);
        });
    }
    //Insert code here to check if email or username has been used before

});

router.post('/login', function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //insert code here to check if email and password are correct and return access key.
    if(!req.body.username || !req.body.password)
    {
        console.log("login API call username or password not set");
        let obj = new Object();
        obj.success = 0;
        const result = JSON.stringify(obj);
        const parsedObject = JSON.parse(result);
        res.send(parsedObject);
    }
    else {
        let i = req.body;
        queries.login(i.username, i.password, function (err, result) {
            if (err) return console.log("error: ", err);
        const obj = JSON.parse(result);
            res.send(obj);
        });
    }
});

router.post('/collectFunds', function(req,res){

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    //console.log(req.body.access_token);
    //console.log(req.body.province);
    if(!req.body.province || !req.body.access_token)
    {
        console.log("collectFunds API call access_token or province not set");
        var obj = new Object();
        obj.success = 0;
        var result = JSON.stringify(obj);
        var obj = JSON.parse(result);
        res.send(obj);
    }
    else {
        /// /find access token in DB
        //calculate fund change according to dataset from db
        //save amount of funds user has to db.
        let i = req.body;
        queries.collectFunds(i.access_token, i.province, function (err, result) {
            if (err) return console.log("error: ", err);
            var obj = JSON.parse(result);
            res.send(obj);
        });
    }

    //return success and update funds
});
router.post('/getTopic', function(req,res) {

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    //console.log(req.body.access_token);
    if(!req.body.access_token)
    {
        console.log("getTopic API call access_token not set");
        var obj = new Object();
        obj.success = 0;
        var result = JSON.stringify(obj);
        var obj = JSON.parse(result);
        res.send(obj);
    }
    else {
        let i = req.body;
        queries.getTopic(i.access_token, function (err, result) {
            if (err) return console.log("error: ", err);
            var obj = JSON.parse(result);
            res.send(obj);
        });
    }
});

router.post('/campaignProvince', function(req,res){

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");


    if(!req.body.province || !req.body.access_token || !req.body.topic || !req.body.campaigntype)
    {
        console.log("campaignProvince API call access_token or province not set");
        var obj = new Object();
        obj.success = 0;
        var result = JSON.stringify(obj);
        var obj = JSON.parse(result);
        res.send(obj);
    }
    else {
        //find access token in DB
        //calculate support change according to dataset from db
        //save amount of funds user has to db.
        let i = req.body;
        queries.campaignProvince(i.access_token, i.province,i.campaigntype, i.topic, function(err, result) {
             if (err) return console.log("error: ", err);
             var obj = JSON.parse(result);
             res.send(obj);
         });
        //return success and update funds
    }
});

router.post('/pollProvince', function(req,res){
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    //console.log(req.body.access_token);
    //console.log(req.body.province);

    if(!req.body.province || !req.body.access_token)
    {
        console.log("PollProvince API call access_token or province not set");
        var obj = new Object();
        obj.success = 0;
        var result = JSON.stringify(obj);
        var obj = JSON.parse(result);
        res.send(obj);
    } else {
        //find access token in DB
        //retrieve opponent's in that province from db
        //return support to user
        let i = req.body;
        queries.pollProvince(i.access_token, i.province, function(err, result) {
            if (err) return console.log("error: ", err);
            var obj = JSON.parse(result);
            res.send(obj);
        });
/*
        var text = '{"User": "40", "AI1" : "10", "AI2" : "10", "AI3": "20", "AI4" : "20", "AI1Move" : "Poll Gauteng", "AI2Move" : "Poll Limpopo" , "AI3Move" : "Collect Funds Freestate", "AI4Move" : "Campaign Western Cape"}';
        var obj = JSON.parse(text);
        res.send(obj);*/
    }
});

router.post('/getFunds', function(req, res, next) { //this is a national overall value
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    console.log(req.body.access_token);
    //find access token in DB
    //retrieve user funds from db
    //return user funds

    if(!req.body.access_token)
    {
        console.log("getFunds API call access_token not set");
        var obj = new Object();
        obj.success = 0;
        var result = JSON.stringify(obj);
        var obj = JSON.parse(result);
        res.send(obj);
    } else {
        queries.getFunds(req.body.access_token, function (err, result) {
            if (err) return console.log("error: ", err)
            var obj = JSON.parse(result);
            res.send(obj);
        });
    }

});

router.post('/getFundsProvince', function(req, res, next) { //this is how many funds available per province
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    console.log(req.body.access_token);
    //find access token in DB
    //retrieve province available funds from db
    //return province funds funds

    if(!req.body.access_token)
    {
        console.log("getFundsProvince API call access_token not set");
        var obj = new Object();
        obj.success = 0;
        var result = JSON.stringify(obj);
        var obj = JSON.parse(result);
        res.send(obj);
    } else {

        queries.getFundsProvince(req.body.access_token, function (err, result) {
            if (err) return console.log("error: ", err)
            var obj = JSON.parse(result);
            res.send(obj);
        });
    }

});

router.post('/getProfile', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    console.log(req.body.access_token);
    //find access token in DB
    //retrieve user info from DB

    if(!req.body.access_token)
    {
        console.log("getProfile API call access_token not set");
        var obj = new Object();
        obj.success = 0;
        var result = JSON.stringify(obj);
        var obj = JSON.parse(result);
        res.send(obj);
    }
    else {
        //return user data
        queries.getProfile(req.body.access_token, function (err, result) {
            if (err) return console.log("error: ", err)
            var obj = JSON.parse(result);
            res.send(obj);
        });
    }
});

router.post('/getScore', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    //find access token in DB
    //retrieve user score from DB

    if(!req.body.access_token)
    {
        console.log("getScore API call access_token not set");
        var obj = new Object();
        obj.success = 0;
        var result = JSON.stringify(obj);
        var obj = JSON.parse(result);
        res.send(obj);
    } else {

    //return score
    queries.getScore(req.body.access_token, function(err, result) {
        if (err) return console.log("error: ", err)
        var obj = JSON.parse(result);
        res.send(obj);
    });
    }
});

router.post('/getManpower', function(req, res, next) { //this is an overall national total
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //find access token in DB
    //retrieve user score from DB
    //get current manpower support user has from db

    if(!req.body.access_token)
    {
        console.log("getManpower API call access_token or province not set");
        var obj = new Object();
        obj.success = 0;
        var result = JSON.stringify(obj);
        var obj = JSON.parse(result);
        res.send(obj);
    }  else {
        //return manpower user has currently
        queries.getManpower(req.body.access_token, function (err, result) {
            if (err) return console.log("error: ", err)
            var obj = JSON.parse(result);
            res.send(obj);
        });
    }

});

router.post('/getSupport', function(req, res, next) { // each province has its own support
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    //find access token in DB
    //retrieve user support for that province from DB
    //get current support user has in that province from db

    if(!req.body.access_token)
    {
        console.log("getSupport API call access_token or province not set");
        var obj = new Object();
        obj.success = 0;
        var result = JSON.stringify(obj);
        var obj = JSON.parse(result);
        res.send(obj);
    } else {

        queries.getSupport(req.body.access_token, function (err, result) {
            if (err) return console.log("error: ", err)
            var obj = JSON.parse(result);
            res.send(obj);
        });
    }
});

router.get('/getHighscoreBoard', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    queries.getHighscoreBoard(function(err, result) {
        if (err) return console.log("error: ", err);
        var obj = JSON.parse(result);
        res.send(obj);
    });
});

router.post('/startGame', function(req, res, next) { // initialises all values at the start of the game
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //console.log(req.body.access_token);
    //console.log(req.body.difficulty); //sets difficulty

    //find access token in DB
    //create and retrieve all starter info for user

    if(!req.body.difficulty || !req.body.access_token)
    {
        console.log("startGame API call access_token or difficulty not set");
        var obj = new Object();
        obj.success = 0;
        var result = JSON.stringify(obj);
        var obj = JSON.parse(result);
        res.send(obj);
    }  else {

        //return everything that needs to be displayed on client side
        queries.startGame(req.body.access_token, function (err, result) {
            if (err) return console.log("error: ", err);
            var obj = JSON.parse(result);
            res.send(obj);
        });
    }
});


//this function has been deprecated, no need to use it anymore, will be removed soon...
router.post('/setAI', function(req, res, next) { // initialises all values at the start of the game
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    if(!req.body.difficulty || !req.body.access_token)
    {
        console.log("setAI API call access_token or issues not set");
        var obj = new Object();
        obj.success = 0;
        var result = JSON.stringify(obj);
        var obj = JSON.parse(result);
        res.send(obj);
    }
    else {
        //find access token in DB
        //create and retrieve all starter info for user

        //return everything that needs to be displayed on client side
        var text = '{"Username" : "Jack", "Funds" : "0", "TotalSupport" : "0", "Manpower": "0", "Weeks" : "3"}';
        var obj = JSON.parse(text);
        res.send(obj);


    }
});

router.post('/endTurn', function(req, res, next) { // AIs make their final move and date increased.
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

//    console.log(req.body.access_token);
    if(!req.body.access_token)
    {
        console.log("endTurn API call access_token not set");
        var obj = new Object();
        obj.success = 0;
        var result = JSON.stringify(obj);
        var obj = JSON.parse(result);
        res.send(obj);
    } else {
        //find access token in DB
        //run AI
        //Decrease time before election and returns it


        queries.endTurn(req.body.access_token, function (err, result) {
            if (err) return console.log("error: ", err);
            var obj = JSON.parse(result);
            res.send(obj);
        });
    }
});

router.post('/endHighScore', function(req, res, next) { // receives user score and inserts into leaderboard
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    if(!req.body.access_token || !req.body.userScore)
    {
        console.log("endHighScore API call access_token or userScore not set");
        var obj = new Object();
        obj.success = 0;
        var result = JSON.stringify(obj);
        var obj = JSON.parse(result);
        res.send(obj);
    }
    else {
        queries.endHighScore(req.body.access_token, req.body.userScore, function (err, result) {
            if (err) return console.log("error: ", err);
            var obj = JSON.parse(result);
            res.send(obj);
        });
    }
});

router.get('/getIssues', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    queries.getIssues(function(err, result) {
        if (err) return console.log("error: ", err);
        var obj = JSON.parse(result);
        res.send(obj);
    });
});

router.post('/getStances', function(req, res, next) { // receives user score and inserts into leaderboard
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    console.log("THIS IS THE LENGTH:");
    if(!req.body.issues || !req.body.access_token)
    {
        console.log("getStances API call access_token or issues not set");
        var obj = new Object();
        obj.success = 0;
        var result = JSON.stringify(obj);
        var obj = JSON.parse(result);
        res.send(obj);
    }  else {
        console.log(req.body.issues.length);
        let i = req.body.issues; // for brevity
        queries.getStances(i, function (err, result) {
            if (err) return console.log("error: ", err)
            var obj = JSON.parse(result);
            res.send(obj);
        });
    }
});
router.post('/endResult', function(req, res, next) { // receives user score and inserts into leaderboard

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    //console.log(req.body.access_token);

    if(!req.body.access_token)
    {
        console.log("endResult API call access_token or issues not set");
        var obj = new Object();
        obj.success = 0;
        var result = JSON.stringify(obj);
        var obj = JSON.parse(result);
        res.send(obj);
    }  else {
        let i = req.body; // for brevity
        queries.endResult(i.access_token,function (err, result) {
            if (err) return console.log("error: ", err)
            var obj = JSON.parse(result);
            res.send(obj);
        });
    }
});

router.post('/setIssues', function(req, res, next) { // receives user score and inserts into leaderboard
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //console.log(req.body.access_token);

    if(!req.body.issues || !req.body.access_token)
    {
        console.log("setIssues API call access_token or issues not set");
        var obj = new Object();
        obj.success = 0;
        var result = JSON.stringify(obj);
        var obj = JSON.parse(result);
        res.send(obj);
    }  else {
        let i = req.body; // for brevity
        queries.setIssues(i.access_token, i.issues, function (err, result) {
            if (err) return console.log("error: ", err)
            var obj = JSON.parse(result);
            res.send(obj);
        });
    }
});
//query.on('end', () => { client.end(); });
module.exports = router;
