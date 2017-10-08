const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    const path = require('path');
    console.log("THIS IS WHERE THE DOG SLEEPS 1");
    res.sendFile(path.resolve('./Client/eCivix Election Simulator/public/login.html'));
    //res.sendFile(path.resolve('./Client/eCivix Election Simulator/UnderConstructionPage/index.html'));

});

module.exports = router;
