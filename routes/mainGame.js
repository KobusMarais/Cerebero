var express = require('express');
var router = express.Router();
var path = require('path');
/* GET Start the game. */
router.get('/mainGame', function(req, res, next) {
    res.sendFile(path.resolve('./Client/eCivix Election Simulator/Builds/index.html'));
});

module.exports = router;
