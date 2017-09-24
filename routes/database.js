var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://postgres@localhost:5432/user';
var query;
const client = new pg.Client(connectionString);
client.connect();

query = client.query('CREATE TABLE userAccounts(pkid SERIAL PRIMARY KEY, username TEXT NOT NULL, user_password TEXT UNIQUE NOT NULL, firstName TEXT NOT NULL, lastName TEXT NOT NULL, email TEXT NOT NULL);');
query = client.query('CREATE TABLE userProfile( pkid SERIAL PRIMARY KEY, userId INT NOT NULL REFERENCES userAccounts(pkid), topic1 TEXT NOT NULL, topic2 TEXT NOT NULL, topic3 TEXT NOT NULL, topic4 TEXT NOT NULL, suppGauteng INT NOT NULL, suppFreestate INT NOT NULL, suppLimpopo INT NOT NULL, suppNorthWest INT NOT NULL, suppNorthCape INT NOT NULL, suppWestCape INT NOT NULL, suppEastCape INT NOT NULL, suppKZN INT NOT NULL, suppMpuma INT NOT NULL, action1 TEXT NULL, action2 TEXT NULL, action3 TEXT NULL);');
query = client.query('CREATE TABLE AI(pkid SERIAL PRIMARY KEY, userId INT NOT NULL REFERENCES userAccounts(pkid), aiNum INT NOT NULL, topic1 TEXT NOT NULL, topic2 TEXT NOT NULL, topic3 TEXT NOT NULL, topic4 TEXT NOT NULL, suppGauteng INT NOT NULL, suppFreestate INT NOT NULL, suppLimpopo INT NOT NULL, suppNorthWest INT NOT NULL, suppNorthCape INT NOT NULL, suppWestCape INT NOT NULL, suppEastCape INT NOT NULL, suppKZN INT NOT NULL, suppMpuma INT NOT NULL, action1 TEXT NULL, action2 TEXT NULL, action3 TEXT NULL);');
query = client.query('CREATE TABLE allIssues\n' +
    '(\n' +
    '\n' +
    '    pkid SERIAL PRIMARY KEY, \n' +
    '   \n' +
    '    topicName TEXT NOT NULL, \n' +
    '    topicDescription TEXT NOT NULL,\n' +
    '    topicStance TEXT NOT NULL\n' +
    ');');
query = client.query('CREATE TABLE tblFunds\n' +
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
    ');');

query = client.query('CREATE TABLE tblManPower\n' +
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
    ');');
query = client.query('CREATE TABLE Stances\n' +
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
    ');');
query = client.query('CREATE TABLE Leaderboard(pkid SERIAL PRIMARY KEY,userId INT NOT NULL REFERENCES userAccounts(pkid),score INT NOT NULL);');

query = client.query('CREATE TABLE tblProvinces(pkid SERIAL PRIMARY KEY, provinceName TEXT NOT NULL, totalfundsAvailable INT NOT NULL, totalManpowerAvailable INT NOT NULL);');

//query = client.query('INSERT INTO userAccounts(pkid, username, user_password, isAdmin, firstName, lastName, currentScore , highestScore) values($1, $2, $3, $4, $5, $6, $7, $8)',
  //  [3,'Victor','password111',true,'Victor','Twigge',12,12]);

query = client.query('INSERT INTO userProfile(pkid, userId, topic1, topic2, topic3, topic4, suppGauteng, suppFreestate, suppLimpopo, suppNorthWest, suppNorthCape, suppWestCape, suppEastCape, suppKZN, suppMpuma, action1, action2, action3) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18)',[1,3,'Crime Right', 'Crime Right', 'Crime Right', 'Crime Right', 10,10,10,10,10,10,10,10,10, '','','']);

