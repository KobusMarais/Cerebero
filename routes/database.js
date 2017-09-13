const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://postgres@localhost:5432/user';
var query;
const client = new pg.Client(connectionString);
client.connect();

//query = client.query('CREATE TABLE userAccounts( pkid SERIAL PRIMARY KEY, username TEXT NOT NULL, user_password TEXT UNIQUE NOT NULL, isAdmin BOOLEAN NOT NULL, firstName TEXT NOT NULL, lastName TEXT NOT NULL, currentScore INT, highestScore INT);');
//query = client.query('CREATE TABLE userProfile( pkid SERIAL PRIMARY KEY, userId INT NOT NULL REFERENCES userAccounts(pkid), topic1 INT NOT NULL, topic2 INT NOT NULL, topic3 INT NOT NULL, topic4 INT NOT NULL, suppGauteng INT NOT NULL, suppFreestate INT NOT NULL, suppLimpopo INT NOT NULL, suppNorthWest INT NOT NULL, suppNorthCape INT NOT NULL, suppWestCape INT NOT NULL, suppEastCape INT NOT NULL, suppKZN INT NOT NULL, suppMpuma INT NOT NULL, action1 TEXT NULL, action2 TEXT NULL, action3 TEXT NULL);');
//query = client.query('CREATE TABLE AI(pkid SERIAL PRIMARY KEY, userId INT NOT NULL REFERENCES userAccounts(pkid), aiNum INT NOT NULL, topic1 INT NOT NULL, topic2 INT NOT NULL, topic3 INT NOT NULL, topic4 INT NOT NULL, suppGauteng INT NOT NULL, suppFreestate INT NOT NULL, suppLimpopo INT NOT NULL, suppNorthWest INT NOT NULL, suppNorthCape INT NOT NULL, suppWestCape INT NOT NULL, suppEastCape INT NOT NULL, suppKZN INT NOT NULL, suppMpuma INT NOT NULL, action1 TEXT NULL, action2 TEXT NULL, action3 TEXT NULL);');
query = client.query('CREATE TABLE allIssues\n' +
    '(\n' +
    '\n' +
    '    pkid SERIAL PRIMARY KEY, \n' +
    '   \n' +
    '    topicName TEXT NOT NULL, \n' +
    '    topicDescription TEXT NOT NULL,\n' +
    '    topicStance TEXT NOT NULL\n' +
    ');');


/*query = client.query('INSERT INTO userAccounts(pkid, username, user_password, isAdmin, firstName, lastName, currentScore , highestScore) values($1, $2, $3, $4, $5, $6, $7, $8)',
    [3,'Victor','password111',true,'Victor','Twigge',12,12]);*/


/*query = client.query('SELECT * FROM userAccounts');
query.on('row', (row) => {
    console.log(row['user_password']);
});

query = client.query('SELECT * FROM userAccounts');
query.on('row', (row) => {
    console.log(row['lastname']);
});*/


query.on('end', () => { client.end(); });