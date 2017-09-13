const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://postgres@localhost:5432/user';
var query;
const client = new pg.Client(connectionString);
client.connect();

//query = client.query('CREATE TABLE userAccounts( pkid SERIAL PRIMARY KEY, username TEXT NOT NULL, user_password TEXT UNIQUE NOT NULL, isAdmin BOOLEAN NOT NULL, firstName TEXT NOT NULL, lastName TEXT NOT NULL, currentScore INT, highestScore INT);');
//query = client.query('CREATE TABLE userProfile( pkid SERIAL PRIMARY KEY, userId INT NOT NULL REFERENCES userAccounts(pkid), topic1 INT NOT NULL, topic2 INT NOT NULL, topic3 INT NOT NULL, topic4 INT NOT NULL, suppGauteng INT NOT NULL, suppFreestate INT NOT NULL, suppLimpopo INT NOT NULL, suppNorthWest INT NOT NULL, suppNorthCape INT NOT NULL, suppWestCape INT NOT NULL, suppEastCape INT NOT NULL, suppKZN INT NOT NULL, suppMpuma INT NOT NULL, action1 TEXT NULL, action2 TEXT NULL, action3 TEXT NULL);');
//query = client.query('CREATE TABLE AI(pkid SERIAL PRIMARY KEY, userId INT NOT NULL REFERENCES userAccounts(pkid), aiNum INT NOT NULL, topic1 INT NOT NULL, topic2 INT NOT NULL, topic3 INT NOT NULL, topic4 INT NOT NULL, suppGauteng INT NOT NULL, suppFreestate INT NOT NULL, suppLimpopo INT NOT NULL, suppNorthWest INT NOT NULL, suppNorthCape INT NOT NULL, suppWestCape INT NOT NULL, suppEastCape INT NOT NULL, suppKZN INT NOT NULL, suppMpuma INT NOT NULL, action1 TEXT NULL, action2 TEXT NULL, action3 TEXT NULL);');
/*query = client.query('CREATE TABLE allIssues\n' +
    '(\n' +
    '\n' +
    '    pkid SERIAL PRIMARY KEY, \n' +
    '   \n' +
    '    topicName TEXT NOT NULL, \n' +
    '    topicDescription TEXT NOT NULL,\n' +
    '    topicStance TEXT NOT NULL\n' +
    ');');*/
/*query = client.query('CREATE TABLE tblFunds\n' +
    '(\n' +
    '\n' +
    '    pkid SERIAL PRIMARY KEY,\n' +
    '  \n' +
    '  userId INT NOT NULL REFERENCES userAccounts(pkid),\n' +
    '\n' +
    '    user_funds INT NOT NULL,\n' +
    '\n' +
    '    ai1_funds INT NOT NULL,\n' +
    '\n' +
    '    ai2_funds INT NOT NULL,\n' +
    '\n' +
    '    ai3_funds INT NOT NULL,\n' +
    '\n' +
    '    ai4_funds INT NOT NULL\n' +
    '\n' +
    ');');*/

/*query = client.query('CREATE TABLE tblManPower\n' +
    '(\n' +
    '    \n' +
    '    pkid SERIAL PRIMARY KEY,\n' +
    ' \n' +
    '   userId INT NOT NULL REFERENCES userAccounts(pkid),\n' +
    '\n' +
    '    user_ManPower INT NOT NULL,\n' +
    '\n' +
    '    ai1_ManPower INT NOT NULL,\n' +
    '\n' +
    '    ai2_ManPower INT NOT NULL,\n' +
    '\n' +
    '    ai3_ManPower INT NOT NULL,\n' +
    '\n' +
    '    ai4_ManPower INT NOT NULL\n' +
    '\n' +
    ');');*/
/*query = client.query('CREATE TABLE Stances\n' +
    '(\n' +
    '    pkid SERIAL PRIMARY KEY,\n' +
    '    stance TEXT NOT NULL,\n' +
    '    suppGauteng INT NOT NULL,\n' +
    '    suppFreestate INT NOT NULL,\n' +
    '    suppLimpopo INT NOT NULL,\n' +
    '    suppNorthWest INT NOT NULL,\n' +
    '    suppNorthCape INT NOT NULL,\n' +
    '    suppWestCape INT NOT NULL,\n' +
    '    suppEastCape INT NOT NULL,\n' +
    '    suppKZN INT NOT NULL,\n' +
    '    suppMpuma INT NOT NULL,\n' +
    '    suppNat INT NOT NULL\n' +
    ');');*/
//query = client.query('CREATE TABLE Leaderboard(pkid SERIAL PRIMARY KEY,userId INT NOT NULL REFERENCES userAccounts(pkid),score INT NOT NULL);');
//query = client.query('CREATE TABLE tblProvinces(pkid SERIAL PRIMARY KEY, provinceName TEXT NOT NULL, totalfundsAvailable INT NOT NULL, totalManpowerAvailable INT NOT NULL);');


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