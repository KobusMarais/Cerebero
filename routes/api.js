var express = require('express');
var router = express.Router();
const {Pool, Client, pg} = require('pg');
const path = require('path');
const connectionString = 'postgres://qteorhenhhafxk:6ce54e222dd9d48768d1450b96fa91b0966239026292309303229619afc37969@ec2-54-247-177-33.eu-west-1.compute.amazonaws.com:5432/d81ndajjs435dl';

const pool = new Pool({
  // user: 'qteorhenhhafxk',
  // host: 'ec2-54-247-177-33.eu-west-1.compute.amazonaws.com',
  // database: '/d81ndajjs435dl',
  // password: '6ce54e222dd9d48768d1450b96fa91b0966239026292309303229619afc37969',
  // port: '5432'
  connectionString: connectionString,
})

pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res);
  pool.end();
})

const client = new Client({
  // user: 'qteorhenhhafxk',
  // host: 'ec2-54-247-177-33.eu-west-1.compute.amazonaws.com',
  // database: '/d81ndajjs435dl',
  // password: '6ce54e222dd9d48768d1450b96fa91b0966239026292309303229619afc37969',
  // port: '5432'
  connectionString: connectionString,
})
client.connect();

client.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  client.end()
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

    pg.connect(connectionString, (err, client, done) => {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({success: false, data: err});
        }
        // SQL Query > Insert Data
        client.query('INSERT INTO userAccounts(username, user_password, isadmin, firstName, lastName, highestScore) values($1, $2, $3, $4, $5, $6)',
        [data.username, data.password, data.isadmin, data.firstName, data.lastName, data.highestScore]);
        
        // After all data is returned, close connection and return results
        query.on('end', () => {
          done();
          return res.json();
        });
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

    const results = [];
    //insert code here to check if email and password are correct.
    pg.connect(connectionString, (err, client, done) => {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({success: false, data: err});
        }

        const data = {username: req.body.log_username, password: req.body.log_user_password};
        const query = client.query('SELECT username, user_password FROM userAccounts WHERE username = $1', [data.username]);
        // Stream results back one row at a time
        query.on('row', (row) => {
          results.push(row);
        });

        if (results != null){
            var user = results.pop();
            var password = results.pop();
            if (user == data.username && password == data.password)
                return res.status(200).json({success: true});
            else 
                return res.status(403).json({success: false});
        }
        // After all data is returned, close connection and return results
        query.on('end', () => {
          done();
          return res.json(results);
        });
    });
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

    pg.connect(connectionString, (err, client, done) => {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({success: false, data: err});
        }
        var userId = getUserId(reg.body.username);
        var extraFunds = req.body.funds;
        const data = {username: req.body.username};
        const query = client.query('SELECT * FROM tblFunds WHERE userId = $1', [userId]);
        
        // Stream results back one row at a time
        query.on('row', (row) => {
          results.push(row);
        });
        var currentFunds = 200;
        var newFundsTotal = currentFunds + extraFunds;
        const updateQuery = client.query('Update user_funds SET user_funds = $1',[newFundsTotal]);
        // After all data is returned, close connection and return results
        query.on('end', () => {
          done();
          return res.json(results);
        });
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

    pg.connect(connectionString, (err, client, done) => {
      // Handle connection errors
      if(err) {
        done();
        console.log(err);
        return res.status(500).json({success: false, data: err});
      }
      var userId = getUserId(reg.body.username); 
      const data = {username: req.body.username};
      const query = client.query('SELECT support FROM tblUserSupportGained WHERE userId = $1 AND provinceId = $2', [userId, reg.body.provinceId]);
      const newSupport = 20;
      const finalNewSupport = newSupport + 'Queried support';

      /* AI moves? */


      // Stream results back one row at a time
      query.on('row', (row) => {
        results.push(row);
      });
      const updateQuery = client.query('Update tblUserSupportGained SET support = $1',[finalNewSupport]);
      // After all data is returned, close connection and return results
      query.on('end', () => {
        done();
        return res.json(results);
      });
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

    pg.connect(connectionString, (err, client, done) => {
      // Handle connection errors
      if(err) {
        done();
        console.log(err);
        return res.status(500).json({success: false, data: err});
      }
      var userId = getUserId(reg.body.username); 
      const data = {username: req.body.username};
      const query = client.query('SELECT support FROM tblUserSupportGained WHERE userId = $1 AND provinceId = $2', [userId, reg.body.provinceId]); 
      /* AI moves? */


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

    pg.connect(connectionString, (err, client, done) => {
      // Handle connection errors
      if(err) {
        done();
        console.log(err);
        return res.status(500).json({success: false, data: err});
      }
      var userId = getUserId(reg.body.username);
      const query = client.query('SELECT * FROM tblFunds WHERE userId = $1', [userId]);
      
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

    pg.connect(connectionString, (err, client, done) => {
      // Handle connection errors
      if(err) {
        done();
        console.log(err);
        return res.status(500).json({success: false, data: err});
      }
      const queryGP = client.query('SELECT totalfundsAvailable FROM tblProvince WHERE provinceName = "Gauteng"');
      const queryMP = client.query('SELECT totalfundsAvailable FROM tblProvince WHERE provinceName = "Mpumanlanga"');
      const queryL = client.query('SELECT totalfundsAvailable FROM tblProvince WHERE provinceName = "Limpopo"');
      const queryKZN = client.query('SELECT totalfundsAvailable FROM tblProvince WHERE provinceName = "Kwazulu-Natal"');
      const queryEC = client.query('SELECT totalfundsAvailable FROM tblProvince WHERE provinceName = "Eastern Cape"');
      const queryWC = client.query('SELECT totalfundsAvailable FROM tblProvince WHERE provinceName = "Western Cape"');
      const queryNC = client.query('SELECT totalfundsAvailable FROM tblProvince WHERE provinceName = "Northern Cape"');
      const queryFS = client.query('SELECT totalfundsAvailable FROM tblProvince WHERE provinceName = "Free State"');
      const queryGauteng = client.query('SELECT totalfundsAvailable FROM tblProvince WHERE provinceName = "North West"');      
      
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
    
    var text = '{"Gauteng" : "10000", "Limpopo" : "5000", "West Cape" : "1000", "North Cape" : "2300", "East Cape" : "200", "Kwazulu natal" : "900", "Mpumalanga": "1300", "North West" : "4200", "Freestate" : "3300"}';
    var obj = JSON.parse(text);
    res.send(obj);
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

    pg.connect(connectionString, (err, client, done) => {
      // Handle connection errors
      if(err) {
        done();
        console.log(err);
        return res.status(500).json({success: false, data: err});
      }
      var userId = getUserId(reg.body.username);
      const query = client.query('SELECT * FROM userAccounts WHERE userId = $1', [userId]);
      
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

    pg.connect(connectionString, (err, client, done) => {
      // Handle connection errors
      if(err) {
        done();
        console.log(err);
        return res.status(500).json({success: false, data: err});
      }
      var userId = getUserId(reg.body.username);
      const query = client.query('SELECT currentScore FROM userAccounts WHERE userId = $1', [userId]);
      
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

    pg.connect(connectionString, (err, client, done) => {
      // Handle connection errors
      if(err) {
        done();
        console.log(err);
        return res.status(500).json({success: false, data: err});
      }
      var userId = getUserId(reg.body.username);
      const query = client.query('SELECT manPower FROM tblUserManPowerGained WHERE userId = $1', [userId]);
      
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

    pg.connect(connectionString, (err, client, done) => {
      // Handle connection errors
      if(err) {
        done();
        console.log(err);
        return res.status(500).json({success: false, data: err});
      }
      var userId = getUserId(reg.body.username);
      const query = client.query('SELECT support FROM tblUserSupportGained WHERE userId = $1', [userId]);
      
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
    var query;
    pg.connect(connectionString, (err, client, done) => {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({success: false, data: err});
        }

        query = client.query('SELECT pkid FROM userAccounts WHERE username = $1', [username]);
        // Stream results back one row at a time
    });
    return query;
}

module.exports = router;