/**
 * Created by Kobus on 2017-07-22.
 */
var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
    var spawn = require('child_process').spawn,
        py    = spawn('python', ['./AI/main.py']),
        data = [1,2,3,4,5,6,7,8,9],
        dataString = '';

    py.stdout.on('data', function(data){
        dataString += data.toString();
    });
    py.stdout.on('end', function(){
        console.log('Sum of numbers=',dataString);
        res.send(dataString);
    });
    py.stdin.write(JSON.stringify(data));
    py.stdin.end();
});

module.exports = router;