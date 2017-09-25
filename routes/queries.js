const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://postgres@localhost:5432/user';
var query;

module.exports = {

    register: function (name, surname, email, username, password, callback) {
        const client = new pg.Client(connectionString);
        client.connect();
        var obj = new Object();

        var querytext = "INSERT INTO userAccounts(username, user_password, firstName, lastName, email) values('"+username+"', '"+password+"', '"+name+"', '"+surname+"', '"+email+"') RETURNING pkid";
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

        var querytext = "select * from userAccounts WHERE username ='"+username+"' AND user_password = '"+password+"'\n";
        query = client.query(querytext);
        query.on('row', (row) => {
            if(username == row['username'] && password == row['user_password']) {
                obj.access_token = row['pkid'];
            }
        });
        query.on('end', () => {
            var sendback = JSON.stringify(obj);
            client.end();
            callback(err=null,result=sendback);
            return sendback;
        });
    },
    collectFunds : function (accesstoken, province, callback) {
        const client = new pg.Client(connectionString);
        client.connect();
        var obj = new Object();
        obj.success = 1;
        var funds = 0;
        var querytext = "select t.totalfundsavailable as fava, f.user_funds as ufu from tblProvinces t, tblFunds f WHERE t.userId ='"+accesstoken+"' AND f.userId='"+accesstoken+"'  AND provinceName='"+province+"'";
        query = client.query(querytext);
        query.on('row', (row) => {
            console.log("TESTING HERE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
            obj.funds = row['fava'];
            console.log(obj.funds);
            funds = row['ufu'] + obj.funds;
            console.log(funds);
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
    getFunds : function (accesstoken, callback) {
        const client = new pg.Client(connectionString);
        client.connect();
        var obj = new Object();
        var querytext = "select * from tblFunds WHERE userId ='"+accesstoken+"'";
        query = client.query(querytext);
        query.on('row', (row) => {
                obj.funds = row['user_funds'];
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
        var querytext = "select * from userAccounts where pkid ='"+accesstoken+"'";
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
        var querytext = "select * from tblManPower where userId ='"+accesstoken+"'";
        query = client.query(querytext);
        query.on('row', (row) => {
            obj.manpower = row['user_manpower'];
        });
        query.on('end', () => {
            var sendback = JSON.stringify(obj);
            client.end();
            callback(err=null,result=sendback);
            return sendback;
        });
    },getSupport: function (accesstoken,province, callback) {
        const client = new pg.Client(connectionString);
        client.connect();
        var obj = new Object();
        var querytext = "select * from userProfile where userId ='"+accesstoken+"'";
        query = client.query(querytext);
        query.on('row', (row) => {
            switch (province) {
                case "gauteng":
                    obj.support = row['suppgauteng'];
                    break;
                case "freestate":
                    obj.support = row['suppfreestate'];
                    break;
                case "limpopo":
                    obj.support = row['supplimpopo'];
                    break;
                case "northwest":
                    obj.support = row['suppnorthwest'];
                    break;
                case "northcape":
                    obj.support = row['suppnorthcape'];
                    break;
                case "westcape":
                    obj.support = row['suppwestcape'];
                    break;
                case "eastcape":
                    obj.support = row['suppeastcape'];
                    break;
                case "kwazulu-natal":
                    obj.support = row['suppkzn'];
                    break;
                case "mpumalanga":
                    obj.support = row['suppmpuma'];
            }
        });
        query.on('end', () => {
            var sendback = JSON.stringify(obj);
            client.end();
            callback(err=null,result=sendback);
            return sendback;
        });
    },startGame: function (accesstoken, callback) {
        const client = new pg.Client(connectionString);
        client.connect();
        var obj = new Object();

        var starterFunds = 0;
        var aiStarterFunds = [200,200,200,200];
        var time = 10;
        var starterManpower = 9000;
        var aiStarterManpower = [9000,9000,9000,9000];

        var querytext = "INSERT INTO tblFunds(userId, user_funds, ai1_funds, ai2_funds, ai3_funds, ai4_funds, time) values('"+accesstoken+"','"+starterFunds+"','"+aiStarterFunds[0]+"','"+aiStarterFunds[1]+"','"+aiStarterFunds[2]+"','"+aiStarterFunds[3]+"', '"+time+"'); " +
            "INSERT INTO tblManPower(userId, user_ManPower, ai1_ManPower, ai2_ManPower, ai3_ManPower, ai4_ManPower) values('"+accesstoken+"','"+starterManpower+"','"+aiStarterManpower[0]+"','"+aiStarterManpower[1]+"','"+aiStarterManpower[2]+"','"+aiStarterManpower[3]+"');" +
            "INSERT INTO tblProvinces(provinceName, totalfundsAvailable, totalManpowerAvailable, userId) values ('Gauteng', 90000, 15000, '"+accesstoken+"');" +
            "INSERT INTO tblProvinces(provinceName, totalfundsAvailable, totalManpowerAvailable, userId) values ('Freestate', 90000, 15000, '"+accesstoken+"');" +
            "INSERT INTO tblProvinces(provinceName, totalfundsAvailable, totalManpowerAvailable, userId) values ('West Cape', 90000, 15000, '"+accesstoken+"');" +
            "INSERT INTO tblProvinces(provinceName, totalfundsAvailable, totalManpowerAvailable, userId) values ('East Cape', 90000, 15000, '"+accesstoken+"');" +
            "INSERT INTO tblProvinces(provinceName, totalfundsAvailable, totalManpowerAvailable, userId) values ('North Cape', 90000, 15000, '"+accesstoken+"');" +
            "INSERT INTO tblProvinces(provinceName, totalfundsAvailable, totalManpowerAvailable, userId) values ('North West', 90000, 15000, '"+accesstoken+"');" +
            "INSERT INTO tblProvinces(provinceName, totalfundsAvailable, totalManpowerAvailable, userId) values ('Mpumalanga', 90000, 15000, '"+accesstoken+"');" +
            "INSERT INTO tblProvinces(provinceName, totalfundsAvailable, totalManpowerAvailable, userId) values ('Kwazulu-Natal', 90000, 15000, '"+accesstoken+"');" +
            "INSERT INTO tblProvinces(provinceName, totalfundsAvailable, totalManpowerAvailable, userId) values ('Limpopo', 90000, 15000, '"+accesstoken+"');";

        query = client.query(querytext);
        query.on('end', () => {
            querytext = "SELECT u.username, (SUM(p.suppgauteng) + SUM(p.suppfreestate) + SUM(p.suppkzn) + SUM(p.suppmpuma) + SUM(p.suppeastcape) + SUM(p.suppwestcape) + SUM(p.suppnorthcape) + SUM(p.suppnorthwest) + SUM(p.supplimpopo)) as totalsupport FROM userAccounts u, userProfile p WHERE u.pkid = '"+accesstoken+"' AND p.userid=u.pkid GROUP BY u.pkid";
            query = client.query(querytext);
            query.on('row', (row) => {
                obj.Username = row['username'];
                obj.Funds = starterFunds;
                obj.TotalSupport = row['totalsupport'];
                obj.Manpower = starterManpower;
                obj.Weeks = time;
            });
            query.on('end', () => {
                var sendback = JSON.stringify(obj);
                client.end();
                callback(err=null,result=sendback);
                return sendback;
            });
        });
    },
    setIssues: function (accesstoken, i ,callback) {
        const client = new pg.Client(connectionString);
        client.connect();
        var obj = new Object();


        var querytext = "INSERT INTO userProfile(userId, topic1, topic2, topic3, topic4, suppGauteng, suppFreestate, suppLimpopo, suppNorthWest, suppNorthCape, suppWestCape, suppEastCape, suppKZN, suppMpuma, action1, action2, action3, score) values ('"+
            accesstoken+"','"+
            i[0].issue+ "_"+i[0].stance +"', '"+
            i[1].issue+ "_"+i[1].stance +"', '"+
            i[2].issue+ "_"+i[2].stance +"', '"+
            i[3].issue+ "_"+i[3].stance +
            "', 10,10,10,10,10,10,10,10,10, '','','', '0');"+
           "INSERT INTO AI(userId, aiNum, topic1, topic2, topic3, topic4, suppGauteng, suppFreestate, suppLimpopo, suppNorthWest, suppNorthCape, suppWestCape, suppEastCape, suppKZN, suppMpuma, action1, action2, action3) values ('"+accesstoken+"',1,'Crime Right', 'Crime Right', 'Crime Right', 'Crime Right', 10,10,10,10,10,10,10,10,10, '','','');"+
             "INSERT INTO AI(userId, aiNum, topic1, topic2, topic3, topic4, suppGauteng, suppFreestate, suppLimpopo, suppNorthWest, suppNorthCape, suppWestCape, suppEastCape, suppKZN, suppMpuma, action1, action2, action3) values ('"+accesstoken+"',2,'Crime Right', 'Crime Right', 'Crime Right', 'Crime Right', 10,10,10,10,10,10,10,10,10, '','','');"+
             "INSERT INTO AI(userId, aiNum, topic1, topic2, topic3, topic4, suppGauteng, suppFreestate, suppLimpopo, suppNorthWest, suppNorthCape, suppWestCape, suppEastCape, suppKZN, suppMpuma, action1, action2, action3) values ('"+accesstoken+"',3,'Crime Right', 'Crime Right', 'Crime Right', 'Crime Right', 10,10,10,10,10,10,10,10,10, '','','');"+
             "INSERT INTO AI(userId, aiNum, topic1, topic2, topic3, topic4, suppGauteng, suppFreestate, suppLimpopo, suppNorthWest, suppNorthCape, suppWestCape, suppEastCape, suppKZN, suppMpuma, action1, action2, action3) values ('"+accesstoken+"',4,'Crime Right', 'Crime Right', 'Crime Right', 'Crime Right', 10,10,10,10,10,10,10,10,10, '','','');";

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
    },
    getScore: function (accesstoken, callback) {
        const client = new pg.Client(connectionString);
        client.connect();
        var obj = new Object();
        var querytext = "select * from userProfile where userId ='"+accesstoken+"'";
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
        querytext = "SELECT b.userid, 1+(SELECT count(*) from Leaderboard a WHERE a.score > b.score) as rank, b.score, u.username FROM Leaderboard b, userAccounts u WHERE b.userid = u.pkid ORDER BY rank";
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
    endTurn: function (accesstoken, callback) {
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
    getFundsProvince : function (accesstoken, callback) {
        const client = new pg.Client(connectionString);
        client.connect();
        var obj = new Object();
        var overall = [];
        var querytext = "select * from tblprovinces";
        query = client.query(querytext);
        query.on('row', (row) => {
            obj = new Object();
            obj.province = row['provincename'];
            obj.funds = row['totalfundsavailable'];
            overall.push(obj);
        });
        query.on('end', () => {
            var sendback = JSON.stringify(overall);
            client.end();
            callback(err=null,result=sendback);
            return sendback;
        });
    },
    getStances: function (a, b, c, d, callback) {
        const client = new pg.Client(connectionString);
        client.connect();

        var overall = [];
        var mini = [];
        var obj = new Object();

        var counting =0;
        var querytext = "SELECT * FROM allIssues WHERE topicname = '"+ a +"' OR topicname = '" + b+ "' OR topicname = '" +c +  "' OR topicname = '"+ d +"'";
        query = client.query(querytext);
            query.on('row', (row) => {
                obj = new Object();
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

        var querytext = "SELECT DISTINCT topicname FROM allIssues";
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
        var querytext = "INSERT INTO Leaderboard(userId, score) values("+accesskey+", "+score+")";
        query = client.query(querytext);
        var count = 0;
        query.on('end', () => {
            querytext = "SELECT b.userid, 1+(SELECT count(*) from Leaderboard a WHERE a.score > b.score) as rank, b.score, u.username FROM Leaderboard b, userAccounts u WHERE b.userid = u.pkid ORDER BY rank";
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
                    querytext = "SELECT b.userid, 1+(SELECT count(*) from Leaderboard a WHERE a.score > b.score) as rank, b.score, u.username FROM Leaderboard b, userAccounts u WHERE b.userid = '"+accesskey+"' AND b.userid = u.pkid AND b.score='"+score+"' ORDER BY rank";
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