var express = require('express');
var router = express.Router();
const {Pool, Client, pg} = require('pg');
const path = require('path');
const connectionString = 'postgres://qteorhenhhafxk:6ce54e222dd9d48768d1450b96fa91b0966239026292309303229619afc37969@ec2-54-247-177-33.eu-west-1.compute.amazonaws.com:5432/d81ndajjs435dl';

// const pool = new Pool({
//   user: 'qteorhenhhafxk',
//   host: 'ec2-54-247-177-33.eu-west-1.compute.amazonaws.com',
//   database: '/d81ndajjs435dl',
//   password: '6ce54e222dd9d48768d1450b96fa91b0966239026292309303229619afc37969',
//   port: '5432',
//   connectionString: connectionString,
// })

const client = new Client({
  /*user: 'qteorhenhhafxk',
     host: 'ec2-54-247-177-33.eu-west-1.compute.amazonaws.com',
     database: '/d81ndajjs435dl',
     password: '6ce54e222dd9d48768d1450b96fa91b0966239026292309303229619afc37969',
     port: '5432',*/
  connectionString: connectionString,
})

router.post('/register', function(req,res){
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    console.log(req.body.name);
    console.log(req.body.surname);
    console.log(req.body.email);
    // Grab data from http request
    const data = {username: req.body.reg_username, password: req.body.reg_user_password, isadmin: false, firstName: req.body.firstName, lastName: req.body.lastName, highestScore: 0};
    const queryString = 'INSERT INTO userAccounts(username, user_password, isadmin, firstName, lastName, highestScore) values($1, $2, $3, $4, $5, $6)';
    const queryValues = [data.username, data.password, data.isadmin, data.firstName, data.lastName, data.highestScore];
    client.connect();

    // SQL Query > Insert Data
    client.query(queryString, queryValues, (err, res) => {
        if (err) {
            console.log(err.stack)
        }
        else {
            console.log(res.rows[0])
        }
    });

    // promise
    client.query(queryString, queryValues)
        .then(res => {
            console.log(res.rows[0])

            })
        .catch(e => {
            console.error(e.stack)
        });

    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json();
    });
    //Insert code here to check if email or username has been used before

    //generate new token for each user and create entry in db for that user.
    var text = '{"access_token" : "123abc"}';
    var obj = JSON.parse(text);
    res.send(obj);
});

