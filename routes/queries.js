const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://postgres@localhost:5432/user';
var query;

module.exports = {

    register: function (name, surname, email, username, password, callback) {
        const client = new pg.Client(connectionString);
        client.connect();
        var obj = new Object();

        var querytext = "INSERT INTO useraccounts(username, password, firstName, lastName, email) values('"+username+"', '"+password+"', '"+name+"', '"+surname+"', '"+email+"') RETURNING pkid";
        query = client.query(querytext);
        query.on('row', (row) => {
            obj.access_token = row['pkid'];
        });
        query.on('end', () => {
            var sendback = JSON.stringify(obj);
            client.end();
            callback(err=null,result=sendback);
            return sendback;
        });
    },
    login: function (username, password, callback) {
        const client = new pg.Client(connectionString);
        client.connect();
        var obj = new Object();
        obj.access_token = -1;

        var querytext = "select * from useraccounts WHERE username ='"+username+"' AND password = '"+password+"'";
        query = client.query(querytext);
        query.on('row', (row) => {
            if(username == row['username'] && password == row['password']) {
                obj.access_token = row['pkid'];
            }
        });
        query.on('end', () => {
            var sendback = JSON.stringify(obj);
            client.end();
            callback(err=null,result=sendback);
            return sendback;
        });
    },getTopic: function (accesstoken, callback) {
        const client = new pg.Client(connectionString);
        client.connect();
        var obj = new Object();

        var querytext = "select * from userprofile WHERE userid = '"+accesstoken +"'";
        query = client.query(querytext);
        query.on('row', (row) => {
            obj.topic1 = row['topic1'];
            obj.topic2 = row['topic2'];
            obj.topic3 = row['topic3'];
            obj.topic4 = row['topic4'];
            obj.topic5 = row['topic5'];
            obj.topic6 = row['topic6'];
            obj.topic7 = row['topic7'];
            obj.topic8 = row['topic8'];
            obj.topic9 = row['topic9'];
            obj.topic10 = row['topic10'];
        });
        query.on('end', () => {
            var sendback = JSON.stringify(obj);
            client.end();
            callback(err=null,result=sendback);
            return sendback;
        });
    },
    campaignProvince: function (accesstoken, province, topic, callback) {
        const client = new pg.Client(connectionString);
        client.connect();
        var obj = new Object();
        var patt = new RegExp(topic);
        var mystance = "";
        var suppercentage = 0;

        var querytext = "select * from userprofile WHERE ((topic1 LIKE '%"+topic+"%') OR (topic2 LIKE '%"+topic+"%') OR (topic3 LIKE '%"+topic+"%') OR (topic4 LIKE '%"+topic+"%') OR (topic5 LIKE '%\"+topic+\"%') OR (topic6 LIKE '%\"+topic+\"%') OR (topic7 LIKE '%\"+topic+\"%') OR (topic8 LIKE '%\"+topic+\"%') OR (topic9 LIKE '%\"+topic+\"%') OR (topic10 LIKE '%\"+topic+\"%')) AND userid = '"+accesstoken+"'";
        query = client.query(querytext);
        query.on('row', (row) => {
            if(patt.test(row['topic1'])){mystance = extractStance(row['topic1'])}
            if(patt.test(row['topic2'])){mystance = extractStance(row['topic2'])}
            if(patt.test(row['topic3'])){mystance = extractStance(row['topic3'])}
            if(patt.test(row['topic4'])){mystance = extractStance(row['topic4'])}
            if(patt.test(row['topic5'])){mystance = extractStance(row['topic5'])}
            if(patt.test(row['topic6'])){mystance = extractStance(row['topic6'])}
            if(patt.test(row['topic7'])){mystance = extractStance(row['topic7'])}
            if(patt.test(row['topic8'])){mystance = extractStance(row['topic8'])}
            if(patt.test(row['topic9'])){mystance = extractStance(row['topic9'])}
            if(patt.test(row['topic10'])){mystance = extractStance(row['topic10'])}
        });
        query.on('end', () => {
            querytext = "SELECT * FROM stances WHERE stance = '"+mystance+"'";
            query = client.query(querytext);
            query.on('row', (row) => {
                switch (province) {
                    case "gauteng":
                        suppercentage = row['gauteng'];
                        break;
                    case "freestate":
                        suppercentage = row['freestate'];
                        break;
                    case "limpopo":
                        suppercentage = row['limpopo'];
                        break;
                    case "northwest":
                        suppercentage = row['northwest'];
                        break;
                    case "northcape":
                        suppercentage = row['northcape'];
                        break;
                    case "westcape":
                        suppercentage = row['westcape'];
                        break;
                    case "eastcape":
                        suppercentage = row['eastcape'];
                        break;
                    case "kwazulu-natal":
                        suppercentage = row['kwazulunatal'];
                        break;
                    case "mpumalanga":
                        suppercentage = row['mpumalanga'];
                }
            });
            query.on('end', () => {
                var sendback = JSON.stringify(obj);
                client.end();
                callback(err = null, result = sendback);
                return sendback;
            });
        });
    },
    collectFunds : function (accesstoken, province, callback) { //REDO THIS ONE
        const client = new pg.Client(connectionString);
        client.connect();
        var obj = new Object();
        obj.success = 1;
        var funds = 0;
        var querytext = "select t.totalfundsavailable as fava, f.user_funds as ufu from tblProvinces t, tblFunds f WHERE t.userId ='"+accesstoken+"' AND f.userId='"+accesstoken+"'  AND provinceName='"+province+"'";
        query = client.query(querytext);
        query.on('row', (row) => {
            obj.funds = row['fava'];
            funds = row['ufu'] + obj.funds;
        });
        query.on('end', () => {
            querytext = "UPDATE tblProvinces SET totalfundsAvailable = 0 WHERE userId = '"+accesstoken+"' AND provinceName = '"+province+"';";
            query = client.query(querytext);
            query.on('end', () => {
                //console.log("it c);
                querytext = "UPDATE tblFunds SET user_funds  = '"+ funds +"' WHERE userId = '"+accesstoken+"';";
                query = client.query(querytext);
                query.on('end', () => {

                    obj.AI1Move = "Collect Funds Gauteng";
                    obj.AI2Move = "Campaign Limpopo";
                    obj.AI3Move = "Campaign Western Cape";
                    obj.AI4Move = "Collect Funds Freestate";
                    var sendback = JSON.stringify(obj);
                    client.end();
                    callback(err = null, result = sendback);
                    return sendback;
                });
            });
        });
    },
    getFunds : function (accesstoken, callback) { //REDO THIS ONE
        const client = new pg.Client(connectionString);
        client.connect();
        var obj = new Object();
        var querytext = "select * from userprofile WHERE userId ='"+accesstoken+"'";
        query = client.query(querytext);
        query.on('row', (row) => {
                obj.funds = row['funds'];
        });
        query.on('end', () => {
            var sendback = JSON.stringify(obj);
            client.end();
            callback(err=null,result=sendback);
            return sendback;
        });
    },
    getProfile: function (accesstoken, callback) {
        const client = new pg.Client(connectionString);
        client.connect();
        var obj = new Object();
        var querytext = "select * from useraccounts where pkid ='"+accesstoken+"'";
        query = client.query(querytext);
        query.on('row', (row) => {
            obj.name = row['firstname'];
            obj.surname = row['lastname'];
            obj.email = row['email'];
            obj.username = row['username'];
        });
        query.on('end', () => {
            var sendback = JSON.stringify(obj);
            client.end();
            callback(err=null,result=sendback);
            return sendback;
        });
    },
    getManpower: function (accesstoken, callback) {
        const client = new pg.Client(connectionString);
        client.connect();
        var obj = new Object();
        var querytext = "select a.usermanpoweravailable as gauteng, b.usermanpoweravailable as limpopo, c.usermanpoweravailable as freestate, d.usermanpoweravailable as kwazulunatal, e.usermanpoweravailable as mpumalanga, f.usermanpoweravailable as northwest, g.usermanpoweravailable as northcape, h.usermanpoweravailable as westcape, i.usermanpoweravailable as eastcape\n" +
            "from tblgauteng a, tbllimpopo b, tblfreestate c, tblkwazulunatal d, tblmpumalanga e, tblnorthwest f, tblnorthcape g, tblwestcape h, tbleastcape i\n" +
            "where a.userid = '"+accesstoken+"' AND b.userid='"+accesstoken+"' AND c.userid='"+accesstoken+"' AND d.userid='"+accesstoken+"' AND e.userid='"+accesstoken+"' AND f.userid='"+accesstoken+"' AND g.userid='"+accesstoken+"'AND h.userid='"+accesstoken+"'AND i.userid='"+accesstoken+"' ";
        query = client.query(querytext);
        query.on('row', (row) => {
            obj.gauteng = row['gauteng'];
            obj.limpopo = row['limpopo'];
            obj.northwest = row['northwest'];
            obj.westcape = row['westcape'];
            obj.eastcape = row['eastcape'];
            obj.northcape = row['northcape'];
            obj.freestate = row['freestate'];
            obj.mpumalanga = row['mpumalanga'];
            obj.kwazulunatal = row['kwazulunatal'];
        });
        query.on('end', () => {
            if(!obj.gauteng)
            {
                obj = new Object();
                obj.success = 0;
            }
            var sendback = JSON.stringify(obj);
            client.end();
            callback(err=null,result=sendback);
            return sendback;
        });
    }, getSupport: function (accesstoken, callback) {
        const client = new pg.Client(connectionString);
        client.connect();
        var obj = new Object();
        var province = "gauteng";
        var querytext = "select (a.usersupport + b.usersupport + c.usersupport + d.usersupport + e.usersupport + f.usersupport + g.usersupport + h.usersupport + i.usersupport ) as total from tblgauteng a, tbllimpopo b, tblmpumalanga c, tblkwazulunatal d, tblnorthwest e, tblnorthcape f, tblwestcape g, tbleastcape h, tblfreestate i where a.userId ='"+accesstoken+"' AND b.userId = '"+accesstoken+"' AND c.userId ='"+accesstoken+"' AND d.userId = '"+accesstoken+"' AND e.userId = '"+accesstoken+"' AND f.userId = '"+accesstoken+"' AND g.userId = '"+accesstoken+"' AND h.userId = '"+accesstoken+"' AND i.userId = '"+accesstoken+"'";
        query = client.query(querytext);
        query.on('row', (row) => {
            obj.support = row['total'];
        });
        query.on('end', () => {
            if(!obj.support)
            {
                obj.success = 0;
            }
            var sendback = JSON.stringify(obj);
            client.end();
            callback(err=null,result=sendback);
            return sendback;
        });
    },startGame: function (accesstoken, callback) { //REDO THIS ONE
        const client = new pg.Client(connectionString);
        client.connect();
        var obj = new Object();

        var starterFunds = 0;
        var aiStarterFunds = [200,200,200,200];
        var time = 10;
        var starterManpower = 9000;
        var querytext = "select u.username, (a.usersupport + b.usersupport + c.usersupport + d.usersupport + e.usersupport + f.usersupport + g.usersupport + h.usersupport + i.usersupport ) as total \n" +
            "from tblgauteng a, tbllimpopo b, tblmpumalanga c, tblkwazulunatal d, tblnorthwest e, tblnorthcape f, tblwestcape g, tbleastcape h, tblfreestate i, useraccounts u\n" +
            "WHERE u.pkid = '"+accesstoken+"' AND b.userid=u.pkid AND c.userid = u.pkid AND d.userid = u.pkid AND e.userid = u.pkid AND f.userid = u.pkid AND g.userid = u.pkid AND h.userid = u.pkid AND i.userid = u.pkid ";

        query = client.query(querytext);
        query.on('row', (row) => {
                obj.Username = row['username'];
                obj.Funds = starterFunds;
                obj.TotalSupport = row['total'];
                obj.Weeks = time;
                obj.AI1 = "First party";
                obj.AI2 = "Second party";
                obj.AI3 = "Third party";
                obj.AI4 = "Fourth party";
        });
        query.on('end', () => {
            if(!obj.Username)
            {
                obj = new Object();
                obj.success = 0;
            }
            var sendback = JSON.stringify(obj);
            client.end();
            callback(err=null,result=sendback);
            return sendback;
        });
    },
    setIssues: function (accesstoken, i ,callback) {
        const client = new pg.Client(connectionString);
        client.connect();
        var obj = new Object();
        var gautengfunds =6750000, limpopofunds = 1500000, northwestfunds = 1350000, freestatefunds = 1050000, mpumalangafunds = 1500000, kwazulufunds = 3150000, northcapefunds =450000, westcapefunds=2850000, eastcapefunds =1500000;
        var gautengpop = 12272263, limpopopop = 5404868, northwestpop =3509953, freestatepop = 2745590, mpumalangapop = 4039939, kwazulupop = 10267300, northcapepop =1145861, westcapepop= 5822734, eastcapepop =6562053;
        var gautengmanpower = 1680, limpopomanpower = 810, northwestmanpower =480, freestatemanpower =420, mpumalangamanpower = 540, kwazulumanpower = 1590, northcapemanpower =180, westcapemanpower= 780, eastcapemanpower= 1020;


        var querytext = "INSERT INTO userprofile(userid, topic1, topic2, topic3, topic4, topic5, topic6, topic7, topic8, topic9, topic10, score, funds) values ('"+
            accesstoken+"','"+
            i[0].issue+ "_"+i[0].stance +"', '"+
            i[1].issue+ "_"+i[1].stance +"', '"+
            i[2].issue+ "_"+i[2].stance +"', '"+
            i[3].issue+ "_"+i[3].stance +"', '"+
            i[4].issue+ "_"+i[4].stance +"', '"+
            i[5].issue+ "_"+i[5].stance +"', '"+
            i[6].issue+ "_"+i[6].stance +"', '"+
            i[7].issue+ "_"+i[7].stance +"', '"+
            i[8].issue+ "_"+i[8].stance +"', '"+
            i[9].issue+ "_"+i[9].stance +
            "','0', '0');"+
           "INSERT INTO ai1(userid, topic1, topic2, topic3, topic4, topic5, topic6, topic7, topic8, topic9, topic10, funds) values ('"+accesstoken+"','Crime_Right', 'Crime_Right', 'Crime_Right', 'Crime_Right', 'Crime_Right', 'Crime_Right', 'Crime_Right', 'Crime_Right', 'Crime_Right', 'Crime_Right', '0');"+
             "INSERT INTO ai2(userid, topic1, topic2, topic3, topic4, topic5, topic6, topic7, topic8, topic9, topic10, funds) values ('"+accesstoken+"','Crime_Right', 'Crime_Right', 'Crime_Right', 'Crime_Right', 'Crime_Right', 'Crime_Right', 'Crime_Right', 'Crime_Right', 'Crime_Right', 'Crime_Right', '0');"+
             "INSERT INTO ai3(userid, topic1, topic2, topic3, topic4, topic5, topic6, topic7, topic8, topic9, topic10, funds) values ('"+accesstoken+"','Crime_Right', 'Crime_Right', 'Crime_Right', 'Crime_Right', 'Crime_Right', 'Crime_Right', 'Crime_Right', 'Crime_Right', 'Crime_Right', 'Crime_Right', '0');"+
             "INSERT INTO ai4(userid, topic1, topic2, topic3, topic4, topic5, topic6, topic7, topic8, topic9, topic10, funds) values ('"+accesstoken+"','Crime_Right', 'Crime_Right', 'Crime_Right', 'Crime_Right', 'Crime_Right', 'Crime_Right', 'Crime_Right', 'Crime_Right', 'Crime_Right', 'Crime_Right', '0');"+
             "INSERT INTO tblgauteng(userid, totalfunds, totalmanpower, totalsupport, usermanpower, usersupport, ai1manpower, ai1support, ai2manpower, ai2support, ai3manpower, ai3support, ai4manpower, ai4support, usermanpoweravailable, ai1manpoweravailable, ai2manpoweravailable, ai3manpoweravailable, ai4manpoweravailable, totalfundsavailable) values('"+accesstoken+"', '"+gautengfunds+"', '"+gautengmanpower+"', '"+gautengpop+"', 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, '"+gautengfunds+"');"+
             "INSERT INTO tbllimpopo(userid, totalfunds, totalmanpower, totalsupport, usermanpower, usersupport, ai1manpower, ai1support, ai2manpower, ai2support, ai3manpower, ai3support, ai4manpower, ai4support, usermanpoweravailable, ai1manpoweravailable, ai2manpoweravailable, ai3manpoweravailable, ai4manpoweravailable, totalfundsavailable) values('"+accesstoken+"', '"+limpopofunds+"', '"+limpopomanpower+"', '"+limpopopop+"', 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, '"+limpopofunds+"');"+
             "INSERT INTO tblnorthwest(userid, totalfunds, totalmanpower, totalsupport, usermanpower, usersupport, ai1manpower, ai1support, ai2manpower, ai2support, ai3manpower, ai3support, ai4manpower, ai4support, usermanpoweravailable, ai1manpoweravailable, ai2manpoweravailable, ai3manpoweravailable, ai4manpoweravailable, totalfundsavailable) values('"+accesstoken+"', '"+northwestfunds+"', '"+northwestmanpower+"', '"+northwestpop+"', 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, '"+northwestfunds+"');"+
             "INSERT INTO tblnorthcape(userid, totalfunds, totalmanpower, totalsupport, usermanpower, usersupport, ai1manpower, ai1support, ai2manpower, ai2support, ai3manpower, ai3support, ai4manpower, ai4support, usermanpoweravailable, ai1manpoweravailable, ai2manpoweravailable, ai3manpoweravailable, ai4manpoweravailable, totalfundsavailable) values('"+accesstoken+"', '"+northcapefunds+"', '"+northcapemanpower+"', '"+northcapepop+"', 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, '"+northcapefunds+"');"+
             "INSERT INTO tblwestcape(userid, totalfunds, totalmanpower, totalsupport, usermanpower, usersupport, ai1manpower, ai1support, ai2manpower, ai2support, ai3manpower, ai3support, ai4manpower, ai4support, usermanpoweravailable, ai1manpoweravailable, ai2manpoweravailable, ai3manpoweravailable, ai4manpoweravailable, totalfundsavailable) values('"+accesstoken+"', '"+westcapefunds+"', '"+westcapemanpower+"', '"+westcapepop+"', 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, '"+westcapefunds+"');"+
             "INSERT INTO tbleastcape(userid, totalfunds, totalmanpower, totalsupport, usermanpower, usersupport, ai1manpower, ai1support, ai2manpower, ai2support, ai3manpower, ai3support, ai4manpower, ai4support, usermanpoweravailable, ai1manpoweravailable, ai2manpoweravailable, ai3manpoweravailable, ai4manpoweravailable, totalfundsavailable) values('"+accesstoken+"', '"+eastcapefunds+"', '"+eastcapemanpower+"', '"+eastcapepop+"', 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, '"+eastcapefunds+"');"+
             "INSERT INTO tblkwazulunatal(userid, totalfunds, totalmanpower, totalsupport, usermanpower, usersupport, ai1manpower, ai1support, ai2manpower, ai2support, ai3manpower, ai3support, ai4manpower, ai4support, usermanpoweravailable, ai1manpoweravailable, ai2manpoweravailable, ai3manpoweravailable, ai4manpoweravailable, totalfundsavailable) values('"+accesstoken+"', '"+kwazulufunds+"', '"+kwazulumanpower+"', '"+kwazulupop+"', 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, '"+kwazulufunds+"');"+
             "INSERT INTO tblfreestate(userid, totalfunds, totalmanpower, totalsupport, usermanpower, usersupport, ai1manpower, ai1support, ai2manpower, ai2support, ai3manpower, ai3support, ai4manpower, ai4support, usermanpoweravailable, ai1manpoweravailable, ai2manpoweravailable, ai3manpoweravailable, ai4manpoweravailable, totalfundsavailable) values('"+accesstoken+"', '"+freestatefunds+"', '"+freestatemanpower+"', '"+freestatepop+"', 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, '"+freestatefunds+"');"+
             "INSERT INTO tblmpumalanga(userid, totalfunds, totalmanpower, totalsupport, usermanpower, usersupport, ai1manpower, ai1support, ai2manpower, ai2support, ai3manpower, ai3support, ai4manpower, ai4support, usermanpoweravailable, ai1manpoweravailable, ai2manpoweravailable, ai3manpoweravailable, ai4manpoweravailable, totalfundsavailable) values('"+accesstoken+"', '"+mpumalangafunds+"', '"+mpumalangamanpower+"', '"+mpumalangapop+"', 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, '"+mpumalangafunds+"');";

        query = client.query(querytext);
        query.on('error', function(err) {
            console.log('Query error: ' + err);
        });
        query.on('end', () => {
            obj.success = 1;
            var sendback = JSON.stringify(obj);
            client.end();
            callback(err=null,result=sendback);
            return sendback;
        });
    },endResult: function (accesstoken, callback) {
        const client = new pg.Client(connectionString);
        client.connect();
        var obj = new Object();
        var querytext = "select * from userProfile where userId ='"+accesstoken+"'";
        query = client.query(querytext);
        query.on('row', (row) => {
            obj.success = 1;
            obj.score = row['score'];
        });
        query.on('end', () => {
            var sendback = JSON.stringify(obj);
            client.end();
            callback(err=null,result=sendback);
            return sendback;
        });
    },
    getScore: function (accesstoken, callback) {
        const client = new pg.Client(connectionString);
        client.connect();
        var obj = new Object();
        var querytext = "select * from userprofile where userId ='"+accesstoken+"'";
        query = client.query(querytext);
        query.on('row', (row) => {
            obj.score = row['score'];
        });
        query.on('end', () => {
            var sendback = JSON.stringify(obj);
            client.end();
            callback(err=null,result=sendback);
            return sendback;
        });
    },
    getHighscoreBoard: function (callback) {
        const client = new pg.Client(connectionString);
        client.connect();
        var obj = new Object();
        var overall = [];
        querytext = "SELECT b.userid, 1+(SELECT count(*) from leaderboard a WHERE a.score > b.score) as rank, b.score, u.username FROM leaderboard b, useraccounts u WHERE b.userid = u.pkid ORDER BY rank";
        query = client.query(querytext);
        query.on('row', (row) => {
            if (row['rank'] <= 10 ) {
                obj = new Object();
                obj.name = row['username'];
                obj.score = row['score'];
                obj.position = row['rank'];
                overall.push(obj);
            }
        });
        query.on('end', () => {
            var sendback = JSON.stringify(overall);
            client.end();
            callback(err=null,result=sendback);
            return sendback;
        });
    },
    endTurn: function (accesstoken, callback) { //REDO THIS ONE
        const client = new pg.Client(connectionString);
        client.connect();
        var obj = new Object();
        var timex;
        var querytext = "SELECT * FROM tblFunds where userId ='"+accesstoken+"'";
        query = client.query(querytext);
        query.on('row', (row) => {
            timex = row['time']-1;
        });
        query.on('end', () => {
            querytext = "UPDATE tblFunds SET time = '"+ timex+"' where userId ='"+accesstoken+"'";
            query = client.query(querytext);
            query.on('end', () => {
                obj.Weeks = timex;
                var sendback = JSON.stringify(obj);
                client.end();
                callback(err=null,result=sendback);
                return sendback;
            });
        });
    },
    getFundsProvince : function (accesstoken, callback) { //REDO THIS ONE
        const client = new pg.Client(connectionString);
        client.connect();
        var obj, obj1, obj2, obj3, obj4, obj5, obj6, obj7, obj8 = new Object();
        var overall = [];
        var querytext = "select a.totalfundsavailable as gauteng, b.totalfundsavailable as limpopo, c.totalfundsavailable as kwazulunatal, d.totalfundsavailable as westcape, e.totalfundsavailable as eastcape, f.totalfundsavailable as northcape, g.totalfundsavailable as mpumalanga, h.totalfundsavailable as northwest, i.totalfundsavailable as freestate \n" +
            "from tblgauteng a, tbllimpopo b, tblkwazulunatal c, tblwestcape d, tbleastcape e, tblnorthcape f,tblmpumalanga g,tblnorthwest h,tblfreestate i\n" +
            "where a.userid = '"+accesstoken+"' AND b.userid ='"+accesstoken+"' AND c.userid ='"+accesstoken+"' AND d.userid ='"+accesstoken+"'AND e.userid ='"+accesstoken+"'AND f.userid ='"+accesstoken+"'AND g.userid ='"+accesstoken+"'AND h.userid ='"+accesstoken+"'AND i.userid ='"+accesstoken+"'";
        query = client.query(querytext);
        query.on('row', (row) => {
            obj = new Object();
            obj.province = 'gauteng';
            obj.funds = row['gauteng'];
            obj1 = new Object();
            obj1.province = 'limpopo';
            obj1.funds = row['limpopo'];
            obj2 = new Object();
            obj2.province = 'kwazulu-natal';
            obj2.funds = row['kwazulunatal'];
            obj3 = new Object();
            obj3.province = 'westcape';
            obj3.funds = row['westcape'];
            obj4 = new Object();
            obj4.province = 'eastcape';
            obj4.funds = row['eastcape'];
            obj5 = new Object();
            obj5.province = 'northcape';
            obj5.funds = row['northcape'];
            obj6 = new Object();
            obj6.province = 'mpumalanga';
            obj6.funds = row['mpumalanga'];
            obj7 = new Object();
            obj7.province = 'northwest';
            obj7.funds = row['northwest'];
            obj8 = new Object();
            obj8.province = 'freestate';
            obj8.funds = row['freestate'];
            overall.push(obj);
            overall.push(obj1);
            overall.push(obj2);
            overall.push(obj3);
            overall.push(obj4);
            overall.push(obj5);
            overall.push(obj6);
            overall.push(obj7);
            overall.push(obj8);
        });
        query.on('end', () => {
            var sendback = JSON.stringify(overall);
            client.end();
            callback(err=null,result=sendback);
            return sendback;
        });
    },
    getStances: function (i, callback) {
        const client = new pg.Client(connectionString);
        client.connect();

        var overall = [];
        var mini = [];
        var obj = new Object();

        var counting =0;
        var querytext = "SELECT * FROM allissues WHERE topicname = '"+ i[0] +"' OR topicname = '" + i[1]+ "' OR topicname = '" +i[2] +  "' OR topicname = '"+ i[3] +"' OR topicname = '"+ i[4] +"' OR topicname = '"+ i[5] +"' OR topicname = '"+ i[6] +"' OR topicname = '"+ i[7] +"' OR topicname = '"+ i[8] +"' OR topicname = '"+ i[9] +"'";
        query = client.query(querytext);
            query.on('row', (row) => {
                obj = new Object();
                obj.issue = row['topicname'];
                obj.stance = row['topicstance'];
                obj.description = row['topicdescription'];
                mini.push(obj);
                counting++;
                if(counting%5 ==0)
                {
                    overall.push(mini);
                    mini = [];
                }
            });
            query.on('end', () => {
                var sendback = JSON.stringify(overall);
                client.end();

                callback(err=null,result=sendback);
                return sendback;
            });

        },
    getIssues: function (callback) {
        // whatever
        const client = new pg.Client(connectionString);
        client.connect();

        var overall = [];
        var obj = new Object();

        var querytext = "SELECT DISTINCT topicname FROM allissues";
        query = client.query(querytext);
        query.on('row', (row) => {
            obj = new Object();
            obj.topic = row['topicname'];
            overall.push(obj);
        });
        query.on('end', () => {
            var sendback = JSON.stringify(overall);
            client.end();

            callback(err=null,result=sendback);
            return sendback;
        });

    },
    endHighScore: function (accesskey, score, callback) {
        // whatever
        const client = new pg.Client(connectionString);
        client.connect();
        var overall = [];
        var querytext = "INSERT INTO leaderboard(userid, score) values("+accesskey+", "+score+")";
        query = client.query(querytext);
        var count = 0;
        query.on('end', () => {
            querytext = "SELECT b.userid, 1+(SELECT count(*) from leaderboard a WHERE a.score > b.score) as rank, b.score, u.username FROM leaderboard b, useraccounts u WHERE b.userid = u.pkid ORDER BY rank";
            query = client.query(querytext);
            query.on('row', (row) => {
                if (row['rank'] <= 10 || (row['score']== score) && (row['userid']== accesskey)) {
                    obj = new Object();
                    obj.name = row['username'];
                    obj.score = row['score'];
                    obj.position = row['rank'];
                    overall.push(obj);
                    count++;
                }
            });
            query.on('end', () => {
                if(count <11)
                {
                    querytext = "SELECT b.userid, 1+(SELECT count(*) from leaderboard a WHERE a.score > b.score) as rank, b.score, u.username FROM leaderboard b, useraccounts u WHERE b.userid = '"+accesskey+"' AND b.userid = u.pkid AND b.score='"+score+"' ORDER BY rank";
                    query = client.query(querytext);
                    query.on('row', (row) => {
                        obj = new Object();
                        obj.name = row['username'];
                        obj.score = row['score'];
                        obj.position = row['rank'];
                        overall.push(obj);
                    });
                    query.on('end', () => {
                        var sendback = JSON.stringify(overall);
                        client.end();
                        callback(err=null,result=sendback);
                        return sendback;
                    });
                }
                else
                {
                    var sendback = JSON.stringify(overall);
                    client.end();
                    callback(err = null, result = sendback);
                    return sendback;
                }
            });
        });
    }
};

function extractStance(fullstr) {
    return fullstr.slice(fullstr.indexOf("_"), fullstr.length);
}