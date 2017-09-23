const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://postgres@localhost:5432/user';
var query;
const client = new pg.Client(connectionString);
client.connect();

module.exports = {

    getStances: function (a, b, c, d, callback) {
        var sendback = '{"stances":[';
        sendback += '{"1":[{"test":"works"}';
        var querytext /*= "SELECT * FROM allIssues WHERE topicname = '"+ a +"'";
        query = client.query(querytext,function (callback) {
            query.on('row', (row) => {
                sendback += "{" + '"'+row['topicstance']+'"' + " : "  +  '"'+ row['topicdescription'] + '"'+ "} , ";
                console.log(sendback);
            });
            //sendback += ']},';
            //sendback += '{"2":[';
        });*/

        querytext = "SELECT * FROM allIssues WHERE topicname = '"+ b +"'";
        query = client.query(querytext);
            query.on('row', (row) => {
                sendback += ",{" + '"'+ row['topicstance'] + '"'+ " : " + '"'+ row['topicdescription'] + '"'+ "}";
            });
            query.on('end', () => {
                sendback += "]}";
                sendback += "]}";
                client.end();

                callback(err=null,result=sendback);
                return sendback;

            });

        },
    bar: function () {
        // whatever
    }
};