router.post('/login', function(req,res){
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true); 
    console.log(req.body.username);
    console.log(req.body.password);
    const data = {username: req.body.log_username, password: req.body.log_user_password};
    const queryString = 'SELECT username, user_password FROM userAccounts WHERE username = $1';
    const queryValues = [data.username];

    const results = [];
    //insert code here to check if email and password are correct.
    client.connect();

    // SQL Query > Insert Data
    client.query(queryString, queryValues, (err, res) => {
        if (err) {
            console.log(err.stack)
        }
        else {
            console.log(res.rows[0])
        }
    });

    // promise
    client.query(queryString, queryValues)
        .then(res => {
            console.log(res.rows[0])

        })
        .catch(e => {
            console.error(e.stack)
        });

    // After all data is returned, close connection and return results
    query.on('end', () => {
        done();
        return res.json();
    });

        /*if (!results.isEmpty()){
            let user = results.pop();
            let password = results.pop();
            if ((user.compare(data.username)) && (password.compare(data.password)){
                return res.status(200).json({success: true});
            }
            else {
                return res.status(403).json({success: false});
            }
        }
        // After all data is returned, close connection and return results
        query.on('end', () => {
          done();
          return res.json(results);
        });*/
    //generate new token for each user and create entry in db for that user.
    var text = '{"access_token" : "123abc"}';
    var obj = JSON.parse(text);
    res.send(obj);
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

    const data = {username: req.body.username};
    const queryString = 'SELECT * FROM tblFunds WHERE userId = $1';
    const queryValues = [data.username];

    const results = [];
    //insert code here to check if email and password are correct.
    client.connect();

    // SQL Query > Insert Data
    client.query(queryString, queryValues, (err, res) => {
        if (err) {
            console.log(err.stack)
        }
        else {
            console.log(res.rows[0])
        }
    });

    // promise
    client.query(queryString, queryValues)
        .then(res => {
            console.log(res.rows[0])

        })
        .catch(e => {
            console.error(e.stack)
        });

    let userId = getUserId(reg.body.username);
    let extraFunds = req.body.funds;

    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });

    const currentFunds = 200;
    newFundsTotal = currentFunds + extraFunds;
    const updateQuery = client.query('Update user_funds SET user_funds = $1');
    const updateValues = [newFundsTotal];
    // SQL Query > Insert Data
    client.query(updateQuery, updateValues, (err, res) => {
        if (err) {
            console.log(err.stack)
        }
        else {
            console.log(res.rows[0])
        }
    });

    // promise
    client.query(updateQuery, updateValues)
        .then(res => {
            console.log(res.rows[0])

        })
        .catch(e => {
            console.error(e.stack)
        });

    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });

    //return success and update funds
    var text = '{"success" : "1", "funds" : $1, "AI1Move" : "Collect Funds Gauteng", "AI2Move" : "Campaign Limpopo" , "AI3Move" : "Campaign Western Cape", "AI4Move" : "Collect Funds Freestate"}',[newFundsTotal];
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

    const userId = getUserId(reg.body.username);
    const newSupport = 20;
    finalNewSupport = newSupport + 'Queried support';
    const queryString = 'SELECT support FROM tblUserSupportGained WHERE userId = $1 AND provinceId = $2';
    const queryValues = [userId, reg.body.provinceId];

    const results = [];
    //insert code here to check if email and password are correct.
    client.connect();

    // SQL Query > Insert Data
    client.query(queryString, queryValues, (err, res) => {
        if (err) {
            console.log(err.stack)
        }
        else {
            console.log(res.rows[0])
        }
    });

    // promise
    client.query(queryString, queryValues)
        .then(res => {
            console.log(res.rows[0])

        })
        .catch(e => {
            console.error(e.stack)
        });


    // Stream results back one row at a time
    query.on('row', (row) => {
        results.push(row);
    });

    const updateQuery = client.query('Update tblUserSupportGained SET support = $1');
    const updateValues = [finalNewSupport];
      // After all data is returned, close connection and return results
    client.query(updateQuery, updateValues, (err, res) => {
        if (err) {
            console.log(err.stack)
        }
        else {
            console.log(res.rows[0])
        }
    });

    // promise
    client.query(updateQuery, updateValues)
        .then(res => {
            console.log(res.rows[0])

        })
        .catch(e => {
            console.error(e.stack)
        });
      query.on('end', () => {
        done();
        return res.json(results);
      });

    //return success and update funds
    var text = '{"success" : "1", "support" : $1, "AI1Move" : "Campaign Western Cape", "AI2Move" : "Collect Funds Freestate" , "AI3Move" : "Poll Limpopo", "AI4Move" : "Poll Gauteng"}',[finalNewSupport];
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
    const userId = getUserId(reg.body.username);
    const queryString = 'SELECT support FROM tblUserSupportGained WHERE userId = $1 AND provinceId = $2';
    const queryValues = [userId, reg.body.provinceId];

    const results = [];
    //insert code here to check if email and password are correct.
    client.connect();

    // SQL Query > Insert Data
    client.query(queryString, queryValues, (err, res) => {
        if (err) {
            console.log(err.stack)
        }
        else {
            console.log(res.rows[0])
        }
    });

    // promise
    client.query(queryString, queryValues)
        .then(res => {
            console.log(res.rows[0])

        })
        .catch(e => {
            console.error(e.stack)
        });

    // After all data is returned, close connection and return results
    query.on('end', () => {
        done();
        return res.json(results);
    });
    
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

    const userId = getUserId(reg.body.username);
    const queryString = 'SELECT * FROM tblFunds WHERE userId = $1';
    const queryValues = [userId];

    const results = [];
    //insert code here to check if email and password are correct.
    client.connect();

    // SQL Query > Insert Data
    client.query(queryString, queryValues, (err, res) => {
        if (err) {
            console.log(err.stack)
        }
        else {
            console.log(res.rows[0])
        }
    });

    // promise
    client.query(queryString, queryValues)
        .then(res => {
            console.log(res.rows[0])

        })
        .catch(e => {
            console.error(e.stack)
        });

    // After all data is returned, close connection and return results
    query.on('end', () => {
        done();
        return res.json(results);
    });

    var text = '{"funds" : "10000"}';
    var obj = JSON.parse(text);
    res.send(obj);
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
    const queryGP = client.query('SELECT totalfundsAvailable FROM tblProvince WHERE provinceName = "Gauteng"');
    const queryMP = client.query('SELECT totalfundsAvailable FROM tblProvince WHERE provinceName = "Mpumanlanga"');
    const queryL = client.query('SELECT totalfundsAvailable FROM tblProvince WHERE provinceName = "Limpopo"');
    const queryKZN = client.query('SELECT totalfundsAvailable FROM tblProvince WHERE provinceName = "Kwazulu-Natal"');
    const queryEC = client.query('SELECT totalfundsAvailable FROM tblProvince WHERE provinceName = "Eastern Cape"');
    const queryWC = client.query('SELECT totalfundsAvailable FROM tblProvince WHERE provinceName = "Western Cape"');
    const queryNC = client.query('SELECT totalfundsAvailable FROM tblProvince WHERE provinceName = "Northern Cape"');
    const queryFS = client.query('SELECT totalfundsAvailable FROM tblProvince WHERE provinceName = "Free State"');
    const queryNW = client.query('SELECT totalfundsAvailable FROM tblProvince WHERE provinceName = "North West"');

    const results = [];
    //insert code here to check if email and password are correct.
    client.connect();

    // SQL Queries
    client.query(queryGP, (err, res) => {
        if (err) {
            console.log(err.stack)
        }
        else {
            console.log(res.rows[0])
        }
    });

    client.query(queryMP, (err, res) => {
        if (err) {
            console.log(err.stack)
        }
        else {
            console.log(res.rows[0])
        }
    });

    client.query(queryL, (err, res) => {
        if (err) {
            console.log(err.stack)
        }
        else {
            console.log(res.rows[0])
        }
    });

    client.query(queryKZN, (err, res) => {
        if (err) {
            console.log(err.stack)
        }
        else {
            console.log(res.rows[0])
        }
    });

    client.query(queryEC, (err, res) => {
        if (err) {
            console.log(err.stack)
        }
        else {
            console.log(res.rows[0])
        }
    });

    client.query(queryWC, (err, res) => {
        if (err) {
            console.log(err.stack)
        }
        else {
            console.log(res.rows[0])
        }
    });

    client.query(queryNC, (err, res) => {
        if (err) {
            console.log(err.stack)
        }
        else {
            console.log(res.rows[0])
        }
    });

    client.query(queryFS, (err, res) => {
        if (err) {
            console.log(err.stack)
        }
        else {
            console.log(res.rows[0])
        }
    });

    client.query(queryNC, (err, res) => {
        if (err) {
            console.log(err.stack)
        }
        else {
            console.log(res.rows[0])
        }
    });

    client.query(queryNW, (err, res) => {
        if (err) {
            console.log(err.stack)
        }
        else {
            console.log(res.rows[0])
        }
    });

    // promise

    client.query(queryGP)
        .then(res => {
            console.log(res.rows[0])

        })
        .catch(e => {
            console.error(e.stack)
        });

    client.query(queryMP)
        .then(res => {
            console.log(res.rows[0])

        })
        .catch(e => {
            console.error(e.stack)
        });

    client.query(queryL)
        .then(res => {
            console.log(res.rows[0])

        })
        .catch(e => {
            console.error(e.stack)
        });

    client.query(queryKZN)
        .then(res => {
            console.log(res.rows[0])

        })
        .catch(e => {
            console.error(e.stack)
        });

    client.query(queryEC)
        .then(res => {
            console.log(res.rows[0])

        })
        .catch(e => {
            console.error(e.stack)
        });

    client.query(queryWC)
        .then(res => {
            console.log(res.rows[0])

        })
        .catch(e => {
            console.error(e.stack)
        });

    client.query(queryNC)
        .then(res => {
            console.log(res.rows[0])

        })
        .catch(e => {
            console.error(e.stack)
        });

    client.query(queryFS)
        .then(res => {
            console.log(res.rows[0])

        })
        .catch(e => {
            console.error(e.stack)
        });

    client.query(queryNW)
        .then(res => {
            console.log(res.rows[0])

        })
        .catch(e => {
            console.error(e.stack)
        });

    // After all data is returned, close connection and return results
    query.on('end', () => {
        done();
        return res.json(results);
    });
    
    const text = '{"Gauteng" : "10000", "Limpopo" : "5000", "West Cape" : "1000", "North Cape" : "2300", "East Cape" : "200", "Kwazulu natal" : "900", "Mpumalanga": "1300", "North West" : "4200", "Freestate" : "3300"}';
    const obj = JSON.parse(text);
    res.send(obj);
});