query = client.query('INSERT INTO AI(pkid, userId, aiNum, topic1, topic2, topic3, topic4, suppGauteng, suppFreestate, suppLimpopo, suppNorthWest, suppNorthCape, suppWestCape, suppEastCape, suppKZN, suppMpuma, action1, action2, action3) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19)',[1,3,1,'Crime Right', 'Crime Right', 'Crime Right', 'Crime Right', 10,10,10,10,10,10,10,10,10, '','','']);
query = client.query('INSERT INTO AI(pkid, userId, aiNum, topic1, topic2, topic3, topic4, suppGauteng, suppFreestate, suppLimpopo, suppNorthWest, suppNorthCape, suppWestCape, suppEastCape, suppKZN, suppMpuma, action1, action2, action3) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19)',[2,3,2,'Crime Right', 'Crime Right', 'Crime Right', 'Crime Right', 10,10,10,10,10,10,10,10,10, '','','']);
query = client.query('INSERT INTO AI(pkid, userId, aiNum, topic1, topic2, topic3, topic4, suppGauteng, suppFreestate, suppLimpopo, suppNorthWest, suppNorthCape, suppWestCape, suppEastCape, suppKZN, suppMpuma, action1, action2, action3) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19)',[3,3,3,'Crime Right', 'Crime Right', 'Crime Right', 'Crime Right', 10,10,10,10,10,10,10,10,10, '','','']);
query = client.query('INSERT INTO AI(pkid, userId, aiNum, topic1, topic2, topic3, topic4, suppGauteng, suppFreestate, suppLimpopo, suppNorthWest, suppNorthCape, suppWestCape, suppEastCape, suppKZN, suppMpuma, action1, action2, action3) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19)',[4,3,4,'Crime Right', 'Crime Right', 'Crime Right', 'Crime Right', 10,10,10,10,10,10,10,10,10, '','','']);


query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[1,'Crime', 'Restorative Justice', 'Far Left']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[2,'Crime', 'Rehabilitation', 'Left']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[3,'Crime', 'Prevention', 'Centre']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[4,'Crime', 'Punishment', 'Right']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[5,'Crime', 'Increased Sentencing', 'Far Right']);

query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[6,'Symbols of History', 'Removal of all Colonial Symbols', 'Far Left']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[7,'Symbols of History', 'Removal of Some Colonial Symbols', 'Left']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[8,'Symbols of History', 'Removal of Offensive Symbols', 'Centre']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[9,'Symbols of History', 'Using Colonial Symbols For Education', 'Right']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[10,'Symbols of History', 'Retaining Colonial Symbols', 'Far Right']);

query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[11,'Immigration', 'Abolishing Borders', 'Far Left']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[12,'Immigration', 'Relaxed Immigrations Laws', 'Left']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[13,'Immigration', 'Control Borders', 'Centre']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[14,'Immigration', 'Strict Enforcement of Immigration Laws', 'Right']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[15,'Immigration', 'Stricter Immigration Laws', 'Far Right']);

query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[16,'Racism', 'Criminalise Racism', 'Far Left']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[17,'Racism', 'Criminalise Hate Speech', 'Left']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[18,'Racism', 'Public Education Programmes on Racism', 'Centre']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[19,'Racism', 'Emphasise Free Speech', 'Right']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[20,'Racism', 'Complete Free Speech', 'Far Right']);

query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[21,'Firearm Control', 'Ban All Firearms', 'Far Left']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[22,'Firearm Control', 'Guns Reserved For Law Enforcement', 'Left']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[23,'Firearm Control', 'Strict Firearm Regulation', 'Centre']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[24,'Firearm Control', 'Light Firearm Regulation', 'Right']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[25,'Firearm Control', 'Relaxed Firearm Regulation', 'Far Right']);

query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[26,'Same-Sex Marriage', 'Allow Polygamous Same-Sex Marriage', 'Far Left']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[27,'Same-Sex Marriage', 'Allow Same-Sex Marriage', 'Left']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[28,'Same-Sex Marriage', 'Retain Civil Unions', 'Centre']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[29,'Same-Sex Marriage', 'Tax Benefits But No Marriage', 'Right']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[30,'Same-Sex Marriage', 'No Same Sex Marriage', 'Far Right']);

query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[31,'Prostitution', 'Unregulated Prostitution', 'Far Left']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[32,'Prostitution', 'Regulated Prostitution', 'Left']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[33,'Prostitution', 'Prosecute Prostitutes', 'Centre']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[34,'Prostitution', 'Prosecute Both Parties', 'Right']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[35,'Prostitution', 'Criminalise Sex Outside Of Marriage', 'Far Right']);

