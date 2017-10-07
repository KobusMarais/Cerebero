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
        var querytext = "";
        var gautengfunds =6750000, limpopofunds = 1500000, northwestfunds = 1350000, freestatefunds = 1050000, mpumalangafunds = 1500000, kwazulufunds = 3150000, northcapefunds =450000, westcapefunds=2850000, eastcapefunds =1500000;
        var gautengpop = 12272263, limpopopop = 5404868, northwestpop =3509953, freestatepop = 2745590, mpumalangapop = 4039939, kwazulupop = 10267300, northcapepop =1145861, westcapepop= 5822734, eastcapepop =6562053;
        var gautengmanpower = 1680, limpopomanpower = 810, northwestmanpower =480, freestatemanpower =420, mpumalangamanpower = 540, kwazulumanpower = 1590, northcapemanpower =180, westcapemanpower= 780, eastcapemanpower= 1020;
        var timetoelection = 10;

        var gautengump=11, freestateump=11, northwestump=11, kznump=11, westcapeump=11, mpumaump=11, eastcapeump=11, northcapeump=11, limpopoump =11;
        var gautengusup=11, freestateusup=11, northwestusup=11, kznusup=11, westcapeusup=11, mpumausup=11, eastcapeusup=11, northcapeusup=11, limpopousup=11;

        var gautengsupai1=11, freestatesupai1=11, northwestsupai1=11, kznsupai1=11, westcapesupai1=11, mpumasupai1=11, eastcapesupai1=11, northcapesupai1=11, limpoposupai1=11;
        var gautengmpai1=11, freestatempai1=11, northwestmpai1=11, kznmpai1=11, westcapempai1=11, mpumampai1=11, eastcapempai1=11, northcapempai1 =11, limpopompai1 =11;

        var gautengmpai2=11, freestatempai2=11, northwestmpai2=11, kznmpai2=11, westcapempai2=11, mpumampai2=11, eastcapempai2=11, northcapempai2 =11, limpopompai2 =11;
        var gautengsupai2=11, freestatesupai2=11, northwestsupai2=11, kznsupai2=11, westcapesupai2=11, mpumasupai2=11, eastcapesupai2=11, northcapesupai2=11, limpoposupai2=11;

        var gautengsupai3=11, freestatesupai3=11, northwestsupai3=11, kznsupai3=11, westcapesupai3=11, mpumasupai3=11, eastcapesupai3=11, northcapesupai3=11, limpoposupai3=11;
        var gautengmpai3=11, freestatempai3=11, northwestmpai3=11, kznmpai3=11, westcapempai3=11, mpumampai3=11, eastcapempai3=11, northcapempai3 =11, limpopompai3 =11;

        var gautengmpai4=11, freestatempai4=11, northwestmpai4=11, kznmpai4=11, westcapempai4=11, mpumampai4=11, eastcapempai4=11, northcapempai4 =11, limpopompai4 =11;
        var gautengsupai4=11, freestatesupai4=11, northwestsupai4=11, kznsupai4=11, westcapesupai4=11, mpumasupai4=11, eastcapesupai4=11, northcapesupai4=11, limpoposupai4=11;


        var userstance = calculateUserStance(i);

        var ai1topics = randomizeTopics(userstance, 0);
        var ai2topics = randomizeTopics(userstance, 1);
        var ai3topics = randomizeTopics(userstance, 2);
        var ai4topics = randomizeTopics(userstance, 3);

        querytext = "INSERT INTO userprofile(userid, topic1, topic2, topic3, topic4, topic5, topic6, topic7, topic8, topic9, topic10, score, funds, time) values ('"+
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
            "','0', '0', '"+timetoelection+"');"+
           "INSERT INTO ai1(userid, topic1, topic2, topic3, topic4, topic5, topic6, topic7, topic8, topic9, topic10, funds) values ('"+accesstoken+"','"+ai1topics[0]+"','"+ai1topics[1]+"', '"+ai1topics[2]+"', '"+ai1topics[3]+"', '"+ai1topics[4]+"', '"+ai1topics[5]+"', '"+ai1topics[6]+"', '"+ai1topics[7]+"', '"+ai1topics[8]+"', '"+ai1topics[9]+"', '0');"+
             "INSERT INTO ai2(userid, topic1, topic2, topic3, topic4, topic5, topic6, topic7, topic8, topic9, topic10, funds) values ('"+accesstoken+"','"+ai2topics[0]+"','"+ai2topics[1]+"', '"+ai2topics[2]+"', '"+ai2topics[3]+"', '"+ai2topics[4]+"', '"+ai2topics[5]+"', '"+ai2topics[6]+"', '"+ai2topics[7]+"', '"+ai2topics[8]+"', '"+ai2topics[9]+"', '0');"+
             "INSERT INTO ai3(userid, topic1, topic2, topic3, topic4, topic5, topic6, topic7, topic8, topic9, topic10, funds) values ('"+accesstoken+"','"+ai3topics[0]+"','"+ai3topics[1]+"', '"+ai3topics[2]+"', '"+ai3topics[3]+"', '"+ai3topics[4]+"', '"+ai3topics[5]+"', '"+ai3topics[6]+"', '"+ai3topics[7]+"', '"+ai3topics[8]+"', '"+ai3topics[9]+"', '0');"+
             "INSERT INTO ai4(userid, topic1, topic2, topic3, topic4, topic5, topic6, topic7, topic8, topic9, topic10, funds) values ('"+accesstoken+"','"+ai4topics[0]+"','"+ai4topics[1]+"', '"+ai4topics[2]+"', '"+ai4topics[3]+"', '"+ai4topics[4]+"', '"+ai4topics[5]+"', '"+ai4topics[6]+"', '"+ai4topics[7]+"', '"+ai4topics[8]+"', '"+ai4topics[9]+"', '0');"+
             "INSERT INTO tblgauteng(userid, totalfunds, totalmanpower, totalsupport, usermanpower, usersupport, ai1manpower, ai1support, ai2manpower, ai2support, ai3manpower, ai3support, ai4manpower, ai4support, usermanpoweravailable, ai1manpoweravailable, ai2manpoweravailable, ai3manpoweravailable, ai4manpoweravailable, totalfundsavailable) values('"+accesstoken+"', '"+gautengfunds+"', '"+gautengmanpower+"', '"+gautengpop+"', '"+gautengump+"', '"+gautengusup+"', '"+gautengmpai1+"', '"+gautengsupai1+"', '"+gautengmpai2+"', '"+gautengsupai2+"', '"+gautengmpai3+"', '"+gautengsupai3+"', '"+gautengmpai4+"', '"+gautengsupai4+"', '"+gautengump+"', '"+gautengmpai1+"', '"+gautengmpai2+"', '"+gautengmpai3+"', '"+gautengmpai4+"', '"+gautengfunds+"');"+
             "INSERT INTO tbllimpopo(userid, totalfunds, totalmanpower, totalsupport, usermanpower, usersupport, ai1manpower, ai1support, ai2manpower, ai2support, ai3manpower, ai3support, ai4manpower, ai4support, usermanpoweravailable, ai1manpoweravailable, ai2manpoweravailable, ai3manpoweravailable, ai4manpoweravailable, totalfundsavailable) values('"+accesstoken+"', '"+limpopofunds+"', '"+limpopomanpower+"', '"+limpopopop+"', '"+limpopoump+"', '"+limpopousup+"', '"+limpopompai1+"', '"+limpoposupai1+"', '"+limpopompai2+"', '"+limpoposupai2+"', '"+limpopompai3+"', '"+limpoposupai3+"', '"+limpopompai4+"', '"+limpoposupai4+"', '"+limpopoump+"', '"+limpopompai1+"', '"+limpopompai2+"', '"+limpopompai3+"', '"+limpopompai4+"', '"+limpopofunds+"');"+
             "INSERT INTO tblnorthwest(userid, totalfunds, totalmanpower, totalsupport, usermanpower, usersupport, ai1manpower, ai1support, ai2manpower, ai2support, ai3manpower, ai3support, ai4manpower, ai4support, usermanpoweravailable, ai1manpoweravailable, ai2manpoweravailable, ai3manpoweravailable, ai4manpoweravailable, totalfundsavailable) values('"+accesstoken+"', '"+northwestfunds+"', '"+northwestmanpower+"', '"+northwestpop+"', '"+northwestump+"', '"+northwestusup+"', '"+northwestmpai1+"', '"+northwestsupai1+"', '"+northwestmpai2+"', '"+northwestsupai2+"', '"+northwestmpai3+"', '"+northwestsupai3+"', '"+northwestmpai4+"', '"+northwestsupai4+"', '"+northwestump+"', '"+northwestmpai1+"', '"+northwestmpai2+"', '"+northwestmpai3+"', '"+northwestmpai4+"', '"+northwestfunds+"');"+
             "INSERT INTO tblnorthcape(userid, totalfunds, totalmanpower, totalsupport, usermanpower, usersupport, ai1manpower, ai1support, ai2manpower, ai2support, ai3manpower, ai3support, ai4manpower, ai4support, usermanpoweravailable, ai1manpoweravailable, ai2manpoweravailable, ai3manpoweravailable, ai4manpoweravailable, totalfundsavailable) values('"+accesstoken+"', '"+northcapefunds+"', '"+northcapemanpower+"', '"+northcapepop+"', '"+northcapeump+"', '"+northcapeusup+"', '"+northcapempai1+"', '"+northcapesupai1+"', '"+northcapempai2+"', '"+northcapesupai2+"', '"+northcapempai3+"', '"+northcapesupai3+"', '"+northcapempai4+"', '"+northcapesupai4+"', '"+northcapeump+"', '"+northcapempai1+"', '"+northcapempai2+"', '"+northcapempai3+"', '"+northcapempai4+"', '"+northcapefunds+"');"+
             "INSERT INTO tblwestcape(userid, totalfunds, totalmanpower, totalsupport, usermanpower, usersupport, ai1manpower, ai1support, ai2manpower, ai2support, ai3manpower, ai3support, ai4manpower, ai4support, usermanpoweravailable, ai1manpoweravailable, ai2manpoweravailable, ai3manpoweravailable, ai4manpoweravailable, totalfundsavailable) values('"+accesstoken+"', '"+westcapefunds+"', '"+westcapemanpower+"', '"+westcapepop+"', '"+westcapeump+"', '"+westcapeusup+"', '"+westcapempai1+"', '"+westcapesupai1+"', '"+westcapempai2+"', '"+westcapesupai2+"', '"+westcapempai3+"', '"+westcapesupai3+"', '"+westcapempai4+"', '"+westcapesupai4+"', '"+westcapeump+"', '"+westcapempai1+"', '"+westcapempai2+"', '"+westcapempai3+"', '"+westcapempai4+"', '"+westcapefunds+"');"+
             "INSERT INTO tbleastcape(userid, totalfunds, totalmanpower, totalsupport, usermanpower, usersupport, ai1manpower, ai1support, ai2manpower, ai2support, ai3manpower, ai3support, ai4manpower, ai4support, usermanpoweravailable, ai1manpoweravailable, ai2manpoweravailable, ai3manpoweravailable, ai4manpoweravailable, totalfundsavailable) values('"+accesstoken+"', '"+eastcapefunds+"', '"+eastcapemanpower+"', '"+eastcapepop+"', '"+eastcapeump+"', '"+eastcapeusup+"', '"+eastcapempai1+"', '"+eastcapesupai1+"', '"+eastcapempai2+"', '"+eastcapesupai2+"', '"+eastcapempai3+"', '"+eastcapesupai3+"', '"+eastcapempai4+"', '"+eastcapesupai4+"', '"+eastcapeump+"', '"+eastcapempai1+"', '"+eastcapempai2+"', '"+eastcapempai3+"', '"+eastcapempai4+"', '"+eastcapefunds+"');"+
             "INSERT INTO tblkwazulunatal(userid, totalfunds, totalmanpower, totalsupport, usermanpower, usersupport, ai1manpower, ai1support, ai2manpower, ai2support, ai3manpower, ai3support, ai4manpower, ai4support, usermanpoweravailable, ai1manpoweravailable, ai2manpoweravailable, ai3manpoweravailable, ai4manpoweravailable, totalfundsavailable) values('"+accesstoken+"', '"+kwazulufunds+"', '"+kwazulumanpower+"', '"+kwazulupop+"', '"+kznump+"', '"+kznusup+"', '"+kznmpai1+"', '"+kznsupai1+"', '"+kznmpai2+"', '"+kznsupai2+"', '"+kznmpai3+"', '"+kznsupai3+"', '"+kznmpai4+"', '"+kznsupai4+"', '"+kznump+"', '"+kznmpai1+"', '"+kznmpai2+"', '"+kznmpai3+"', '"+kznmpai4+"', '"+kwazulufunds+"');"+
             "INSERT INTO tblfreestate(userid, totalfunds, totalmanpower, totalsupport, usermanpower, usersupport, ai1manpower, ai1support, ai2manpower, ai2support, ai3manpower, ai3support, ai4manpower, ai4support, usermanpoweravailable, ai1manpoweravailable, ai2manpoweravailable, ai3manpoweravailable, ai4manpoweravailable, totalfundsavailable) values('"+accesstoken+"', '"+freestatefunds+"', '"+freestatemanpower+"', '"+freestatepop+"', '"+freestateump+"', '"+freestateusup+"', '"+freestatempai1+"', '"+freestatesupai1+"', '"+freestatempai2+"', '"+freestatesupai2+"', '"+freestatempai3+"', '"+freestatesupai3+"', '"+freestatempai4+"', '"+freestatesupai4+"', '"+freestateump+"', '"+freestatempai1+"', '"+freestatempai2+"', '"+freestatempai3+"', '"+freestatempai4+"', '"+freestatefunds+"');"+
             "INSERT INTO tblmpumalanga(userid, totalfunds, totalmanpower, totalsupport, usermanpower, usersupport, ai1manpower, ai1support, ai2manpower, ai2support, ai3manpower, ai3support, ai4manpower, ai4support, usermanpoweravailable, ai1manpoweravailable, ai2manpoweravailable, ai3manpoweravailable, ai4manpoweravailable, totalfundsavailable) values('"+accesstoken+"', '"+mpumalangafunds+"', '"+mpumalangamanpower+"', '"+mpumalangapop+"', '"+mpumaump+"', '"+mpumausup+"', '"+mpumampai1+"', '"+mpumasupai1+"', '"+mpumampai2+"', '"+mpumasupai2+"', '"+mpumampai3+"', '"+mpumasupai3+"', '"+mpumampai4+"', '"+mpumasupai4+"', '"+mpumaump+"', '"+mpumampai1+"', '"+mpumampai2+"', '"+mpumampai3+"', '"+mpumampai4+"', '"+mpumalangafunds+"');";

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
            obj.score = row['score'];
            obj.success = 1;
        });
        query.on('end', () => {
            querytext = "select DISTINCT (a.ai1support + b.ai1support + c.ai1support + d.ai1support + e.ai1support + f.ai1support + g.ai1support + h.ai1support + i.ai1support) as ai1,\n" +
                "(a.ai2support + b.ai2support + c.ai2support + d.ai2support + e.ai2support + f.ai2support + g.ai2support + h.ai2support + i.ai2support) as ai2,\n" +
                "(a.ai3support + b.ai3support + c.ai3support + d.ai3support + e.ai3support + f.ai3support + g.ai3support + h.ai3support + i.ai3support) as ai3,\n" +
                "(a.ai4support + b.ai4support + c.ai4support + d.ai4support + e.ai4support + f.ai4support + g.ai4support + h.ai4support + i.ai4support) as ai4,\n" +
                "(a.usersupport + b.usersupport + c.usersupport + d.usersupport + e.usersupport + f.usersupport + g.usersupport + h.usersupport + i.usersupport) as user1,\n" +
                " a.userid\n" +
                "from tblgauteng a, tbllimpopo b, tblkwazulunatal c, tblfreestate d, tblnorthwest e, tblmpumalanga f, tblnorthcape g, tblwestcape h, tbleastcape i \n" +
                "where a.userid ='"+accesstoken+"'";
            query = client.query(querytext);
            query.on('row', (row) => {
                obj.success = calculateresult(row['ai1'], row['ai2'], row['ai3'], row['ai4'], row['user1']);
            });
            query.on('end', () => {
                    var sendback = JSON.stringify(obj);
                    client.end();
                    callback(err = null, result = sendback);
                    return sendback;
            });
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
        var querytext = "SELECT time FROM userprofile where userid ='"+accesstoken+"'";
        query = client.query(querytext);
        query.on('row', (row) => {
            timex = row['time']-1;
            if(timex < 0)
            {
                timex = 0;
            }
        });
        query.on('end', () => {
            querytext = "UPDATE userprofile SET time = '"+ timex+"' where userid ='"+accesstoken+"'";
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
function calculateresult(ai1, ai2, ai3, ai4, user)
{
    if(user > ai1 && user > ai2 && user > ai3 && user >ai4)
    {
        return 1;
    }else{
        return 0;
    }
}

function calculateUserStance(i)
{
    var farright = 0, right = 0, centre = 0, left = 0, farleft = 0;
    for(var count =0; count<10; count++)
    {
        if(i[count].stance === "right") {right++;}
        if(i[count].stance === "left") {left++;}
        if(i[count].stance === "far right") {farright++;}
        if(i[count].stance === "far left") {farleft++;}
        if(i[count].stance === "centre") {centre++;}
    }
    let ave = Math.round(((right*4)+(left*2)+(farright*5)+(farleft)+(centre*3))/10);
    let availablestances= [];
    console.log(ave);
    if(ave==1){
        availablestances.push("left");
        availablestances.push("centre");
        availablestances.push("right");
        availablestances.push("far right");
    }
    if(ave==2){
        availablestances.push("far left");
        availablestances.push("centre");
        availablestances.push("right");
        availablestances.push("far right");
    }
    if(ave==3){
        availablestances.push("left");
        availablestances.push("far left");
        availablestances.push("right");
        availablestances.push("far right");
    }
    if(ave==4){
        availablestances.push("left");
        availablestances.push("centre");
        availablestances.push("far left");
        availablestances.push("far right");
    }
    if(ave==5){
        availablestances.push("left");
        availablestances.push("centre");
        availablestances.push("right");
        availablestances.push("far left");
    }
    return availablestances;
}

function randomizeTopics(availableStances, ainum)
{
    console.log(availableStances[ainum]);
    var issues = ["crime", "symbols of history", "immigration", "racism", "firearm control", "same-sex marriage", "prostitution", "abortion", "regulation of media", "sport quotas", "drug legislation", "mining", "energy production", "affirmative action", "labour regulation", "land reform", "tax of high income earners", "social grants", "unemployment", "tertiary education", "primary education", "african union", "housing"];
    var taken = [];
    var topics = [];
    var tempo = 0;
    for(var i = 0; i <10; i++)
    {
        tempo = Math.floor(Math.random() * 23);
        while(taken.includes(tempo))
        {
            tempo = Math.floor(Math.random() * 23);
        }
        taken.push(tempo);
        topics.push(issues[tempo] + "_" + availableStances[ainum]);
    }
    return topics;
}

function extractStance(fullstr) {
    return fullstr.slice(fullstr.indexOf("_"), fullstr.length);
}