router.post('/getProfile', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    console.log(req.body.access_token);
    const userId = getUserId(reg.body.username);
    const queryString = 'SELECT * FROM userAccounts WHERE userId = $1';
    const queryValues = [userId];
    //find access token in DB
    //retrieve user info from DB

    client.query(queryString, queryValues, (err, res) => {
        if (err) {
            console.log(err.stack)
        }
        else {
            console.log(res.rows[0])
        }
    });

    // promise
    client.query(queryString, queryValues)
        .then(res => {
            console.log(res.rows[0])

        })
        .catch(e => {
            console.error(e.stack)
        });

    query.on('end', () => {
        done();
        return res.json(results);
    });

    //return user data
    var text = '{"name" : "John", "surname" : "Doe", "Email" : "John@doe.com"}';
    var obj = JSON.parse(text);
    res.send(obj);
});

router.post('/getScore', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    console.log(req.body.access_token);
    //find access token in DB
    //retrieve user score from DB

    const userId = getUserId(reg.body.username);
    const queryString = 'SELECT currentScore FROM userAccounts WHERE userId = $1';
    const queryValues = [userId];
    //find access token in DB
    //retrieve user info from DB

    client.query(queryString, queryValues, (err, res) => {
        if (err) {
            console.log(err.stack)
        }
        else {
            console.log(res.rows[0])
        }
    });

    // promise
    client.query(queryString, queryValues)
        .then(res => {
            console.log(res.rows[0])

        })
        .catch(e => {
            console.error(e.stack)
        });

    query.on('end', () => {
        done();
        return res.json(results);
    });

    //return score
    var text = '{"score" : "10000"}';
    var obj = JSON.parse(text);
    res.send(obj);
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
    const userId = getUserId(reg.body.username);
    const queryString = 'SELECT manPower FROM tblUserManPowerGained WHERE userId = $1';
    const queryValues = [userId];
    //find access token in DB
    //retrieve user info from DB

    client.query(queryString, queryValues, (err, res) => {
        if (err) {
            console.log(err.stack)
        }
        else {
            console.log(res.rows[0])
        }
    });

    // promise
    client.query(queryString, queryValues)
        .then(res => {
            console.log(res.rows[0])

        })
        .catch(e => {
            console.error(e.stack)
        });

    query.on('end', () => {
        done();
        return res.json(results);
    });

    //return manpower user has currently
    var text = '{"manpower" : "10000"}';
    var obj = JSON.parse(text);
    res.send(obj);
});

