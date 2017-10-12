const express = require('express');
const router = express.Router();
const path = require('path');

/* Routes to load pages and the game */
router.get('/', function(req, res, next) {
    res.sendFile(path.join(
        __dirname, '..', 'Client', 'eCivix Election Simulator',
        'Builds', 'Public', 'views', 'index.html'));
});

router.get('/register', function (req, res, next) {
    res.sendFile(path.join(
        __dirname, '..', 'Client', 'eCivix Election Simulator',
        'Builds', 'Public', 'views', 'register.html'));
});

router.get('/login', function (req, res, next) {
    res.sendFile(path.join(
        __dirname, '..', 'Client', 'eCivix Election Simulator',
        'Builds', 'Public', 'views', 'login.html'));
});

router.get('/loadGame', function(req, res, next) {
    res.sendFile(path.join(
        __dirname, '..', 'Client', 'eCivix Election Simulator',
        'Builds', 'index.html'));
});

module.exports = router;