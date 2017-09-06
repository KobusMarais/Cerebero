/**
 * Created by Kobus on 2017-07-22.
 */
var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
    var spawn = require('child_process').spawn,
        py    = spawn('python', ['./AI/main.py']),
        data = ["tester" , "5" , "10" , "marais"],
        dataString = '';
    py.stdin.setEncoding('utf-8');

    //reads data received
    py.stdout.on('data', function(bata){
        dataString += bata.toString();
    });

    //outputs data received when script ends
    py.stdout.on('end', function(){
        console.log('Sum of numbers=',dataString);
        res.send(dataString);
    });
    //py.stdin.write();
    //writes data to script
    py.stdin.write(JSON.stringify(data));
    py.stdin.end();

});

module.exports = router;