router.post('/getSupport', function(req, res, next) { // each province has its own support
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    console.log(req.body.access_token);
    console.log(req.body.province);
    //find access token in DB
    //retrieve user support for that province from DB
    //get current support user has in that province from db

    const userId = getUserId(reg.body.username);
    const queryString = 'SELECT manPower FROM tblUserManPowerGained WHERE userId = $1';
    const queryValues = [userId];
    //find access token in DB
    //retrieve user info from DB

    client.query(queryString, queryValues, (err, res) => {
        if (err) {
            console.log(err.stack)
        }
        else {
            console.log(res.rows[0])
        }
    });

    // promise
    client.query(queryString, queryValues)
        .then(res => {
            console.log(res.rows[0])

        })
        .catch(e => {
            console.error(e.stack)
        });

    query.on('end', () => {
        done();
        return res.json(results);
    });

    var text = '{"support" : "10"}';
    var obj = JSON.parse(text);
    res.send(obj);
});

router.get('/getHighscoreBoard', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    const queryString = 'SELECT * FROM Leaderboard ORDER BY score DESC';
    //find access token in DB
    //retrieve user info from DB

    client.query(queryString, (err, res) => {
        if (err) {
            console.log(err.stack)
        }
        else {
            console.log(res.rows[0])
        }
    });

    // promise
    client.query(queryString)
        .then(res => {
            console.log(res.rows[0])

        })
        .catch(e => {
            console.error(e.stack)
        });

    query.on('end', () => {
        done();
        return res.json(results);
    });

    var text = '{"Jack" : "10000", "John" : "80", "Jacky" : "70"}';
    var obj = JSON.parse(text);
    res.send(obj);
});

