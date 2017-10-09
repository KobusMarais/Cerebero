const express = require('express');
const router = express.Router();
const path = require('path');

/* GET users listing. */
router.get('/LoadGame', function(req, res, next) {
    res.sendFile(path.resolve('./Client/eCivix Election Simulator/UnderConstructionPage/index.html'));
});

module.exports = router;
