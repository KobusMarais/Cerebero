var express = require('express');
var router = express.Router();
/* GET users listing. */
router.get('/', function(req, res, next) {
    const pg = require('pg');
    const connectionString = process.env.DATABASE_URL || 'postgres://postgres@localhost:5432/user';
    var query;
    const client = new pg.Client(connectionString);
    client.connect();

    query = client.query('CREATE TABLE useraccounts(' +
        'pkid SERIAL PRIMARY KEY, ' +
        'username TEXT NOT NULL, ' +
        'password TEXT NOT NULL, ' +
        'firstName TEXT NOT NULL, ' +
        'lastName TEXT NOT NULL, ' +
        'email TEXT NOT NULL' +
        ');');

    query = client.query('CREATE TABLE userprofile( ' +
        'pkid SERIAL PRIMARY KEY, ' +
        'userid INT NOT NULL REFERENCES useraccounts(pkid), ' +
        'topic1 TEXT NOT NULL, ' +
        'topic2 TEXT NOT NULL, ' +
        'topic3 TEXT NOT NULL, ' +
        'topic4 TEXT NOT NULL,' +
        'topic5 TEXT NOT NULL, ' +
        'topic6 TEXT NOT NULL, ' +
        'topic7 TEXT NOT NULL, ' +
        'topic8 TEXT NOT NULL,' +
        'topic9 TEXT NOT NULL,' +
        'topic10 TEXT NOT NULL, ' +
        'score INT NOT NULL, ' +
        'funds INT NOT NULL);');

    query = client.query('CREATE TABLE ai1(' +
        'pkid SERIAL PRIMARY KEY, ' +
        'userid INT NOT NULL REFERENCES useraccounts(pkid), ' +
        'topic1 TEXT NOT NULL, ' +
        'topic2 TEXT NOT NULL, ' +
        'topic3 TEXT NOT NULL, ' +
        'topic4 TEXT NOT NULL,' +
        'topic5 TEXT NOT NULL, ' +
        'topic6 TEXT NOT NULL, ' +
        'topic7 TEXT NOT NULL, ' +
        'topic8 TEXT NOT NULL,' +
        'topic9 TEXT NOT NULL,' +
        'topic10 TEXT NOT NULL, ' +
        'funds INT NOT NULL);');

    query = client.query('CREATE TABLE ai2(' +
        'pkid SERIAL PRIMARY KEY, ' +
        'userid INT NOT NULL REFERENCES useraccounts(pkid), ' +
        'topic1 TEXT NOT NULL, ' +
        'topic2 TEXT NOT NULL, ' +
        'topic3 TEXT NOT NULL, ' +
        'topic4 TEXT NOT NULL,' +
        'topic5 TEXT NOT NULL, ' +
        'topic6 TEXT NOT NULL, ' +
        'topic7 TEXT NOT NULL, ' +
        'topic8 TEXT NOT NULL,' +
        'topic9 TEXT NOT NULL,' +
        'topic10 TEXT NOT NULL, ' +
        'funds INT NOT NULL);');

    query = client.query('CREATE TABLE ai3(' +
        'pkid SERIAL PRIMARY KEY, ' +
        'userid INT NOT NULL REFERENCES useraccounts(pkid), ' +
        'topic1 TEXT NOT NULL, ' +
        'topic2 TEXT NOT NULL, ' +
        'topic3 TEXT NOT NULL, ' +
        'topic4 TEXT NOT NULL,' +
        'topic5 TEXT NOT NULL, ' +
        'topic6 TEXT NOT NULL, ' +
        'topic7 TEXT NOT NULL, ' +
        'topic8 TEXT NOT NULL,' +
        'topic9 TEXT NOT NULL,' +
        'topic10 TEXT NOT NULL, ' +
        'funds INT NOT NULL);');

    query = client.query('CREATE TABLE ai4(' +
        'pkid SERIAL PRIMARY KEY, ' +
        'userid INT NOT NULL REFERENCES useraccounts(pkid), ' +
        'topic1 TEXT NOT NULL, ' +
        'topic2 TEXT NOT NULL, ' +
        'topic3 TEXT NOT NULL, ' +
        'topic4 TEXT NOT NULL,' +
        'topic5 TEXT NOT NULL, ' +
        'topic6 TEXT NOT NULL, ' +
        'topic7 TEXT NOT NULL, ' +
        'topic8 TEXT NOT NULL,' +
        'topic9 TEXT NOT NULL,' +
        'topic10 TEXT NOT NULL, ' +
        'funds INT NOT NULL);');

    query = client.query('CREATE TABLE allissues(' +
        'pkid SERIAL PRIMARY KEY,' +
        'topicName TEXT NOT NULL,' +
        'topicStance TEXT NOT NULL, ' +
        'topicDescription TEXT NOT NULL' +
        ');');

    query = client.query('CREATE TABLE stances(' +
        '    pkid SERIAL PRIMARY KEY,' +
        '    stance TEXT NOT NULL,' +
        '    gauteng INT NOT NULL,' +
        '    freestate INT NOT NULL,' +
        '    kwazulunatal INT NOT NULL,' +
        '    limpopo INT NOT NULL,' +
        '    northwest INT NOT NULL,' +
        '    northcape INT NOT NULL,' +
        '    westcape INT NOT NULL,' +
        '    eastcape INT NOT NULL,' +
        '    mpumalanga INT NOT NULL,' +
        '    national INT NOT NULL' +
        ');');

    query = client.query('CREATE TABLE leaderboard(' +
        'pkid SERIAL PRIMARY KEY,' +
        'userid INT NOT NULL REFERENCES useraccounts(pkid),' +
        'score INT NOT NULL' +
        ');');

    query = client.query('CREATE TABLE tblgauteng(' +
        'pkid SERIAL PRIMARY KEY,' +
        'userid INT NOT NULL REFERENCES useraccounts(pkid),' +
        'totalfunds INT NOT NULL,' +
        'totalmanpower INT NOT NULL,' +
        'totalsupport INT NOT NULL,' +
        'usermanpower INT NOT NULL,' +
        'usersupport INT NOT NULL,' +
        'ai1manpower INT NOT NULL,' +
        'ai1support INT NOT NULL,' +
        'ai2manpower INT NOT NULL,' +
        'ai2support INT NOT NULL,' +
        'ai3manpower INT NOT NULL,' +
        'ai3support INT NOT NULL,' +
        'ai4manpower INT NOT NULL,' +
        'ai4support INT NOT NULL,' +
        'usermanpoweravailable INT NOT NULL,' +
        'ai1manpoweravailable INT NOT NULL,' +
        'ai2manpoweravailable INT NOT NULL,' +
        'ai3manpoweravailable INT NOT NULL,' +
        'ai4manpoweravailable INT NOT NULL,' +
        'totalfundsavailable INT NOT NULL' +
        ');');

    query = client.query('CREATE TABLE tblwestcape(' +
        'pkid SERIAL PRIMARY KEY,' +
        'userid INT NOT NULL REFERENCES useraccounts(pkid),' +
        'totalfunds INT NOT NULL,' +
        'totalmanpower INT NOT NULL,' +
        'totalsupport INT NOT NULL,' +
        'usermanpower INT NOT NULL,' +
        'usersupport INT NOT NULL,' +
        'ai1manpower INT NOT NULL,' +
        'ai1support INT NOT NULL,' +
        'ai2manpower INT NOT NULL,' +
        'ai2support INT NOT NULL,' +
        'ai3manpower INT NOT NULL,' +
        'ai3support INT NOT NULL,' +
        'ai4manpower INT NOT NULL,' +
        'ai4support INT NOT NULL,' +
        'usermanpoweravailable INT NOT NULL,' +
        'ai1manpoweravailable INT NOT NULL,' +
        'ai2manpoweravailable INT NOT NULL,' +
        'ai3manpoweravailable INT NOT NULL,' +
        'ai4manpoweravailable INT NOT NULL,' +
        'totalfundsavailable INT NOT NULL' +
        ');');


    query = client.query('CREATE TABLE tbleastcape(' +
        'pkid SERIAL PRIMARY KEY,' +
        'userid INT NOT NULL REFERENCES useraccounts(pkid),' +
        'totalfunds INT NOT NULL,' +
        'totalmanpower INT NOT NULL,' +
        'totalsupport INT NOT NULL,' +
        'usermanpower INT NOT NULL,' +
        'usersupport INT NOT NULL,' +
        'ai1manpower INT NOT NULL,' +
        'ai1support INT NOT NULL,' +
        'ai2manpower INT NOT NULL,' +
        'ai2support INT NOT NULL,' +
        'ai3manpower INT NOT NULL,' +
        'ai3support INT NOT NULL,' +
        'ai4manpower INT NOT NULL,' +
        'ai4support INT NOT NULL,' +
        'usermanpoweravailable INT NOT NULL,' +
        'ai1manpoweravailable INT NOT NULL,' +
        'ai2manpoweravailable INT NOT NULL,' +
        'ai3manpoweravailable INT NOT NULL,' +
        'ai4manpoweravailable INT NOT NULL,' +
        'totalfundsavailable INT NOT NULL' +
        ');');


    query = client.query('CREATE TABLE tblnorthcape(' +
        'pkid SERIAL PRIMARY KEY,' +
        'userid INT NOT NULL REFERENCES useraccounts(pkid),' +
        'totalfunds INT NOT NULL,' +
        'totalmanpower INT NOT NULL,' +
        'totalsupport INT NOT NULL,' +
        'usermanpower INT NOT NULL,' +
        'usersupport INT NOT NULL,' +
        'ai1manpower INT NOT NULL,' +
        'ai1support INT NOT NULL,' +
        'ai2manpower INT NOT NULL,' +
        'ai2support INT NOT NULL,' +
        'ai3manpower INT NOT NULL,' +
        'ai3support INT NOT NULL,' +
        'ai4manpower INT NOT NULL,' +
        'ai4support INT NOT NULL,' +
        'usermanpoweravailable INT NOT NULL,' +
        'ai1manpoweravailable INT NOT NULL,' +
        'ai2manpoweravailable INT NOT NULL,' +
        'ai3manpoweravailable INT NOT NULL,' +
        'ai4manpoweravailable INT NOT NULL,' +
        'totalfundsavailable INT NOT NULL' +
        ');');


    query = client.query('CREATE TABLE tblnorthwest(' +
        'pkid SERIAL PRIMARY KEY,' +
        'userid INT NOT NULL REFERENCES useraccounts(pkid),' +
        'totalfunds INT NOT NULL,' +
        'totalmanpower INT NOT NULL,' +
        'totalsupport INT NOT NULL,' +
        'usermanpower INT NOT NULL,' +
        'usersupport INT NOT NULL,' +
        'ai1manpower INT NOT NULL,' +
        'ai1support INT NOT NULL,' +
        'ai2manpower INT NOT NULL,' +
        'ai2support INT NOT NULL,' +
        'ai3manpower INT NOT NULL,' +
        'ai3support INT NOT NULL,' +
        'ai4manpower INT NOT NULL,' +
        'ai4support INT NOT NULL,' +
        'usermanpoweravailable INT NOT NULL,' +
        'ai1manpoweravailable INT NOT NULL,' +
        'ai2manpoweravailable INT NOT NULL,' +
        'ai3manpoweravailable INT NOT NULL,' +
        'ai4manpoweravailable INT NOT NULL,' +
        'totalfundsavailable INT NOT NULL' +
        ');');


    query = client.query('CREATE TABLE tblfreestate(' +
        'pkid SERIAL PRIMARY KEY,' +
        'userid INT NOT NULL REFERENCES useraccounts(pkid),' +
        'totalfunds INT NOT NULL,' +
        'totalmanpower INT NOT NULL,' +
        'totalsupport INT NOT NULL,' +
        'usermanpower INT NOT NULL,' +
        'usersupport INT NOT NULL,' +
        'ai1manpower INT NOT NULL,' +
        'ai1support INT NOT NULL,' +
        'ai2manpower INT NOT NULL,' +
        'ai2support INT NOT NULL,' +
        'ai3manpower INT NOT NULL,' +
        'ai3support INT NOT NULL,' +
        'ai4manpower INT NOT NULL,' +
        'ai4support INT NOT NULL,' +
        'usermanpoweravailable INT NOT NULL,' +
        'ai1manpoweravailable INT NOT NULL,' +
        'ai2manpoweravailable INT NOT NULL,' +
        'ai3manpoweravailable INT NOT NULL,' +
        'ai4manpoweravailable INT NOT NULL,' +
        'totalfundsavailable INT NOT NULL' +
        ');');


    query = client.query('CREATE TABLE tblmpumalanga(' +
        'pkid SERIAL PRIMARY KEY,' +
        'userid INT NOT NULL REFERENCES useraccounts(pkid),' +
        'totalfunds INT NOT NULL,' +
        'totalmanpower INT NOT NULL,' +
        'totalsupport INT NOT NULL,' +
        'usermanpower INT NOT NULL,' +
        'usersupport INT NOT NULL,' +
        'ai1manpower INT NOT NULL,' +
        'ai1support INT NOT NULL,' +
        'ai2manpower INT NOT NULL,' +
        'ai2support INT NOT NULL,' +
        'ai3manpower INT NOT NULL,' +
        'ai3support INT NOT NULL,' +
        'ai4manpower INT NOT NULL,' +
        'ai4support INT NOT NULL,' +
        'usermanpoweravailable INT NOT NULL,' +
        'ai1manpoweravailable INT NOT NULL,' +
        'ai2manpoweravailable INT NOT NULL,' +
        'ai3manpoweravailable INT NOT NULL,' +
        'ai4manpoweravailable INT NOT NULL,' +
        'totalfundsavailable INT NOT NULL' +
        ');');


    query = client.query('CREATE TABLE tbllimpopo(' +
        'pkid SERIAL PRIMARY KEY,' +
        'userid INT NOT NULL REFERENCES useraccounts(pkid),' +
        'totalfunds INT NOT NULL,' +
        'totalmanpower INT NOT NULL,' +
        'totalsupport INT NOT NULL,' +
        'usermanpower INT NOT NULL,' +
        'usersupport INT NOT NULL,' +
        'ai1manpower INT NOT NULL,' +
        'ai1support INT NOT NULL,' +
        'ai2manpower INT NOT NULL,' +
        'ai2support INT NOT NULL,' +
        'ai3manpower INT NOT NULL,' +
        'ai3support INT NOT NULL,' +
        'ai4manpower INT NOT NULL,' +
        'ai4support INT NOT NULL,' +
        'usermanpoweravailable INT NOT NULL,' +
        'ai1manpoweravailable INT NOT NULL,' +
        'ai2manpoweravailable INT NOT NULL,' +
        'ai3manpoweravailable INT NOT NULL,' +
        'ai4manpoweravailable INT NOT NULL,' +
        'totalfundsavailable INT NOT NULL' +
        ');');

    query = client.query('CREATE TABLE tblkwazulunatal(' +
        'pkid SERIAL PRIMARY KEY,' +
        'userid INT NOT NULL REFERENCES useraccounts(pkid),' +
        'totalfunds INT NOT NULL,' +
        'totalmanpower INT NOT NULL,' +
        'totalsupport INT NOT NULL,' +
        'usermanpower INT NOT NULL,' +
        'usersupport INT NOT NULL,' +
        'ai1manpower INT NOT NULL,' +
        'ai1support INT NOT NULL,' +
        'ai2manpower INT NOT NULL,' +
        'ai2support INT NOT NULL,' +
        'ai3manpower INT NOT NULL,' +
        'ai3support INT NOT NULL,' +
        'ai4manpower INT NOT NULL,' +
        'ai4support INT NOT NULL,' +
        'usermanpoweravailable INT NOT NULL,' +
        'ai1manpoweravailable INT NOT NULL,' +
        'ai2manpoweravailable INT NOT NULL,' +
        'ai3manpoweravailable INT NOT NULL,' +
        'ai4manpoweravailable INT NOT NULL,' +
        'totalfundsavailable INT NOT NULL' +
        ');');


    query = client.query('INSERT INTO useraccounts(username, password, firstName, lastName, email) values($1, $2, $3, $4, $5)', ['Victor', 'password111', 'Victor', 'Twigge', 'vtwigge@yahoo.com']);

    query = client.query('INSERT INTO userprofile(userid, topic1, topic2, topic3, topic4, topic5, topic6, topic7, topic8, topic9, topic10,score, funds) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)', [1, 'Crime_Right', 'Crime_Right', 'Crime_Right', 'Crime_Right', 'Crime_Right', 'Crime_Right', 'Crime_Right', 'Crime_Right', 'Crime_Right', 'Crime_Right', 1000 ,1000]);

    query = client.query('INSERT INTO ai1(userid, topic1, topic2, topic3, topic4, topic5, topic6, topic7, topic8, topic9, topic10, funds) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11, $12)', [1, 'Crime_Right', 'Crime_Right', 'Crime_Right', 'Crime_Right', 'Crime_Right', 'Crime_Right', 'Crime_Right', 'Crime_Right', 'Crime_Right', 'Crime_Right', 1000]);
    query = client.query('INSERT INTO ai2(userid, topic1, topic2, topic3, topic4, topic5, topic6, topic7, topic8, topic9, topic10, funds) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11, $12)', [1, 'Crime_Right', 'Crime_Right', 'Crime_Right', 'Crime_Right', 'Crime_Right', 'Crime_Right', 'Crime_Right', 'Crime_Right', 'Crime_Right', 'Crime_Right', 1000]);
    query = client.query('INSERT INTO ai3(userid, topic1, topic2, topic3, topic4, topic5, topic6, topic7, topic8, topic9, topic10, funds) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11, $12)', [1, 'Crime_Right', 'Crime_Right', 'Crime_Right', 'Crime_Right', 'Crime_Right', 'Crime_Right', 'Crime_Right', 'Crime_Right', 'Crime_Right', 'Crime_Right', 1000]);
    query = client.query('INSERT INTO ai4(userid, topic1, topic2, topic3, topic4, topic5, topic6, topic7, topic8, topic9, topic10, funds) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11, $12)', [1, 'Crime_Right', 'Crime_Right', 'Crime_Right', 'Crime_Right', 'Crime_Right', 'Crime_Right', 'Crime_Right', 'Crime_Right', 'Crime_Right', 'Crime_Right', 1000]);

    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Crime', 'Restorative Justice', 'Far Left']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Crime', 'Rehabilitation', 'Left']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Crime', 'Prevention', 'Centre']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Crime', 'Punishment', 'Right']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Crime', 'Increased Sentencing', 'Far Right']);

    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Symbols of History', 'Removal of all Colonial Symbols', 'Far Left']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Symbols of History', 'Removal of Some Colonial Symbols', 'Left']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Symbols of History', 'Removal of Offensive Symbols', 'Centre']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Symbols of History', 'Using Colonial Symbols For Education', 'Right']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Symbols of History', 'Retaining Colonial Symbols', 'Far Right']);

    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Immigration', 'Abolishing Borders', 'Far Left']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Immigration', 'Relaxed Immigrations Laws', 'Left']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Immigration', 'Control Borders', 'Centre']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Immigration', 'Strict Enforcement of Immigration Laws', 'Right']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Immigration', 'Stricter Immigration Laws', 'Far Right']);

    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Racism', 'Criminalise Racism', 'Far Left']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Racism', 'Criminalise Hate Speech', 'Left']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Racism', 'Public Education Programmes on Racism', 'Centre']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Racism', 'Emphasise Free Speech', 'Right']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Racism', 'Complete Free Speech', 'Far Right']);

    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Firearm Control', 'Ban All Firearms', 'Far Left']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Firearm Control', 'Guns Reserved For Law Enforcement', 'Left']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Firearm Control', 'Strict Firearm Regulation', 'Centre']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Firearm Control', 'Light Firearm Regulation', 'Right']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Firearm Control', 'Relaxed Firearm Regulation', 'Far Right']);

    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Same-Sex Marriage', 'Allow Polygamous Same-Sex Marriage', 'Far Left']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Same-Sex Marriage', 'Allow Same-Sex Marriage', 'Left']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Same-Sex Marriage', 'Retain Civil Unions', 'Centre']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Same-Sex Marriage', 'Tax Benefits But No Marriage', 'Right']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Same-Sex Marriage', 'No Same Sex Marriage', 'Far Right']);

    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Prostitution', 'Unregulated Prostitution', 'Far Left']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Prostitution', 'Regulated Prostitution', 'Left']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Prostitution', 'Prosecute Prostitutes', 'Centre']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Prostitution', 'Prosecute Both Parties', 'Right']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Prostitution', 'Criminalise Sex Outside Of Marriage', 'Far Right']);

    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Abortion', 'Easy Abortions At All Times', 'Far Left']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Abortion', 'Easy Abortions Before 12 Weeks', 'Left']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Abortion', 'Easy Abortions Before 20 Weeks', 'Centre']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Abortion', 'Abortion If Life Of Mother Is Threatened', 'Right']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Abortion', 'No Abortion', 'Far Right']);

    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Regulation of Media', 'State Owned Media', 'Far Left']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Regulation of Media', 'Regulated Media', 'Left']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Regulation of Media', 'Strong Enforcement of Press Code', 'Centre']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Regulation of Media', 'Self-Regulation By Media', 'Right']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Regulation of Media', 'Completely Free Media', 'Far Right']);

    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Sport Quotas', 'Sports teams must reflect demographics', 'Far Left']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Sport Quotas', 'Heavy Regulation', 'Left']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Sport Quotas', 'Light Quotas', 'Centre']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Sport Quotas', 'Sports Programmes In Schools', 'Right']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Sport Quotas', 'No Quotas', 'Far Right']);

    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Drug Legislation', 'All Drugs Are Legal', 'Far Left']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Drug Legislation', 'Legalise Marijuana', 'Left']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Drug Legislation', 'Criminalise Sale of Drugs', 'Centre']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Drug Legislation', 'Criminalise Use and Sale of Drugs', 'Right']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Drug Legislation', 'Heavily Penalise Sale and Use of Drugs', 'Far Right']);

    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Mining', 'Nationalisation of Mines', 'Far Left']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Mining', 'State Guardianship of Mines', 'Left']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Mining', 'Mandatory Corporate Social Responsibility', 'Centre']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Mining', 'Regulated Private Mining', 'Right']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Mining', 'No Regulation of Mining', 'Far Right']);

    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Energy Production', 'Fully State Owned', 'Far Left']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Energy Production', 'Fully State Owned With Subsidies For Green Energies', 'Left']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Energy Production', 'Mix of Public and Independent Power Producers', 'Centre']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Energy Production', 'Subsidised Private Power Producers', 'Right']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Energy Production', 'Private Power Producers', 'Far Right']);

    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Affirmative Action', 'Strict Penalties for Non-Compliance', 'Far Left']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Affirmative Action', 'Compliance Required For State Business', 'Left']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Affirmative Action', 'Incentivise Affirmative Action', 'Centre']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Affirmative Action', 'Phase Out Affirmative Action', 'Right']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Affirmative Action', 'No Affirmative Action', 'Far Right']);

    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Labour Regulation', 'Unions Must Be Consulted On All Matters', 'Far Left']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Labour Regulation', 'Unions May Strike At Will', 'Left']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Labour Regulation', 'Mandatory Arbitration Before Strikes', 'Centre']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Labour Regulation', 'Strict Regulation Of Strikes', 'Right']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Labour Regulation', 'No Unions Allowed', 'Far Right']);

    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Land Reform', 'Expropriation Without Compensation', 'Far Left']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Land Reform', 'Expropriation with Compensation', 'Left']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Land Reform', 'Willing Buyer Willing Seller', 'Centre']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Land Reform', 'Redistribution of State Owned Land', 'Right']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Land Reform', 'No Expropriation', 'Far Right']);

    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Tax Of High Income Earners', '70%', 'Far Left']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Tax Of High Income Earners', '50%', 'Left']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Tax Of High Income Earners', '35%', 'Centre']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Tax Of High Income Earners', '15%', 'Right']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Tax Of High Income Earners', '0%', 'Far Right']);

    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Social Grants', 'Minimum Income For All', 'Far Left']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Social Grants', 'Relaxed Requirements To Receive Grants', 'Left']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Social Grants', 'Grants For Those In Serious Need', 'Centre']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Social Grants', 'Grants For Active Job Seekers', 'Right']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Social Grants', 'None', 'Far Right']);

    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Unemployment', 'State Jobs', 'Far Left']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Unemployment', 'State Subsidised Jobs', 'Left']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Unemployment', 'Youth Unemployment Grants', 'Centre']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Unemployment', 'Focus On Entrepreneurship', 'Right']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Unemployment', 'Focus On Economic Growth', 'Far Right']);

    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Tertiary Education', 'Free Tertiary Education', 'Far Left']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Tertiary Education', 'Publicly Funded Universities', 'Left']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Tertiary Education', 'Public and Private Universities', 'Centre']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Tertiary Education', 'Subsidised Private Universities', 'Right']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Tertiary Education', 'Private Universities', 'Far Right']);

    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Primary Education', 'Free Primary Education', 'Far Left']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Primary Education', 'Subsidised Primary Education', 'Left']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Primary Education', 'Public and Private Schools', 'Centre']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Primary Education', 'Voucher System', 'Right']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Primary Education', 'Private Schools Only', 'Far Right']);

    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['African Union', 'Establish Pan-African Government', 'Far Left']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['African Union', 'Establish Single African Currency', 'Left']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['African Union', 'Participate in AU Activities', 'Centre']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['African Union', 'Criticise Human Rights Violators', 'Right']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['African Union', 'Refuse Participation', 'Far Right']);

    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Housing', 'Free Housing', 'Far Left']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Housing', 'Subsidised State Housing', 'Left']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Housing', 'Housing Grants', 'Centre']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Housing', 'Housing Interest Rate Control', 'Right']);
    query = client.query('INSERT INTO allissues(topicName, topicDescription, topicStance) values($1,$2,$3)', ['Housing', 'No Housing Rate Control', 'Far Right']);

    query = client.query('INSERT INTO stances(stance,gauteng, freestate, kwazulunatal, limpopo, northwest, northcape, westcape, eastcape, mpumalanga, national) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)', ['Right', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

    query = client.query('INSERT INTO leaderboard(userid, score) values($1,$2)', [1, 9001]);

    query = client.query('INSERT INTO tblgauteng(userid, totalfunds, totalmanpower, totalsupport, usermanpower, usersupport, ai1manpower, ai1support, ai2manpower, ai2support, ai3manpower, ai3support, ai4manpower, ai4support, usermanpoweravailable, ai1manpoweravailable, ai2manpoweravailable, ai3manpoweravailable, ai4manpoweravailable, totalfundsavailable) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19, $20)', [1, 9001, 1000, 1000, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 9001]);
    query = client.query('INSERT INTO tbllimpopo(userid, totalfunds, totalmanpower, totalsupport, usermanpower, usersupport, ai1manpower, ai1support, ai2manpower, ai2support, ai3manpower, ai3support, ai4manpower, ai4support, usermanpoweravailable, ai1manpoweravailable, ai2manpoweravailable, ai3manpoweravailable, ai4manpoweravailable, totalfundsavailable) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19, $20)', [1, 9001, 1000, 1000, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 9001]);
    query = client.query('INSERT INTO tblnorthwest(userid, totalfunds, totalmanpower, totalsupport, usermanpower, usersupport, ai1manpower, ai1support, ai2manpower, ai2support, ai3manpower, ai3support, ai4manpower, ai4support, usermanpoweravailable, ai1manpoweravailable, ai2manpoweravailable, ai3manpoweravailable, ai4manpoweravailable, totalfundsavailable) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19, $20)', [1, 9001, 1000, 1000, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 9001]);
    query = client.query('INSERT INTO tblkwazulunatal(userid, totalfunds, totalmanpower, totalsupport, usermanpower, usersupport, ai1manpower, ai1support, ai2manpower, ai2support, ai3manpower, ai3support, ai4manpower, ai4support, usermanpoweravailable, ai1manpoweravailable, ai2manpoweravailable, ai3manpoweravailable, ai4manpoweravailable, totalfundsavailable) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19, $20)', [1, 9001, 1000, 1000, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 9001]);
    query = client.query('INSERT INTO tblwestcape(userid, totalfunds, totalmanpower, totalsupport, usermanpower, usersupport, ai1manpower, ai1support, ai2manpower, ai2support, ai3manpower, ai3support, ai4manpower, ai4support, usermanpoweravailable, ai1manpoweravailable, ai2manpoweravailable, ai3manpoweravailable, ai4manpoweravailable, totalfundsavailable) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19, $20)', [1, 9001, 1000, 1000, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 9001]);
    query = client.query('INSERT INTO tbleastcape(userid, totalfunds, totalmanpower, totalsupport, usermanpower, usersupport, ai1manpower, ai1support, ai2manpower, ai2support, ai3manpower, ai3support, ai4manpower, ai4support, usermanpoweravailable, ai1manpoweravailable, ai2manpoweravailable, ai3manpoweravailable, ai4manpoweravailable, totalfundsavailable) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19, $20)', [1, 9001, 1000, 1000, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 9001]);
    query = client.query('INSERT INTO tblnorthcape(userid, totalfunds, totalmanpower, totalsupport, usermanpower, usersupport, ai1manpower, ai1support, ai2manpower, ai2support, ai3manpower, ai3support, ai4manpower, ai4support, usermanpoweravailable, ai1manpoweravailable, ai2manpoweravailable, ai3manpoweravailable, ai4manpoweravailable, totalfundsavailable) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19, $20)', [1, 9001, 1000, 1000, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 9001]);
    query = client.query('INSERT INTO tblmpumalanga(userid, totalfunds, totalmanpower, totalsupport, usermanpower, usersupport, ai1manpower, ai1support, ai2manpower, ai2support, ai3manpower, ai3support, ai4manpower, ai4support, usermanpoweravailable, ai1manpoweravailable, ai2manpoweravailable, ai3manpoweravailable, ai4manpoweravailable, totalfundsavailable) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19, $20)', [1, 9001, 1000, 1000, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 9001]);
    query = client.query('INSERT INTO tblfreestate(userid, totalfunds, totalmanpower, totalsupport, usermanpower, usersupport, ai1manpower, ai1support, ai2manpower, ai2support, ai3manpower, ai3support, ai4manpower, ai4support, usermanpoweravailable, ai1manpoweravailable, ai2manpoweravailable, ai3manpoweravailable, ai4manpoweravailable, totalfundsavailable) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19, $20)', [1, 9001, 1000, 1000, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 9001]);

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
        console.log("finishline");
        client.end();
    });
});

module.exports = router;