router.post('/startGame', function(req, res, next) { // initialises all values at the start of the game
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    console.log(req.body.access_token);
    console.log(req.body.difficulty); //sets difficulty

    //find access token in DB
    //create and retrieve all starter info for user
    pg.connect(connectionString, (err, client, done) => {
      // Handle connection errors
      if(err) {
        done();
        console.log(err);
        return res.status(500).json({success: false, data: err});
      }
      var userId = getUserId(reg.body.username);
      const query = client.query('SELECT * FROM Leaderboard ORDER BY score DESC');
      
      // Stream results back one row at a time
      query.on('row', (row) => {
        results.push(row);
      });

      // After all data is returned, close connection and return results
      query.on('end', () => {
        done();
        return res.json(results);
      });
    });

    //return everything that needs to be displayed on client side
    var text = '{"Username" : "Jack", "Funds" : "0", "TotalSupport" : "0", "Manpower": "0", "Weeks" : "3"}';
    var obj = JSON.parse(text);
    res.send(obj);
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
    console.log(req.body.weeks);
    //find access token in DB
    //run AI
    //Decrease time before election and returns it

    var text = '{"Weeks" : "' + req.body.weeks +'"}';
    var obj = JSON.parse(text);
    res.send(obj);
});

function getUserId(username){
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    console.log(username);

    const userId = getUserId(reg.body.username);
    const queryString = 'SELECT pkid FROM userAccounts WHERE username = $1';
    const queryValues = [username];
    //find access token in DB
    //retrieve user info from DB

    client.query(queryString, queryValues, (err, res) => {
        if (err) {
            console.log(err.stack)
        }
        else {
            console.log(res.rows[0])
        }
    });

    // promise
    client.query(queryString)
        .then(res => {
            console.log(res.rows[0])

        })
        .catch(e => {
            console.error(e.stack)
        });

    query.on('end', () => {
        done();
        return res.json(results);
    });

    return res.json(results);
}

module.exports = router;