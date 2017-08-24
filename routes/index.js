var express = require('express');
var router = express.Router();
const pg = require('pg');
const path = require('path');
const connectionString = process.env.DATABASE_URL || 'postgres://qteorhenhhafxk:6ce54e222dd9d48768d1450b96fa91b0966239026292309303229619afc37969@ec2-54-247-177-33.eu-west-1.compute.amazonaws.com:5432/d81ndajjs435dl';

/* GET home page. */
// router.get('/', (req, res, next) => {
//   res.sendFile(path.join(
//     __dirname, '..', '..', 'client', 'views', 'index.html'));
// });
router.get('/', (req, res, next) => {
  res.sendFile(path.join(
    __dirname, '..', 'public', 'index.html'));
});

router.get('/profile', (req, res, next) => {
  res.sendFile(path.join(
    __dirname, '..', 'public', 'profile.html'));
});

/* READ */
router.get('/api/v1/users', (req, res, next) => {
  const results = [];
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM account ORDER BY id ASC;');
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
});

/* CREATE a single user*/
router.post('/api/v1/users', (req, res, next) => {
  const results = [];
  // Grab data from http request
  const data = {username: req.body.reg_username, password: req.body.reg_user_password, isadmin: false};
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Insert Data
    client.query('INSERT INTO account(username, password, isadmin) values($1, $2, $3)',
    [data.username, data.password, data.isadmin]);
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM account ORDER BY id ASC');
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
});

/* login a user*/
router.post('/api/v1/loginUsers', (req, res, next) => {
  const results = [];
  // Grab data from http request
  const data = {username: req.body.log_username, password: req.body.log_user_password};
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > SELECT user
    const userPassword = client.query('SELECT password FROM account WHERE username = $1', [data.username]).then.toString;
    if(userPassword == data.password)
      return true;
    else
      return false;   
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});

/* UPDATE */
router.put('/api/v1/users/:user_id', (req, res, next) => {
  const results = [];
  // Grab data from the URL parameters
  const id = req.params.user_id;
  // Grab data from http request
  const data = {username: req.body.username, password: req.body.user_password , isadmin: req.body.isadmin};
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Update Data
    client.query('UPDATE account SET username=($1), password=($2) ,isadmin=($3) WHERE id=($4)',
    [data.username, data.user_password, data.isadmin, id]);
    // SQL Query > Select Data
    const query = client.query("SELECT * FROM account ORDER BY id ASC");
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', function() {
      done();
      return res.json(results);
    });
  });
});

/* DELETE */ 
router.delete('/api/v1/users/:user_id', (req, res, next) => {
  const results = [];
  // Grab data from the URL parameters
  const id = req.params.todo_id;
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Delete Data
    client.query('DELETE FROM account WHERE id=($1)', [id]);
    // SQL Query > Select Data
    var query = client.query('SELECT * FROM account ORDER BY id ASC');
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
});

/* CREATE a user profile*/
router.post('/api/v1/createProfile', (req, res, next) => {
  const results = [];
  // Grab data from http request
  const data = {topic1: req.body.topic1, topic2: req.body.topic2, topic3: req.body.topic3, topic4: req.body.topic4};
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    } 
    // SQL Query > Select logged in user
    const userID = client.query('SELECT id FROM account WHERE username = $1;', ['test1']).then.toString(); 
    // SQL Query > Insert Data
    client.query('INSERT INTO userProfile(userId, topic1, topic2, topic3, topic4) values($1, $2, $3, $4, $5)',
    [userID, data.topic1, data.topic2, data.topic3, data.topic4]);
    
    //REMEMBER TO RETRIEVE USERID!!!

    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});

module.exports = router;