query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[36,'Abortion', 'Easy Abortions At All Times', 'Far Left']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[37,'Abortion', 'Easy Abortions Before 12 Weeks', 'Left']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[38,'Abortion', 'Easy Abortions Before 20 Weeks', 'Centre']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[39,'Abortion', 'Abortion If Life Of Mother Is Threatened', 'Right']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[40,'Abortion', 'No Abortion', 'Far Right']);

query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[41,'Regulation of Media', 'State Owned Media', 'Far Left']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[42,'Regulation of Media', 'Regulated Media', 'Left']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[43,'Regulation of Media', 'Strong Enforcement of Press Code', 'Centre']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[44,'Regulation of Media', 'Self-Regulation By Media', 'Right']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[45,'Regulation of Media', 'Completely Free Media', 'Far Right']);

query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[46,'Sport Quotas', 'Sports teams must reflect demographics', 'Far Left']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[47,'Sport Quotas', 'Heavy Regulation', 'Left']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[48,'Sport Quotas', 'Light Quotas', 'Centre']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[49,'Sport Quotas', 'Sports Programmes In Schools', 'Right']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[50,'Sport Quotas', 'No Quotas', 'Far Right']);

query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[51,'Drug Legislation', 'All Drugs Are Legal', 'Far Left']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[52,'Drug Legislation', 'Legalise Marijuana', 'Left']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[53,'Drug Legislation', 'Criminalise Sale of Drugs', 'Centre']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[54,'Drug Legislation', 'Criminalise Use and Sale of Drugs', 'Right']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[55,'Drug Legislation', 'Heavily Penalise Sale and Use of Drugs', 'Far Right']);

query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[56,'Mining', 'Nationalisation of Mines', 'Far Left']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[57,'Mining', 'State Guardianship of Mines', 'Left']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[58,'Mining', 'Mandatory Corporate Social Responsibility', 'Centre']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[59,'Mining', 'Regulated Private Mining', 'Right']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[60,'Mining', 'No Regulation of Mining', 'Far Right']);

query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[61,'Energy Production', 'Fully State Owned', 'Far Left']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[62,'Energy Production', 'Fully State Owned With Subsidies For Green Energies', 'Left']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[63,'Energy Production', 'Mix of Public and Independent Power Producers', 'Centre']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[64,'Energy Production', 'Subsidised Private Power Producers', 'Right']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[65,'Energy Production', 'Private Power Producers', 'Far Right']);

query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[66,'Affirmative Action', 'Strict Penalties for Non-Compliance', 'Far Left']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[67,'Affirmative Action', 'Compliance Required For State Business', 'Left']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[68,'Affirmative Action', 'Incentivise Affirmative Action', 'Centre']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[69,'Affirmative Action', 'Phase Out Affirmative Action', 'Right']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[70,'Affirmative Action', 'No Affirmative Action', 'Far Right']);

query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[71,'Labour Regulation', 'Unions Must Be Consulted On All Matters', 'Far Left']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[72,'Labour Regulation', 'Unions May Strike At Will', 'Left']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[73,'Labour Regulation', 'Mandatory Arbitration Before Strikes', 'Centre']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[74,'Labour Regulation', 'Strict Regulation Of Strikes', 'Right']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[75,'Labour Regulation', 'No Unions Allowed', 'Far Right']);

query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[76,'Land Reform', 'Expropriation Without Compensation', 'Far Left']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[77,'Land Reform', 'Expropriation with Compensation', 'Left']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[78,'Land Reform', 'Willing Buyer Willing Seller', 'Centre']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[79,'Land Reform', 'Redistribution of State Owned Land', 'Right']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[80,'Land Reform', 'No Expropriation', 'Far Right']);

query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[81,'Tax Of High Income Earners', '70%', 'Far Left']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[82,'Tax Of High Income Earners', '50%', 'Left']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[83,'Tax Of High Income Earners', '35%', 'Centre']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[84,'Tax Of High Income Earners', '15%', 'Right']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[85,'Tax Of High Income Earners', '0%', 'Far Right']);

