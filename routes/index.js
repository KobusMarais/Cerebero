var express = require('express');
var router = express.Router();
const pg = require('pg');
const path = require('path');
const connectionString = process.env.DATABASE_URL || 'postgres://testUser:testTodo@localhost:5432/user';

/* GET home page. */
// router.get('/', (req, res, next) => {
//   res.sendFile(path.join(
//     __dirname, '..', '..', 'client', 'views', 'index.html'));
// });
router.get('/', (req, res, next) => {
  res.sendFile(path.join(
    __dirname, '..', 'public', 'index.html'));
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
  const data = {username: req.body.username, password: req.body.user_password, isadmin: false};
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

module.exports = router;
