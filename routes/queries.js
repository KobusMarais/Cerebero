const pg = require('pg');
// const connectionString = process.env.DATABASE_URL || 'postgres://postgres@localhost:5432/user';
const connectionString = process.env.DATABASE_URL || 'postgres://testUser:testTodo@localhost:5432/user';
let query;

module.exports = {

    register: function (name, surname, email, username, password, callback) {
        const client = new pg.Client(connectionString);
        client.connect();
        let obj = new Object();

        const querytext = "INSERT INTO userAccounts(username, user_password, firstName, lastName, email) values('"+username+"', '"+password+"', '"+name+"', '"+surname+"', '"+email+"') RETURNING pkid";
        query = client.query(querytext);
        query.on('row', (row) => {
            obj.access_token = row['pkid'];
        });
        query.on('end', () => {
            const sendback = JSON.stringify(obj);
            client.end();
            callback(err=null,result=sendback);
            return sendback;
        });
    },
    login: function (username, password, callback) {
        const client = new pg.Client(connectionString);
        client.connect();
        let obj = new Object();
        obj.access_token = -1;

        const querytext = "select * from userAccounts WHERE username ='"+username+"' AND user_password = '"+password+"'\n";
        query = client.query(querytext);
        query.on('row', (row) => {
            if(username === row['username'] && password === row['user_password']) {
                obj.access_token = row['pkid'];
            }
            // setUserAccessToken(obj.access_token);
        });

        query.on('end', () => {
            const sendback = JSON.stringify(obj);
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
    campaignProvince: function (accesstoken, province,action, topic, callback) {
        const client = new pg.Client(connectionString);
        client.connect();
        var obj = new Object();
        //'{"success" : "1", "support" : "3000", "AI1Move" : "Campaign Western Cape", "AI2Move" : "Collect Funds Freestate" , "AI3Move" : "Poll Limpopo", "AI4Move" : "Poll Gauteng"}'
        obj.success = 1;
        var actioneffect = 0;

        var patt = new RegExp(topic);
        var mystance = "";
        var altstances = [];
        var mainpercentage = 0;
        var sidepercentages = [];
        var usermp=0, usersup=0, ai1mp=0, ai1sup=0, ai2mp=0, ai2sup=0, ai3mp=0, ai3sup=0, ai4mp=0, ai4sup=0;
        var totalmp =0, totalsup=0;
        var supportgained = 0, manpowergained =0;
        var aisuplost = 0, aimplost = 0;
        var querytext = "select u.funds, p.totalfunds, p.totalmanpower, p.usermanpoweravailable from userprofile u, tbl"+province+" p where u.userid='"+accesstoken+"' AND p.userid ='"+accesstoken+"'";
        var campaigncostfunds = 1, campaigncostmp = 1;
        var totalmoney = 0, totalmanmoney = 0;

        if(action == "rally"){actioneffect = 1;}
        if(action == "telemarketing"){actioneffect = 0.5;}
        if(action == "socialmedia"){actioneffect = 0.25;}

        query = client.query(querytext);
        query.on('row', (row) => {
            campaigncostfunds = Math.round(row['totalfunds'] *0.12 *actioneffect);
            campaigncostmp = Math.round(row['totalmanpower'] *0.12 *actioneffect);
            totalmoney = row['funds'];
            totalmanmoney = row['usermanpoweravailable'];
        });
        query.on('end', () => {
            if(campaigncostmp > totalmanmoney || campaigncostfunds > totalmoney)
            {

                obj = new Object();
                obj.success = 2;

                var sendback = JSON.stringify(obj);
                client.end();
                callback(err = null, result = sendback);
                return sendback;
            }
            else {
                querytext = "select * from userprofile WHERE ((topic1 LIKE '%" + topic + "%') OR (topic2 LIKE '%" + topic + "%') OR (topic3 LIKE '%" + topic + "%') OR (topic4 LIKE '%" + topic + "%') OR (topic5 LIKE '%"+topic+"%') OR (topic6 LIKE '%"+topic+"%') OR (topic7 LIKE '%"+topic+"%') OR (topic8 LIKE '%"+topic+"%') OR (topic9 LIKE '%"+topic+"%') OR (topic10 LIKE '%"+topic+"%')) AND userid = '" + accesstoken + "'";
                query = client.query(querytext);
                query.on('row', (row) => {
                    if (patt.test(row['topic1'])) {
                        mystance = extractStance(row['topic1']);
                    }
                    if (patt.test(row['topic2'])) {
                        mystance = extractStance(row['topic2']);
                    }
                    if (patt.test(row['topic3'])) {
                        mystance = extractStance(row['topic3']);
                    }
                    if (patt.test(row['topic4'])) {
                        mystance = extractStance(row['topic4']);
                    }
                    if (patt.test(row['topic5'])) {
                        mystance = extractStance(row['topic5']);
                    }
                    if (patt.test(row['topic6'])) {
                        mystance = extractStance(row['topic6']);
                    }
                    if (patt.test(row['topic7'])) {
                        mystance = extractStance(row['topic7']);
                    }
                    if (patt.test(row['topic8'])) {
                        mystance = extractStance(row['topic8']);
                    }
                    if (patt.test(row['topic9'])) {
                        mystance = extractStance(row['topic9']);
                    }
                    if (patt.test(row['topic10'])) {
                        mystance = extractStance(row['topic10']);
                    }
                    altstances = getSideStances(mystance);
                });
                query.on('end', () => {
                    querytext = "SELECT * FROM stances WHERE stance = '" + mystance + "'";
                    query = client.query(querytext);
                    query.on('row', (row) => {
                        switch (province) {
                            case "gauteng":
                                mainpercentage = row['gauteng'] / 100;
                                break;
                            case "freestate":
                                mainpercentage = row['freestate'] / 100;
                                break;
                            case "limpopo":
                                mainpercentage = row['limpopo'] / 100;
                                break;
                            case "northwest":
                                mainpercentage = row['northwest'] / 100;
                                break;
                            case "northcape":
                                mainpercentage = row['northcape'] / 100;
                                break;
                            case "westcape":
                                mainpercentage = row['westcape'] / 100;
                                break;
                            case "eastcape":
                                mainpercentage = row['eastcape'] / 100;
                                break;
                            case "kwazulunatal":
                                mainpercentage = row['kwazulunatal'] / 100;
                                break;
                            case "mpumalanga":
                                mainpercentage = row['mpumalanga'] / 100;
                        }
                    });
                    query.on('end', () => {
                        if (!altstances[1]) {
                            console.log("THIS DOENST BREAK 3");
                            querytext = "SELECT * FROM stances WHERE stance = '" + altstances[0] + "'";
                        }
                        else {
                            querytext = "SELECT * FROM stances WHERE stance = '" + altstances[0] + "' OR stance = '" + altstances[1] + "'";
                        }
                        query = client.query(querytext);
                        query.on('row', (row) => {
                            switch (province) {
                                case "gauteng":
                                    sidepercentages.push(row['gauteng'] / 100);
                                    break;
                                case "freestate":
                                    sidepercentages.push(row['freestate'] / 100);
                                    break;
                                case "limpopo":
                                    sidepercentages.push(row['limpopo'] / 100);
                                    break;
                                case "northwest":
                                    sidepercentages.push(row['northwest'] / 100);
                                    break;
                                case "northcape":
                                    sidepercentages.push(row['northcape'] / 100);
                                    break;
                                case "westcape":
                                    sidepercentages.push(row['westcape'] / 100);
                                    break;
                                case "eastcape":
                                    sidepercentages.push(row['eastcape'] / 100);
                                    break;
                                case "kwazulunatal":
                                    sidepercentages.push(row['kwazulunatal'] / 100);
                                    break;
                                case "mpumalanga":
                                    sidepercentages.push(row['mpumalanga'] / 100);
                            }
                        });
                        query.on('end', () => {
                            querytext = "select * from tbl" + province + " where userid='" + accesstoken + "'";
                            query = client.query(querytext);
                            query.on('row', (row) => {
                                usermp = row['usermanpower'], usersup = row['usersupport'];
                                ai1mp = row['ai1manpower'], ai1sup = row['ai1support'];
                                ai2mp = row['ai2manpower'], ai2sup = row['ai2support'];
                                ai3mp = row['ai3manpower'], ai3sup = row['ai3support'];
                                ai4mp = row['ai4manpower'], ai4sup = row['ai4support'];
                                totalmp = row['totalmanpower'], totalsup = row['totalsupport'];
                            });

                            query.on('end', () => {
                                if (!sidepercentages[1]) {
                                    if (usersup > (((totalsup * mainpercentage) + (totalsup * sidepercentages[0])) * actioneffect)) {
                                        var sendback = JSON.stringify(obj);
                                        client.end();
                                        callback(err = null, result = sendback);
                                        return sendback;
                                    }
                                    else {
                                        obj.support = Math.round(((totalsup * mainpercentage) + (totalsup * sidepercentages[0])) * actioneffect);
                                        if ((ai1mp - (((totalmp * mainpercentage) + (totalmp * sidepercentages[0])) * actioneffect / 4)) > 0) {
                                            ai1mp -= Math.round(((totalmp * mainpercentage) + (totalmp * sidepercentages[0])) * actioneffect / 4);
                                        } else {
                                            ai1mp = 0
                                        }
                                        if ((ai2mp - (((totalmp * mainpercentage) + (totalmp * sidepercentages[0])) * actioneffect / 4)) > 0) {
                                            ai2mp -= Math.round(((totalmp * mainpercentage) + (totalmp * sidepercentages[0])) * actioneffect / 4);
                                        } else {
                                            ai2mp = 0
                                        }
                                        if ((ai3mp - (((totalmp * mainpercentage) + (totalmp * sidepercentages[0])) * actioneffect / 4)) > 0) {
                                            ai3mp -= Math.round(((totalmp * mainpercentage) + (totalmp * sidepercentages[0])) * actioneffect / 4);
                                        } else {
                                            ai3mp = 0
                                        }
                                        if ((ai4mp - (((totalmp * mainpercentage) + (totalmp * sidepercentages[0])) * actioneffect / 4)) > 0) {
                                            ai4mp -= Math.round(((totalmp * mainpercentage) + (totalmp * sidepercentages[0])) * actioneffect / 4);
                                        } else {
                                            ai4mp = 0
                                        }

                                        if ((ai1sup - (((totalsup * mainpercentage) + (totalsup * sidepercentages[0])) * actioneffect / 4)) > 0) {
                                            ai1sup -= Math.round(((totalsup * mainpercentage) + (totalsup * sidepercentages[0])) * actioneffect / 4);
                                        } else {
                                            ai1sup = 0
                                        }
                                        if ((ai2sup - (((totalsup * mainpercentage) + (totalsup * sidepercentages[0])) * actioneffect / 4)) > 0) {
                                            ai2sup -= Math.round(((totalsup * mainpercentage) + (totalsup * sidepercentages[0])) * actioneffect / 4);
                                        } else {
                                            ai2sup = 0
                                        }
                                        if ((ai3sup - (((totalsup * mainpercentage) + (totalsup * sidepercentages[0])) * actioneffect / 4)) > 0) {
                                            ai3sup -= Math.round(((totalsup * mainpercentage) + (totalsup * sidepercentages[0])) * actioneffect / 4);
                                        } else {
                                            ai3sup = 0
                                        }
                                        if ((ai4sup - (((totalsup * mainpercentage) + (totalsup * sidepercentages[0])) * actioneffect / 4)) > 0) {
                                            ai4sup -= Math.round(((totalsup * mainpercentage) + (totalsup * sidepercentages[0])) * actioneffect / 4);
                                        } else {
                                            ai4sup = 0
                                        }
                                        usersup += Math.round(((totalsup * mainpercentage) + (totalsup * sidepercentages[0])) * actioneffect);
                                        usermp += Math.round(((totalmp * mainpercentage) + (totalmp * sidepercentages[0])) * actioneffect);

                                        querytext = "UPDATE tbl" + province + " SET usermanpoweravailable = '"+(totalmanmoney - campaigncostmp)+"', usermanpower = '" + usermp + "', usersupport = '" + usersup + "', ai1manpower = '" + ai1mp + "', ai1support = '" + ai1sup + "', ai2manpower = '" + ai2mp + "', ai2support = '" + ai2sup + "', ai3manpower = '" + ai3mp + "', ai3support = '" + ai3sup + "', ai4manpower = '" + ai4mp + "', ai4support = '" + ai4sup + "' where userid = '" + accesstoken + "';"+
                                        "UPDATE userprofile set funds = '"+(totalmoney - campaigncostfunds)+"' WHERE userid = '"+accesstoken+"'";
                                        query = client.query(querytext);
                                        query.on('end', () => {
                                            obj.AI1Move = "Campaign Limpopo";
                                            obj.AI2Move = "Campaign Gauteng";
                                            obj.AI3Move = "Poll Western Cape";
                                            obj.AI4Move = "Collect Funds Eastern Cape";
                                            var sendback = JSON.stringify(obj);
                                            client.end();
                                            callback(err = null, result = sendback);
                                            return sendback;
                                        });
                                    }
                                }
                                else {
                                    if (usersup > ((totalsup * mainpercentage) + (totalsup * sidepercentages[0]) + (totalsup * sidepercentages[1]))) {
                                        obj.support = 0;
                                        obj.AI1Move = "Campaign Limpopo";
                                        obj.AI2Move = "Campaign Gauteng";
                                        obj.AI3Move = "Poll Western Cape";
                                        obj.AI4Move = "Collect Funds Eastern Cape";

                                        var sendback = JSON.stringify(obj);
                                        client.end();
                                        callback(err = null, result = sendback);
                                        return sendback;
                                    } else {
                                        obj.support = Math.round(((totalsup * mainpercentage) + (totalsup * sidepercentages[0]) + (totalsup * sidepercentages[1])) * actioneffect);
                                        if ((ai1mp - (((totalmp * mainpercentage) + (totalmp * sidepercentages[0]) + (totalsup * sidepercentages[1])) * actioneffect / 4)) > 0) {
                                            ai1mp -= Math.round(((totalmp * mainpercentage) + (totalmp * sidepercentages[0]) + (totalsup * sidepercentages[1])) * actioneffect / 4);
                                        } else {
                                            ai1mp = 0
                                        }
                                        if ((ai2mp - (((totalmp * mainpercentage) + (totalmp * sidepercentages[0]) + (totalsup * sidepercentages[1])) * actioneffect / 4)) > 0) {
                                            ai2mp -= Math.round(((totalmp * mainpercentage) + (totalmp * sidepercentages[0]) + (totalsup * sidepercentages[1])) * actioneffect / 4);
                                        } else {
                                            ai2mp = 0
                                        }
                                        if ((ai3mp - (((totalmp * mainpercentage) + (totalmp * sidepercentages[0]) + (totalsup * sidepercentages[1])) * actioneffect / 4)) > 0) {
                                            ai3mp -= Math.round(((totalmp * mainpercentage) + (totalmp * sidepercentages[0]) + (totalsup * sidepercentages[1])) * actioneffect / 4);
                                        } else {
                                            ai3mp = 0
                                        }
                                        if ((ai4mp - (((totalmp * mainpercentage) + (totalmp * sidepercentages[0]) + (totalsup * sidepercentages[1])) * actioneffect / 4)) > 0) {
                                            ai4mp -= Math.round(((totalmp * mainpercentage) + (totalmp * sidepercentages[0]) + (totalsup * sidepercentages[1])) * actioneffect / 4);
                                        } else {
                                            ai4mp = 0
                                        }

                                        if ((ai1sup - (((totalsup * mainpercentage) + (totalsup * sidepercentages[0]) + (totalsup * sidepercentages[1])) * actioneffect / 4)) > 0) {
                                            ai1sup -= Math.round(((totalsup * mainpercentage) + (totalsup * sidepercentages[0]) + (totalsup * sidepercentages[1])) * actioneffect / 4);
                                        } else {
                                            ai1sup = 0
                                        }
                                        if ((ai2sup - (((totalsup * mainpercentage) + (totalsup * sidepercentages[0]) + (totalsup * sidepercentages[1])) * actioneffect / 4)) > 0) {
                                            ai2sup -= Math.round(((totalsup * mainpercentage) + (totalsup * sidepercentages[0]) + (totalsup * sidepercentages[1])) * actioneffect / 4);
                                        } else {
                                            ai2sup = 0
                                        }
                                        if ((ai3sup - (((totalsup * mainpercentage) + (totalsup * sidepercentages[0]) + (totalsup * sidepercentages[1])) * actioneffect / 4)) > 0) {
                                            ai3sup -= Math.round(((totalsup * mainpercentage) + (totalsup * sidepercentages[0]) + (totalsup * sidepercentages[1])) * actioneffect / 4);
                                        } else {
                                            ai3sup = 0
                                        }
                                        if ((ai4sup - (((totalsup * mainpercentage) + (totalsup * sidepercentages[0]) + (totalsup * sidepercentages[1])) * actioneffect / 4)) > 0) {
                                            ai4sup -= Math.round(((totalsup * mainpercentage) + (totalsup * sidepercentages[0]) + (totalsup * sidepercentages[1])) * actioneffect / 4);
                                        } else {
                                            ai4sup = 0
                                        }

                                        usersup += Math.round(((totalsup * mainpercentage) + (totalsup * sidepercentages[0]) + (totalsup * sidepercentages[1])) * actioneffect);
                                        usermp += Math.round(((totalmp * mainpercentage) + (totalmp * sidepercentages[0]) + (totalsup * sidepercentages[1])) * actioneffect);
                                        console.log("THIS DOENST BREAK 7");
                                        querytext = "UPDATE tbl" + province + " SET usermanpoweravailable = '"+(totalmanmoney - campaigncostmp)+"', usermanpower = '" + usermp + "', usersupport = '" + usersup + "', ai1manpower = '" + ai1mp + "', ai1support = '" + ai1sup + "', ai2manpower = '" + ai2mp + "', ai2support = '" + ai2sup + "', ai3manpower = '" + ai3mp + "', ai3support = '" + ai3sup + "', ai4manpower = '" + ai4mp + "', ai4support = '" + ai4sup + "' where userid = '" + accesstoken + "';"+
                                        "UPDATE userprofile set funds = '"+(totalmoney - campaigncostfunds)+"' WHERE userid = '"+accesstoken+"'";
                                        query = client.query(querytext);
                                        query.on('end', () => {
                                            obj.AI1Move = "Campaign Limpopo";
                                            obj.AI2Move = "Campaign Gauteng";
                                            obj.AI3Move = "Poll Western Cape";
                                            obj.AI4Move = "Collect Funds Eastern Cape";
                                            var sendback = JSON.stringify(obj);
                                            client.end();
                                            callback(err = null, result = sendback);
                                            return sendback;
                                        });
                                    }
                                }
                            });
                        });
                    });
                });
            }
        });
    },
    collectFunds : function (accesstoken, province, callback) {
        const client = new pg.Client(connectionString);
        client.connect();
        var obj = new Object();
        obj.success = 1;
        var funds = 0;
        var querytext = "";
        var totalavailablefunds = 0, collectcostmp =1, availablemp =0;
        var newfunds = 0;
        var querytext = "select p.totalmanpower, p.usermanpoweravailable from tbl"+province+" p where p.userid ='"+accesstoken+"'"
        query = client.query(querytext);
        query.on('row', (row) => {
            collectcostmp = Math.round(row['totalmanpower'] *0.06);
            availablemp = (row['usermanpoweravailable']);
        });
        query.on('end', () => {
            querytext = "select (t.usersupport*100/t.totalsupport)*t.totalfundsavailable/100 as collectedfunds, t.totalfundsavailable, u.funds from tbl" + province + " t, userprofile u where t.userid = '" + accesstoken + "' AND u.userid = '" + accesstoken + "';";
            query = client.query(querytext);
            query.on('row', (row) => {
                totalavailablefunds = row['totalfundsavailable'];
                obj.funds = row['collectedfunds'];
                newfunds = totalavailablefunds - obj.funds;
                funds = row['funds'] + obj.funds;
            });
            query.on('end', () => {
                if(collectcostmp > availablemp)
                {
                    obj = new Object();
                    obj.success =2;
                    var sendback = JSON.stringify(obj);
                    client.end();
                    callback(err = null, result = sendback);
                    return sendback;
                }
                else
                {
                    querytext = "UPDATE tbl" + province + " SET totalfundsavailable = '" + newfunds + "' WHERE userid = '" + accesstoken + "';";
                    query = client.query(querytext);
                    query.on('end', () => {
                        querytext = "UPDATE userprofile SET funds  = '" + funds + "' WHERE userId = '" + accesstoken + "'; UPDATE tbl"+province+" SET usermanpoweravailable = '"+(availablemp-collectcostmp)+"'";
                        query = client.query(querytext);
                        query.on('end', () => {
                            console.log("TESTER");
                            makeAIsMove(client, accesstoken, function (err, result) {
                                console.log("TESTER1");
                                if (err) return console.log("error: ", err);
                                obj.AI1Move = result[0];
                                obj.AI2Move = result[1];
                                obj.AI3Move = result[2];
                                obj.AI4Move = result[3];
                                var sendback = JSON.stringify(obj);
                                client.end();
                                callback(err = null, result = sendback);
                                return sendback;
                            });
                        });
                    });
                }
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
    pollProvince: function(accesstoken,province, callback)
    {
        const client = new pg.Client(connectionString);
        client.connect();
        var obj = new Object();
        var pollcostmp = 0;
        var pollcostfunds = 0;
        var availablefunds = 0;
        var availablemp = 0;
        var querytext = "select u.funds, p.totalfunds, p.totalmanpower, p.usermanpoweravailable from userprofile u, tbl"+province+" p where u.userid='"+accesstoken+"' AND p.userid ='"+accesstoken+"'"
        query = client.query(querytext);
        query.on('row', (row) => {
            pollcostfunds = Math.round(row['totalfunds'] *0.03);
            pollcostmp = Math.round(row['totalmanpower'] *0.03);
            availablefunds = (row['funds']);
            availablemp = (row['usermanpoweravailable']);
        });
        query.on('end', () => {
            querytext = "select usersupport, ai1support, ai2support, ai3support, ai4support from tbl"+province+" where userid='"+accesstoken+"'";
            query = client.query(querytext);
            query.on('row', (row) => {
                obj.User = row['usersupport'];
                obj.AI1 = row['ai1support'];
                obj.AI2 = row['ai2support'];
                obj.AI3 = row['ai3support'];
                obj.AI4 = row['ai4support'];
            });
            query.on('end', () => {
                if (availablefunds < pollcostfunds || availablemp < pollcostmp) {
                    obj = new Object();
                    obj.success = 2;
                    var sendback = JSON.stringify(obj);
                    client.end();
                    callback(err = null, result = sendback);
                    return sendback;
                }
                else {
                    querytext = "update userprofile set funds= '"+(availablefunds-pollcostfunds) +"' where userid ='"+accesstoken+"'; update tbl"+province+" set usermanpoweravailable = '"+(availablemp- pollcostmp)+"' where userid = '"+accesstoken+"';";
                    query = client.query(querytext);
                    query.on('end', () => {
                        obj.AI1Move = "Poll Gauteng";
                        obj.AI2Move = "Poll Limpopo";
                        obj.AI3Move = "Collect Funds Freestate";
                        obj.AI4Move = "Campaign Western Cape";
                        var sendback = JSON.stringify(obj);
                        client.end();
                        callback(err = null, result = sendback);
                        return sendback;
                    });
                }
            });
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
    },getSupport: function (accesstoken, callback) {
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
        var tester = [];
        var starterFunds = 0;
        var aiStarterFunds = [0,0,0,0];
        var time = 10;
        var querytext = "select * from userprofile where userid ='"+accesstoken+"'";
        query = client.query(querytext);
        query.on('row', (row) => {
            FL = row['funds'];
            tester.push(extractStance(row['topic1']));
            tester.push(extractStance(row['topic2']));
            tester.push(extractStance(row['topic3']));
            tester.push(extractStance(row['topic4']));
            tester.push(extractStance(row['topic5']));
            tester.push(extractStance(row['topic6']));
            tester.push(extractStance(row['topic7']));
            tester.push(extractStance(row['topic8']));
            tester.push(extractStance(row['topic9']));
            tester.push(extractStance(row['topic10']));
        });
        query.on('end', () => {
            let aistances = calculateAIStances(tester);
            querytext = "select u.username, (a.usersupport + b.usersupport + c.usersupport + d.usersupport + e.usersupport + f.usersupport + g.usersupport + h.usersupport + i.usersupport ) as total \n" +
                "from tblgauteng a, tbllimpopo b, tblmpumalanga c, tblkwazulunatal d, tblnorthwest e, tblnorthcape f, tblwestcape g, tbleastcape h, tblfreestate i, useraccounts u\n" +
                "WHERE u.pkid = '" + accesstoken + "' AND b.userid=u.pkid AND c.userid = u.pkid AND d.userid = u.pkid AND e.userid = u.pkid AND f.userid = u.pkid AND g.userid = u.pkid AND h.userid = u.pkid AND i.userid = u.pkid ";
            query = client.query(querytext);
            query.on('row', (row) => {
                obj.Username = row['username'];
                obj.Funds = starterFunds;
                obj.TotalSupport = row['total'];
                obj.Weeks = time;
                obj.AI1 = setAIPartyName(aistances, 0);
                obj.AI2 = setAIPartyName(aistances, 1);
                obj.AI3 = setAIPartyName(aistances, 2);
                obj.AI4 = setAIPartyName(aistances, 3);
            });
            query.on('end', () => {
                if (!obj.Username) {
                    obj = new Object();
                    obj.success = 0;
                }
                var sendback = JSON.stringify(obj);
                client.end();
                callback(err = null, result = sendback);
                return sendback;
            });
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
        var gautengsupai1=-1, freestatesupai1=-1, northwestsupai1=-1, kznsupai1=-1, westcapesupai1=-1, mpumasupai1=-1, eastcapesupai1=-1, northcapesupai1=-1, limpoposupai1=-1;
        var gautengmpai1=-1, freestatempai1=-1, northwestmpai1=-1, kznmpai1=-1, westcapempai1=-1, mpumampai1=-1, eastcapempai1=-1, northcapempai1 =-1, limpopompai1 =-1;
        var gautengsupai2=-1, freestatesupai2=-1, northwestsupai2=-1, kznsupai2=-1, westcapesupai2=-1, mpumasupai2=-1, eastcapesupai2=-1, northcapesupai2=-1, limpoposupai2=-1;
        var gautengmpai2=-1, freestatempai2=-1, northwestmpai2=-1, kznmpai2=-1, westcapempai2=-1, mpumampai2=-1, eastcapempai2=-1, northcapempai2 =-1, limpopompai2 =-1;
        var gautengsupai3=-1, freestatesupai3=-1, northwestsupai3=-1, kznsupai3=-1, westcapesupai3=-1, mpumasupai3=-1, eastcapesupai3=-1, northcapesupai3=-1, limpoposupai3=-1;
        var gautengmpai3=-1, freestatempai3=-1, northwestmpai3=-1, kznmpai3=-1, westcapempai3=-1, mpumampai3=-1, eastcapempai3=-1, northcapempai3 =-1, limpopompai3 =-1;
        var gautengsupai4=-1, freestatesupai4=-1, northwestsupai4=-1, kznsupai4=-1, westcapesupai4=-1, mpumasupai4=-1, eastcapesupai4=-1, northcapesupai4=-1, limpoposupai4=-1;
        var gautengmpai4=-1, freestatempai4=-1, northwestmpai4=-1, kznmpai4=-1, westcapempai4=-1, mpumampai4=-1, eastcapempai4=-1, northcapempai4 =-1, limpopompai4 =-1;
        var gautengusup = -1, freestateusup = -1, northwestusup = -1, kznusup = -1, westcapeusup = -1, mpumausup = -1, eastcapeusup = -1, northcapeusup = -1, limpopousup = -1;
        var gautengump = -1, freestateump = -1, northwestump = -1, kznump = -1, westcapeump = -1, mpumaump = -1, eastcapeump = -1, northcapeump = -1, limpopoump = -1;


        var userstance = calculateUserStance(i);

        var ai1topics = randomizeTopics(userstance, 0);
        var ai2topics = randomizeTopics(userstance, 1);
        var ai3topics = randomizeTopics(userstance, 2);
        var ai4topics = randomizeTopics(userstance, 3);
        querytext = "select * from userprofile where userid = '"+accesstoken+"'";
        query = client.query(querytext);
        query.on('error', function(err) {
            console.log('Query error: ' + err);
        });
        query.on('row', (row) => {
           querytext = "DELETE FROM userprofile WHERE userid ='"+accesstoken+"';" +
               "DELETE FROM ai1 WHERE userid ='"+accesstoken+"';" +
               "DELETE FROM ai2 WHERE userid ='"+accesstoken+"';" +
               "DELETE FROM ai3 WHERE userid ='"+accesstoken+"';" +
               "DELETE FROM ai4 WHERE userid ='"+accesstoken+"';" +
               "DELETE FROM tbllimpopo WHERE userid ='"+accesstoken+"';" +
               "DELETE FROM tblgauteng WHERE userid ='"+accesstoken+"';" +
               "DELETE FROM tblnorthwest WHERE userid ='"+accesstoken+"';" +
               "DELETE FROM tblnorthcape WHERE userid ='"+accesstoken+"';" +
               "DELETE FROM tblwestcape WHERE userid ='"+accesstoken+"';" +
               "DELETE FROM tbleastcape WHERE userid ='"+accesstoken+"';" +
               "DELETE FROM tblmpumalanga WHERE userid ='"+accesstoken+"';" +
               "DELETE FROM tblfreestate WHERE userid ='"+accesstoken+"';" +
               "DELETE FROM tblkwazulunatal WHERE userid ='"+accesstoken+"';";
            query = client.query(querytext);

        });
        query.on('end', () => {

            querytext = "select s.stance,  (s.national * '" + gautengpop + "')/100 as gausup, (s.national * '" + gautengmanpower + "')/100 as gaump,\n" +
                "(s.national * '" + limpopopop + "')/100 as lsup, (s.national * '" + limpopomanpower + "')/100 as lmp,\n" +
                "(s.national * '" + mpumalangapop + "')/100 as mpsup, (s.national * '" + mpumalangamanpower + "')/100 as mpmp,\n" +
                "(s.national * '" + northwestpop + "')/100 as nwsup, (s.national * '" + northcapemanpower + "')/100 as nwmp,\n" +
                "(s.national * '" + westcapepop + "')/100 as wcsup, (s.national * '" + westcapemanpower + "')/100 as wcmp,\n" +
                "(s.national * '" + eastcapepop + "')/100 as ecsup, (s.national * '" + eastcapemanpower + "')/100 as ecmp,\n" +
                "(s.national * '" + northcapepop + "')/100 as ncsup, (s.national * '" + northcapemanpower + "')/100 as ncmp,\n" +
                "(s.national * '" + kwazulupop + "')/100 as kznsup, (s.national * '" + kwazulumanpower + "')/100 as kznmp,\n" +
                "(s.national * '" + freestatepop + "')/100 as fssup, (s.national * '" + freestatemanpower + "')/100 as fsmp\n" +
                "from stances s";

            query = client.query(querytext);
            query.on('error', function (err) {
                console.log('Query error: ' + err);
            });
            query.on('row', (row) => {
                if (row['stance'] === userstance[0]) {
                    gautengsupai1 = row['gausup'], freestatesupai1 = row['fssup'], northwestsupai1 = row['nwsup'], kznsupai1 = row['kznsup'], westcapesupai1 = row['wcsup'], mpumasupai1 = row['mpsup'], eastcapesupai1 = row['ecsup'], northcapesupai1 = row['ncsup'], limpoposupai1 = row['lsup'];
                    gautengmpai1 = row['gaump'], freestatempai1 = row['fsmp'], northwestmpai1 = row['nwmp'], kznmpai1 = row['kznmp'], westcapempai1 = row['wcmp'], mpumampai1 = row['mpmp'], eastcapempai1 = row['ecmp'], northcapempai1 = row['ncmp'], limpopompai1 = row['lmp'];
                }
                else if (row['stance'] === userstance[1]) {
                    gautengsupai2 = row['gausup'], freestatesupai2 = row['fssup'], northwestsupai2 = row['nwsup'], kznsupai2 = row['kznsup'], westcapesupai2 = row['wcsup'], mpumasupai2 = row['mpsup'], eastcapesupai2 = row['ecsup'], northcapesupai2 = row['ncsup'], limpoposupai2 = row['lsup'];
                    gautengmpai2 = row['gaump'], freestatempai2 = row['fsmp'], northwestmpai2 = row['nwmp'], kznmpai2 = row['kznmp'], westcapempai2 = row['wcmp'], mpumampai2 = row['mpmp'], eastcapempai2 = row['ecmp'], northcapempai2 = row['ncmp'], limpopompai2 = row['lmp'];
                }
                else if (row['stance'] === userstance[2]) {
                    gautengsupai3 = row['gausup'], freestatesupai3 = row['fssup'], northwestsupai3 = row['nwsup'], kznsupai3 = row['kznsup'], westcapesupai3 = row['wcsup'], mpumasupai3 = row['mpsup'], eastcapesupai3 = row['ecsup'], northcapesupai3 = row['ncsup'], limpoposupai3 = row['lsup'];
                    gautengmpai3 = row['gaump'], freestatempai3 = row['fsmp'], northwestmpai3 = row['nwmp'], kznmpai3 = row['kznmp'], westcapempai3 = row['wcmp'], mpumampai3 = row['mpmp'], eastcapempai3 = row['ecmp'], northcapempai3 = row['ncmp'], limpopompai3 = row['lmp'];
                }
                else if (row['stance'] === userstance[3]) {
                    gautengsupai4 = row['gausup'], freestatesupai4 = row['fssup'], northwestsupai4 = row['nwsup'], kznsupai4 = row['kznsup'], westcapesupai4 = row['wcsup'], mpumasupai4 = row['mpsup'], eastcapesupai4 = row['ecsup'], northcapesupai4 = row['ncsup'], limpoposupai4 = row['lsup'];
                    gautengmpai4 = row['gaump'], freestatempai4 = row['fsmp'], northwestmpai4 = row['nwmp'], kznmpai4 = row['kznmp'], westcapempai4 = row['wcmp'], mpumampai4 = row['mpmp'], eastcapempai4 = row['ecmp'], northcapempai4 = row['ncmp'], limpopompai4 = row['lmp'];
                } else {
                    gautengusup = row['gausup'], freestateusup = row['fssup'], northwestusup = row['nwsup'], kznusup = row['kznsup'], westcapeusup = row['wcsup'], mpumausup = row['mpsup'], eastcapeusup = row['ecsup'], northcapeusup = row['ncsup'], limpopousup = row['lsup'];
                    gautengump = row['gaump'], freestateump = row['fsmp'], northwestump = row['nwmp'], kznump = row['kznmp'], westcapeump = row['wcmp'], mpumaump = row['mpmp'], eastcapeump = row['ecmp'], northcapeump = row['ncmp'], limpopoump = row['lmp'];
                }
            });
            query.on('end', () => {
                querytext = "INSERT INTO userprofile(userid, topic1, topic2, topic3, topic4, topic5, topic6, topic7, topic8, topic9, topic10, score, funds, time) values ('" +
                    accesstoken + "','" +
                    i[0].issue + "_" + i[0].stance + "', '" +
                    i[1].issue + "_" + i[1].stance + "', '" +
                    i[2].issue + "_" + i[2].stance + "', '" +
                    i[3].issue + "_" + i[3].stance + "', '" +
                    i[4].issue + "_" + i[4].stance + "', '" +
                    i[5].issue + "_" + i[5].stance + "', '" +
                    i[6].issue + "_" + i[6].stance + "', '" +
                    i[7].issue + "_" + i[7].stance + "', '" +
                    i[8].issue + "_" + i[8].stance + "', '" +
                    i[9].issue + "_" + i[9].stance +
                    "','0', '0', '" + timetoelection + "');" +
                    "INSERT INTO ai1(userid, topic1, topic2, topic3, topic4, topic5, topic6, topic7, topic8, topic9, topic10, funds) values ('" + accesstoken + "','" + ai1topics[0] + "','" + ai1topics[1] + "', '" + ai1topics[2] + "', '" + ai1topics[3] + "', '" + ai1topics[4] + "', '" + ai1topics[5] + "', '" + ai1topics[6] + "', '" + ai1topics[7] + "', '" + ai1topics[8] + "', '" + ai1topics[9] + "', '0');" +
                    "INSERT INTO ai2(userid, topic1, topic2, topic3, topic4, topic5, topic6, topic7, topic8, topic9, topic10, funds) values ('" + accesstoken + "','" + ai2topics[0] + "','" + ai2topics[1] + "', '" + ai2topics[2] + "', '" + ai2topics[3] + "', '" + ai2topics[4] + "', '" + ai2topics[5] + "', '" + ai2topics[6] + "', '" + ai2topics[7] + "', '" + ai2topics[8] + "', '" + ai2topics[9] + "', '0');" +
                    "INSERT INTO ai3(userid, topic1, topic2, topic3, topic4, topic5, topic6, topic7, topic8, topic9, topic10, funds) values ('" + accesstoken + "','" + ai3topics[0] + "','" + ai3topics[1] + "', '" + ai3topics[2] + "', '" + ai3topics[3] + "', '" + ai3topics[4] + "', '" + ai3topics[5] + "', '" + ai3topics[6] + "', '" + ai3topics[7] + "', '" + ai3topics[8] + "', '" + ai3topics[9] + "', '0');" +
                    "INSERT INTO ai4(userid, topic1, topic2, topic3, topic4, topic5, topic6, topic7, topic8, topic9, topic10, funds) values ('" + accesstoken + "','" + ai4topics[0] + "','" + ai4topics[1] + "', '" + ai4topics[2] + "', '" + ai4topics[3] + "', '" + ai4topics[4] + "', '" + ai4topics[5] + "', '" + ai4topics[6] + "', '" + ai4topics[7] + "', '" + ai4topics[8] + "', '" + ai4topics[9] + "', '0');" +
                    "INSERT INTO tblgauteng(userid, totalfunds, totalmanpower, totalsupport, usermanpower, usersupport, ai1manpower, ai1support, ai2manpower, ai2support, ai3manpower, ai3support, ai4manpower, ai4support, usermanpoweravailable, ai1manpoweravailable, ai2manpoweravailable, ai3manpoweravailable, ai4manpoweravailable, totalfundsavailable) values('" + accesstoken + "', '" + gautengfunds + "', '" + gautengmanpower + "', '" + gautengpop + "', '" + gautengump + "', '" + gautengusup + "', '" + gautengmpai1 + "', '" + gautengsupai1 + "', '" + gautengmpai2 + "', '" + gautengsupai2 + "', '" + gautengmpai3 + "', '" + gautengsupai3 + "', '" + gautengmpai4 + "', '" + gautengsupai4 + "', '" + gautengump + "', '" + gautengmpai1 + "', '" + gautengmpai2 + "', '" + gautengmpai3 + "', '" + gautengmpai4 + "', '" + gautengfunds + "');" +
                    "INSERT INTO tbllimpopo(userid, totalfunds, totalmanpower, totalsupport, usermanpower, usersupport, ai1manpower, ai1support, ai2manpower, ai2support, ai3manpower, ai3support, ai4manpower, ai4support, usermanpoweravailable, ai1manpoweravailable, ai2manpoweravailable, ai3manpoweravailable, ai4manpoweravailable, totalfundsavailable) values('" + accesstoken + "', '" + limpopofunds + "', '" + limpopomanpower + "', '" + limpopopop + "', '" + limpopoump + "', '" + limpopousup + "', '" + limpopompai1 + "', '" + limpoposupai1 + "', '" + limpopompai2 + "', '" + limpoposupai2 + "', '" + limpopompai3 + "', '" + limpoposupai3 + "', '" + limpopompai4 + "', '" + limpoposupai4 + "', '" + limpopoump + "', '" + limpopompai1 + "', '" + limpopompai2 + "', '" + limpopompai3 + "', '" + limpopompai4 + "', '" + limpopofunds + "');" +
                    "INSERT INTO tblnorthwest(userid, totalfunds, totalmanpower, totalsupport, usermanpower, usersupport, ai1manpower, ai1support, ai2manpower, ai2support, ai3manpower, ai3support, ai4manpower, ai4support, usermanpoweravailable, ai1manpoweravailable, ai2manpoweravailable, ai3manpoweravailable, ai4manpoweravailable, totalfundsavailable) values('" + accesstoken + "', '" + northwestfunds + "', '" + northwestmanpower + "', '" + northwestpop + "', '" + northwestump + "', '" + northwestusup + "', '" + northwestmpai1 + "', '" + northwestsupai1 + "', '" + northwestmpai2 + "', '" + northwestsupai2 + "', '" + northwestmpai3 + "', '" + northwestsupai3 + "', '" + northwestmpai4 + "', '" + northwestsupai4 + "', '" + northwestump + "', '" + northwestmpai1 + "', '" + northwestmpai2 + "', '" + northwestmpai3 + "', '" + northwestmpai4 + "', '" + northwestfunds + "');" +
                    "INSERT INTO tblnorthcape(userid, totalfunds, totalmanpower, totalsupport, usermanpower, usersupport, ai1manpower, ai1support, ai2manpower, ai2support, ai3manpower, ai3support, ai4manpower, ai4support, usermanpoweravailable, ai1manpoweravailable, ai2manpoweravailable, ai3manpoweravailable, ai4manpoweravailable, totalfundsavailable) values('" + accesstoken + "', '" + northcapefunds + "', '" + northcapemanpower + "', '" + northcapepop + "', '" + northcapeump + "', '" + northcapeusup + "', '" + northcapempai1 + "', '" + northcapesupai1 + "', '" + northcapempai2 + "', '" + northcapesupai2 + "', '" + northcapempai3 + "', '" + northcapesupai3 + "', '" + northcapempai4 + "', '" + northcapesupai4 + "', '" + northcapeump + "', '" + northcapempai1 + "', '" + northcapempai2 + "', '" + northcapempai3 + "', '" + northcapempai4 + "', '" + northcapefunds + "');" +
                    "INSERT INTO tblwestcape(userid, totalfunds, totalmanpower, totalsupport, usermanpower, usersupport, ai1manpower, ai1support, ai2manpower, ai2support, ai3manpower, ai3support, ai4manpower, ai4support, usermanpoweravailable, ai1manpoweravailable, ai2manpoweravailable, ai3manpoweravailable, ai4manpoweravailable, totalfundsavailable) values('" + accesstoken + "', '" + westcapefunds + "', '" + westcapemanpower + "', '" + westcapepop + "', '" + westcapeump + "', '" + westcapeusup + "', '" + westcapempai1 + "', '" + westcapesupai1 + "', '" + westcapempai2 + "', '" + westcapesupai2 + "', '" + westcapempai3 + "', '" + westcapesupai3 + "', '" + westcapempai4 + "', '" + westcapesupai4 + "', '" + westcapeump + "', '" + westcapempai1 + "', '" + westcapempai2 + "', '" + westcapempai3 + "', '" + westcapempai4 + "', '" + westcapefunds + "');" +
                    "INSERT INTO tbleastcape(userid, totalfunds, totalmanpower, totalsupport, usermanpower, usersupport, ai1manpower, ai1support, ai2manpower, ai2support, ai3manpower, ai3support, ai4manpower, ai4support, usermanpoweravailable, ai1manpoweravailable, ai2manpoweravailable, ai3manpoweravailable, ai4manpoweravailable, totalfundsavailable) values('" + accesstoken + "', '" + eastcapefunds + "', '" + eastcapemanpower + "', '" + eastcapepop + "', '" + eastcapeump + "', '" + eastcapeusup + "', '" + eastcapempai1 + "', '" + eastcapesupai1 + "', '" + eastcapempai2 + "', '" + eastcapesupai2 + "', '" + eastcapempai3 + "', '" + eastcapesupai3 + "', '" + eastcapempai4 + "', '" + eastcapesupai4 + "', '" + eastcapeump + "', '" + eastcapempai1 + "', '" + eastcapempai2 + "', '" + eastcapempai3 + "', '" + eastcapempai4 + "', '" + eastcapefunds + "');" +
                    "INSERT INTO tblkwazulunatal(userid, totalfunds, totalmanpower, totalsupport, usermanpower, usersupport, ai1manpower, ai1support, ai2manpower, ai2support, ai3manpower, ai3support, ai4manpower, ai4support, usermanpoweravailable, ai1manpoweravailable, ai2manpoweravailable, ai3manpoweravailable, ai4manpoweravailable, totalfundsavailable) values('" + accesstoken + "', '" + kwazulufunds + "', '" + kwazulumanpower + "', '" + kwazulupop + "', '" + kznump + "', '" + kznusup + "', '" + kznmpai1 + "', '" + kznsupai1 + "', '" + kznmpai2 + "', '" + kznsupai2 + "', '" + kznmpai3 + "', '" + kznsupai3 + "', '" + kznmpai4 + "', '" + kznsupai4 + "', '" + kznump + "', '" + kznmpai1 + "', '" + kznmpai2 + "', '" + kznmpai3 + "', '" + kznmpai4 + "', '" + kwazulufunds + "');" +
                    "INSERT INTO tblfreestate(userid, totalfunds, totalmanpower, totalsupport, usermanpower, usersupport, ai1manpower, ai1support, ai2manpower, ai2support, ai3manpower, ai3support, ai4manpower, ai4support, usermanpoweravailable, ai1manpoweravailable, ai2manpoweravailable, ai3manpoweravailable, ai4manpoweravailable, totalfundsavailable) values('" + accesstoken + "', '" + freestatefunds + "', '" + freestatemanpower + "', '" + freestatepop + "', '" + freestateump + "', '" + freestateusup + "', '" + freestatempai1 + "', '" + freestatesupai1 + "', '" + freestatempai2 + "', '" + freestatesupai2 + "', '" + freestatempai3 + "', '" + freestatesupai3 + "', '" + freestatempai4 + "', '" + freestatesupai4 + "', '" + freestateump + "', '" + freestatempai1 + "', '" + freestatempai2 + "', '" + freestatempai3 + "', '" + freestatempai4 + "', '" + freestatefunds + "');" +
                    "INSERT INTO tblmpumalanga(userid, totalfunds, totalmanpower, totalsupport, usermanpower, usersupport, ai1manpower, ai1support, ai2manpower, ai2support, ai3manpower, ai3support, ai4manpower, ai4support, usermanpoweravailable, ai1manpoweravailable, ai2manpoweravailable, ai3manpoweravailable, ai4manpoweravailable, totalfundsavailable) values('" + accesstoken + "', '" + mpumalangafunds + "', '" + mpumalangamanpower + "', '" + mpumalangapop + "', '" + mpumaump + "', '" + mpumausup + "', '" + mpumampai1 + "', '" + mpumasupai1 + "', '" + mpumampai2 + "', '" + mpumasupai2 + "', '" + mpumampai3 + "', '" + mpumasupai3 + "', '" + mpumampai4 + "', '" + mpumasupai4 + "', '" + mpumaump + "', '" + mpumampai1 + "', '" + mpumampai2 + "', '" + mpumampai3 + "', '" + mpumampai4 + "', '" + mpumalangafunds + "');";

                query = client.query(querytext);
                query.on('error', function (err) {
                    console.log('Query error: ' + err);
                });
                query.on('end', () => {
                    obj.success = 1;
                    var sendback = JSON.stringify(obj);
                    client.end();
                    callback(err = null, result = sendback);
                    return sendback;
                });
            });
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
        var B, FS, P= 0, FL=0;

        var farleft =8283290 , left =23296752 , centre =11389523 , right = 6730173, farright = 2070822;
        var obj = new Object();
        var tester = [];
        var querytext = "select * from userprofile where userid ='"+accesstoken+"'";
        query = client.query(querytext);
        query.on('row', (row) => {
            FL = row['funds'];
            tester.push(extractStance(row['topic1']));
            tester.push(extractStance(row['topic2']));
            tester.push(extractStance(row['topic3']));
            tester.push(extractStance(row['topic4']));
            tester.push(extractStance(row['topic5']));
            tester.push(extractStance(row['topic6']));
            tester.push(extractStance(row['topic7']));
            tester.push(extractStance(row['topic8']));
            tester.push(extractStance(row['topic9']));
            tester.push(extractStance(row['topic10']));
        });
        query.on('end', () => {
            let userstance = calculateOverallStance(tester);
            if(userstance == "far left"){B = farleft;}
            if(userstance == "left"){B = left;}
            if(userstance == "centre"){B = centre;}
            if(userstance == "right"){B = right;}
            if(userstance == "far right"){B = farright; }
            querytext = "select (a.usersupport + b.usersupport + c.usersupport + d.usersupport + e.usersupport + f.usersupport + g.usersupport + h.usersupport + i.usersupport) as total\n" +
            "from tblgauteng a, tblnorthwest b, tblnorthcape c, tblwestcape d, tbleastcape e, tbllimpopo f, tblmpumalanga g, tblfreestate h, tblkwazulunatal i\n" +
            "where a.userid = '"+accesstoken+"' ";
            query = client.query(querytext);
            query.on('row', (row) => {
                FS = row['total'];
            });
            query.on('end', () => {
                querytext = "select a.usersupport as usergp, a.ai1support as ai1gp, a.ai2support as ai2gp, a.ai3support as ai3gp, a.ai4support as ai4gp, " +
                    "b.usersupport as usernw, b.ai1support as ai1nw, b.ai2support as ai2nw, b.ai3support as ai3nw, b.ai4support as ai4nw, " +
                    "c.usersupport as usernc, c.ai1support as ai1nc, c.ai2support as ai2nc, c.ai3support as ai3nc, c.ai4support as ai4nc, " +
                    "d.usersupport as userwc, d.ai1support as ai1wc, d.ai2support as ai2wc, d.ai3support as ai3wc, d.ai4support as ai4wc, " +
                    "e.usersupport as userec, e.ai1support as ai1ec, e.ai2support as ai2ec, e.ai3support as ai3ec, e.ai4support as ai4ec, " +
                    "f.usersupport as userl, f.ai1support as ai1l, f.ai2support as ai2l, f.ai3support as ai3l, f.ai4support as ai4l, " +
                    "g.usersupport as usermp, g.ai1support as ai1mp, g.ai2support as ai2mp, g.ai3support as ai3mp, g.ai4support as ai4mp, " +
                    "h.usersupport as userfs, h.ai1support as ai1fs, h.ai2support as ai2fs, h.ai3support as ai3fs, h.ai4support as ai4fs, " +
                    "i.usersupport as userkzn, i.ai1support as ai1kzn, i.ai2support as ai2kzn, i.ai3support as ai3kzn, i.ai4support as ai4kzn " +
                    "from tblgauteng a, tblnorthwest b, tblnorthcape c, tblwestcape d, tbleastcape e, tbllimpopo f, tblmpumalanga g, tblfreestate h, tblkwazulunatal i where a.userid = '"+accesstoken+"'";
                query = client.query(querytext);
                query.on('row', (row) => {
                    if((row['usergp'] > row['ai1gp']) && (row['usergp'] > row['ai2gp']) && (row['usergp'] > row['ai3gp']) && (row['usergp'] > row['ai4gp'])){P++;}
                    if((row['usernw'] > row['ai1nw']) && (row['usernw'] > row['ai2nw']) && (row['usernw'] > row['ai3nw']) && (row['usernw'] > row['ai4nw'])){P++;}
                    if((row['usernc'] > row['ai1nc']) && (row['usernc'] > row['ai2nc']) && (row['usernc'] > row['ai3nc']) && (row['usernc'] > row['ai4nc'])){P++;}
                    if((row['userwc'] > row['ai1wc']) && (row['userwc'] > row['ai2wc']) && (row['userwc'] > row['ai3wc']) && (row['userwc'] > row['ai4wc'])){P++;}
                    if((row['userec'] > row['ai1ec']) && (row['userec'] > row['ai2ec']) && (row['userec'] > row['ai3ec']) && (row['userec'] > row['ai4ec'])){P++;}
                    if((row['userkzn'] > row['ai1kzn']) && (row['userkzn'] > row['ai2kzn']) && (row['userkzn'] > row['ai3kzn']) && (row['userkzn'] > row['ai4kzn'])){P++;}
                    if((row['userl'] > row['ai1l']) && (row['userl'] > row['ai2l']) && (row['userl'] > row['ai3l']) && (row['userl'] > row['ai4l'])){P++;}
                    if((row['usermp'] > row['ai1mp']) && (row['usermp'] > row['ai2mp']) && (row['usermp'] > row['ai3mp']) && (row['usermp'] > row['ai4mp'])){P++;}
                    if((row['userfs'] > row['ai1fs']) && (row['userfs'] > row['ai2fs']) && (row['userfs'] > row['ai3fs']) && (row['userfs'] > row['ai4fs'])){P++;}
                });
                query.on('end', () => {
                    obj.score = Math.round((B/FS)*200+(P*10)+(FL*0.02));
                    querytext = "update userprofile set score = '"+obj.score+"' where userid='"+accesstoken+"'";
                    query = client.query(querytext);
                    query.on('end', () => {
                        var sendback = JSON.stringify(obj);
                        client.end();
                        callback(err=null,result=sendback);
                        return sendback;
                    });
                });
            });
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
        var querytext = "SELECT u.time FROM userprofile u where u.userid ='"+accesstoken+"'";
        query = client.query(querytext);
        query.on('row', (row) => {
           timex = row['time']-1;
            if(timex < 0)
            {
                timex = 0;
            }
        });
        query.on('end', () => {
            querytext = "UPDATE userprofile SET time = '"+ timex+"' where userid ='"+accesstoken+"';"+
                "UPDATE tblfreestate set usermanpoweravailable = usermanpower, ai1manpoweravailable = ai1manpower, ai2manpoweravailable = ai2manpower, ai3manpoweravailable = ai3manpower, ai4manpoweravailable = ai4manpower, totalfundsavailable = totalfunds where userid ='"+accesstoken+"';" +
                "UPDATE tblgauteng set usermanpoweravailable = usermanpower, ai1manpoweravailable = ai1manpower, ai2manpoweravailable = ai2manpower, ai3manpoweravailable = ai3manpower, ai4manpoweravailable = ai4manpower, totalfundsavailable = totalfunds where userid ='"+accesstoken+"';" +
                "UPDATE tblnorthwest set usermanpoweravailable = usermanpower, ai1manpoweravailable = ai1manpower, ai2manpoweravailable = ai2manpower, ai3manpoweravailable = ai3manpower, ai4manpoweravailable = ai4manpower, totalfundsavailable = totalfunds where userid ='"+accesstoken+"';" +
                "UPDATE tblnorthcape set usermanpoweravailable = usermanpower, ai1manpoweravailable = ai1manpower, ai2manpoweravailable = ai2manpower, ai3manpoweravailable = ai3manpower, ai4manpoweravailable = ai4manpower, totalfundsavailable = totalfunds where userid ='"+accesstoken+"';" +
                "UPDATE tblwestcape set usermanpoweravailable = usermanpower, ai1manpoweravailable = ai1manpower, ai2manpoweravailable = ai2manpower, ai3manpoweravailable = ai3manpower, ai4manpoweravailable = ai4manpower, totalfundsavailable = totalfunds where userid ='"+accesstoken+"';" +
                "UPDATE tbleastcape set usermanpoweravailable = usermanpower, ai1manpoweravailable = ai1manpower, ai2manpoweravailable = ai2manpower, ai3manpoweravailable = ai3manpower, ai4manpoweravailable = ai4manpower, totalfundsavailable = totalfunds where userid ='"+accesstoken+"';" +
                "UPDATE tblmpumalanga set usermanpoweravailable = usermanpower, ai1manpoweravailable = ai1manpower, ai2manpoweravailable = ai2manpower, ai3manpoweravailable = ai3manpower, ai4manpoweravailable = ai4manpower, totalfundsavailable = totalfunds where userid ='"+accesstoken+"';" +
                "UPDATE tblkwazulunatal set usermanpoweravailable = usermanpower, ai1manpoweravailable = ai1manpower, ai2manpoweravailable = ai2manpower, ai3manpoweravailable = ai3manpower, ai4manpoweravailable = ai4manpower, totalfundsavailable = totalfunds where userid ='"+accesstoken+"';" +
                "UPDATE tbllimpopo set usermanpoweravailable = usermanpower, ai1manpoweravailable = ai1manpower, ai2manpoweravailable = ai2manpower, ai3manpoweravailable = ai3manpower, ai4manpoweravailable = ai4manpower, totalfundsavailable = totalfunds where userid ='"+accesstoken+"';";
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
    },
    setUserAccessToken: function (newAccessToken) {
        if (typeof(Storage) !== "undefined") {
            localStorage.setItem('accessToken', newAccessToken);
        } else {
            localStorage.setItem('accessToken', -1);
        }
    },
    getUserAccessToken : function() {
        if(typeof(Storage) !== "undefined") {
            return localStorage.getItem('accessToken');
        } else {
            //document.getElementById("result").innerHTML = "Sorry, your browser does not support web storage...";
        }
    }
};
function calculateresult(ai1, ai2, ai3, ai4, user)
{
    if((user > ai1) && (user > ai2) && (user > ai3) && (user >ai4))
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
function setAIPartyName(availableStances, ainum)
{
    let farright = ["Radical Libertarian Party", "South African Anarchist Movement", "Individualist Freedom Lovers", "Gladstonian Movement", "Common Sense Party"];
    let right = ["Neo-Conservative Alliance", "Democratic Capitalist Party", "Business First Individuals First", "Federalist Front", "Christian Freedom Movement"];
    let centre = ["Conservative Congress", "South African Liberal Caucus", "Economic Youth Group", "Extreme Centrist Greens", "Economic Alliance"];
    let left = ["Progressive Workers Union", "Western Azanian Front", "African Freedom Alliance", "Free Market Reformist Party", "South African Democratic Initiative", "Ubuntu Union"];
    let farleft = ["African Communist Collective", "Marxist Coalition", "Liberal Revolutionary Army", "Anti-Capitalist Nationalists", "People’s Economic Movement"];

    console.log(availableStances[ainum] + " number : " + ainum);
    if(availableStances[ainum] == "far right"){return farright[Math.floor(Math.random() * 5)];}
    if(availableStances[ainum] == "right"){return right[Math.floor(Math.random() * 5)];}
    if(availableStances[ainum] == "centre"){return centre[Math.floor(Math.random() * 5)];}
    if(availableStances[ainum] == "left"){return left[Math.floor(Math.random() * 6)];}
    if(availableStances[ainum] == "far left"){return farleft[Math.floor(Math.random() * 5)];}
}

function randomizeTopics(availableStances, ainum)
{
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

    return fullstr.slice(fullstr.indexOf("_")+1, fullstr.length);
}
function calculateAIStances(i)
{
    var farright = 0, right = 0, centre = 0, left = 0, farleft = 0;
    for(var count =0; count<10; count++)
    {
        if(i[count] === "right") {right++;}
        if(i[count] === "left") {left++;}
        if(i[count] === "far right") {farright++;}
        if(i[count] === "far left") {farleft++;}
        if(i[count] === "centre") {centre++;}
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
function calculateOverallStance(i)
{

    var farright = 0, right = 0, centre = 0, left = 0, farleft = 0;
    for(var count =0; count<10; count++)
    {
        if(i[count] === "right") {right++;}
        if(i[count] === "left") {left++;}
        if(i[count] === "far right") {farright++;}
        if(i[count] === "far left") {farleft++;}
        if(i[count] === "centre") {centre++;}
    }
    let ave = Math.round(((right*4)+(left*2)+(farright*5)+(farleft)+(centre*3))/10);

    if(ave==1){return "far left";}
    if(ave==2){return "left";}
    if(ave==3){return "centre";}
    if(ave==4){return "right";}
    if(ave==5){return "far right";}
}
function makeAIsMove(client, accesstoken, callback) {
    var querytext = "";
    console.log("testing123");
    var ainum =1;
    var moves = [];
    if (ainum == 1) {
        querytext = "UPDATE tblgauteng SET ai" + ainum + "support = 99 WHERE userid ='" + accesstoken + "' ";
    }
    query = client.query(querytext);
    query.on('end', () => {
        moves.push("Campaign Gauteng");
        moves.push("Campaign Limpopo");
        moves.push("Campaign Western Cape");
        moves.push("Collect Funds Freestate");

        callback(err = null, result =moves);
        return "Campaign Gauteng";
    });
}

function getSideStances(mystance)
{
    var altstances = [];
    if(mystance == "right")
    {
        altstances.push("far right");
        altstances.push("centre");
    }else
    if(mystance == "far right")
    {
        altstances.push("right");
    }else
    if(mystance == "centre")
    {
        altstances.push("right");
        altstances.push("left");
    }else
    if(mystance == "left")
    {
        altstances.push("far left");
        altstances.push("centre");
    }else
    if(mystance == "far left")
    {
        altstances.push("left");
    }
    return altstances;
}
