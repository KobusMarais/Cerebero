var express = require('express');
var router = express.Router();

/* GET home page. */
router.('/', function(req, res, next) {
    var text = '"success" : 1';
    var obj = JSON.parse(text);
    res.send(obj);
});

module.exports = router;