query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[86,'Social Grants', 'Minimum Income For All', 'Far Left']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[87,'Social Grants', 'Relaxed Requirements To Receive Grants', 'Left']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[88,'Social Grants', 'Grants For Those In Serious Need', 'Centre']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[89,'Social Grants', 'Grants For Active Job Seekers', 'Right']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[90,'Social Grants', 'None', 'Far Right']);

query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[91,'Unemployment', 'State Jobs', 'Far Left']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[92,'Unemployment', 'State Subsidised Jobs', 'Left']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[93,'Unemployment', 'Youth Unemployment Grants', 'Centre']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[94,'Unemployment', 'Focus On Entrepreneurship', 'Right']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[95,'Unemployment', 'Focus On Economic Growth', 'Far Right']);

query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[96,'Tertiary Education', 'Free Tertiary Education', 'Far Left']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[97,'Tertiary Education', 'Publicly Funded Universities', 'Left']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[98,'Tertiary Education', 'Public and Private Universities', 'Centre']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[99,'Tertiary Education', 'Subsidised Private Universities', 'Right']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[100,'Tertiary Education', 'Private Universities', 'Far Right']);

query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[101,'Primary Education', 'Free Primary Education', 'Far Left']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[102,'Primary Education', 'Subsidised Primary Education', 'Left']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[103,'Primary Education', 'Public and Private Schools', 'Centre']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[104,'Primary Education', 'Voucher System', 'Right']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[105,'Primary Education', 'Private Schools Only', 'Far Right']);

query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[106,'African Union', 'Establish Pan-African Government', 'Far Left']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[107,'African Union', 'Establish Single African Currency', 'Left']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[108,'African Union', 'Participate in AU Activities', 'Centre']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[109,'African Union', 'Criticise Human Rights Violators', 'Right']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[110,'African Union', 'Refuse Participation', 'Far Right']);

query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[111,'Housing', 'Free Housing', 'Far Left']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[112,'Housing', 'Subsidised State Housing', 'Left']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[113,'Housing', 'Housing Grants', 'Centre']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[114,'Housing', 'Housing Interest Rate Control', 'Right']);
query = client.query('INSERT INTO allIssues(pkid, topicName, topicDescription, topicStance) values($1,$2,$3,$4)',[115,'Housing', 'No Housing Rate Control', 'Far Right']);



query = client.query('INSERT INTO tblFunds(pkid, userId, user_funds, ai1_funds, ai2_funds, ai3_funds, ai4_funds) values($1, $2, $3, $4, $5, $6, $7)', [1,3,200,200,200,200,200]);

query = client.query('INSERT INTO tblManPower(pkid, userId, user_ManPower, ai1_ManPower, ai2_ManPower, ai3_ManPower, ai4_ManPower) values($1,$2,$3,$4,$5,$6,$7)',[1,3,9000,9000,9000,9000,9000]);

query = client.query('INSERT INTO tblProvinces(pkid, provinceName, totalfundsAvailable, totalManpowerAvailable) values ($1,$2,$3,$4)', [1, 'Gauteng', 90000, 15000]);

query = client.query('INSERT INTO Stances(pkid,stance,suppGauteng, suppFreestate, suppLimpopo, suppNorthWest, suppNorthCape, suppWestCape, suppEastCape, suppKZN, suppMpuma, suppNat) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)',[1,'Right',1,2,3,4,5,6,7,8,9,10]);

query = client.query('INSERT INTO Leaderboard(pkid,userId, score) values($1,$2,$3)',[1, 3, 9001]);



/*
 var counter = 0;
    query = client.query('SELECT t.* FROM Leaderboard t ORDER BY t.score DESC LIMIT 100');
    query.on('row', (row) => {
        console.log(row['userid'])});
*/
/*var texto = "this is a test   ";

var querytext = "SELECT * FROM allIssues WHERE topicname = '"+ "Crime" +"'";
query = client.query(querytext);*/
//a = "Crime";
//query = client.query("SELECT * FROM allIssues WHERE topicname = '"+ a +"'");
/*query.on('row', (row) => {
    texto += row['topicdescription'];
    console.log(texto);
});
*/


query.on('end', () => {
  //  console.log(texto + "finishline");
    client.end();
});

});

module.exports = router;
