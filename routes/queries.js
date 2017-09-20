const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://postgres@localhost:5432/user';
var query;
const client = new pg.Client(connectionString);
client.connect();

module.exports = {

    getStances: function (a, b, c, d) {
        console.log(a);
        console.log(b);
        console.log(c);
        console.log(d);
        var sendback = '{"stances":[';
        sendback += '{"1":[';
        var querytext = "SELECT * FROM allIssues WHERE topicname = '"+ a +"'";
        query = client.query(querytext,function (callback) {
            query.on('row', (row) => {
                sendback += "{" + '"'+row['topicstance']+'"' + " : "  +  '"'+ row['topicdescription'] + '"'+ "} , ";
                console.log(sendback);
            });
            //sendback += ']},';
            //sendback += '{"2":[';
        });

        querytext = "SELECT * FROM allIssues WHERE topicname = '"+ b +"'";
        query = client.query(querytext, function (callback) {
            query.on('row', (row) => {
                sendback += "{" + '"'+ row['topicstance'] + '"'+ " : " + '"'+ row['topicdescription'] + '"'+ "} , ";
                console.log(sendback);
            });
            function callback() {

                sendback += "]}";
                sendback += "]}";
                return sendback;
            };
            callback();
        });

    },
    bar: function () {
        // whatever
    }
};