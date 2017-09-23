const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://postgres@localhost:5432/user';
var query;
const client = new pg.Client(connectionString);
client.connect();

module.exports = {
    getStances: function (a, b, c, d, callback) {
        const client = new pg.Client(connectionString);
        client.connect();

        var overall = [];
        var mini = [];
        var obj = new Object();

        var text = JSON.stringify(overall);
        var counting =0;
        var querytext = "SELECT * FROM allIssues WHERE topicname = '"+ a +"' OR topicname = '" + b+ "' OR topicname = '" +c +  "' OR topicname = '"+ d +"'";
        query = client.query(querytext);
            query.on('row', (row) => {
                //sendback += ",{" + '"'+ row['topicstance'] + '"'+ " : " + '"'+ row['topicdescription'] + '"'+ "}";
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
                console.log(sendback);
                client.end();

                callback(err=null,result=sendback);
                return sendback;

            });

        },
    bar: function () {
        // whatever
    }
};