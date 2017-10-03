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

        var querytext = "select * from useraccounts WHERE username ='"+username+"' AND password = '"+password+"'\n";
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
    getManpower: function (accesstoken, callback) { //REDO THIS ONE
        const client = new pg.Client(connectionString);
        client.connect();
        var obj = new Object();
        var querytext = "select * from tblmanpower where userid ='"+accesstoken+"'";
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
    },getSupport: function (accesstoken,province, callback) { //REDO THIS ONE
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
    },startGame: function (accesstoken, callback) { //REDO THIS ONE
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
            "INSERT INTO tblProvinces(provinceName, totalfundsAvailable, totalManpowerAvailable, userId, totalSupportAvailable) values ('Gauteng', 90000, 15000, '"+accesstoken+"', 90000);" +
            "INSERT INTO tblProvinces(provinceName, totalfundsAvailable, totalManpowerAvailable, userId, totalSupportAvailable) values ('Freestate', 90000, 15000, '"+accesstoken+"', 80000);" +
            "INSERT INTO tblProvinces(provinceName, totalfundsAvailable, totalManpowerAvailable, userId, totalSupportAvailable) values ('West Cape', 90000, 15000, '"+accesstoken+"', 70000);" +
            "INSERT INTO tblProvinces(provinceName, totalfundsAvailable, totalManpowerAvailable, userId, totalSupportAvailable) values ('East Cape', 90000, 15000, '"+accesstoken+"', 60000);" +
            "INSERT INTO tblProvinces(provinceName, totalfundsAvailable, totalManpowerAvailable, userId, totalSupportAvailable) values ('North Cape', 90000, 15000, '"+accesstoken+"', 50000);" +
            "INSERT INTO tblProvinces(provinceName, totalfundsAvailable, totalManpowerAvailable, userId, totalSupportAvailable) values ('North West', 90000, 15000, '"+accesstoken+"', 40000);" +
            "INSERT INTO tblProvinces(provinceName, totalfundsAvailable, totalManpowerAvailable, userId, totalSupportAvailable) values ('Mpumalanga', 90000, 15000, '"+accesstoken+"', 30000);" +
            "INSERT INTO tblProvinces(provinceName, totalfundsAvailable, totalManpowerAvailable, userId, totalSupportAvailable) values ('Kwazulu-Natal', 90000, 15000, '"+accesstoken+"', 20000);" +
            "INSERT INTO tblProvinces(provinceName, totalfundsAvailable, totalManpowerAvailable, userId, totalSupportAvailable) values ('Limpopo', 90000, 15000, '"+accesstoken+"', 10000);";

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
             "INSERT INTO ai4(userid, topic1, topic2, topic3, topic4, topic5, topic6, topic7, topic8, topic9, topic10, funds) values ('"+accesstoken+"','Crime_Right', 'Crime_Right', 'Crime_Right', 'Crime_Right', 'Crime_Right', 'Crime_Right', 'Crime_Right', 'Crime_Right', 'Crime_Right', 'Crime_Right', '0');";

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