const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://postgres@localhost:5432/user';
var query;

module.exports = {

    register: function (name, surname, email, username, password, callback) {
        const client = new pg.Client(connectionString);
        client.connect();
        var overall = [];
        var obj = new Object();

        var querytext = "INSERT INTO userAccounts(username, user_password, firstName, lastName, email) values('"+username+"', '"+password+"', '"+name+"', '"+surname+"', '"+email+"') RETURNING pkid";
        query = client.query(querytext);
        query.on('row', (row) => {
            obj.access_token = row['pkid'];
            console.log(row['pkid']);
        });
        query.on('end', () => {
            console.log("THIS IS THE EEND");
            var sendback = JSON.stringify(obj);
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
                }
            });
            query.on('end', () => {
                var sendback = JSON.stringify(overall);
                client.end();
                callback(err=null,result=sendback);
                return sendback;
            });
        });
    }
};