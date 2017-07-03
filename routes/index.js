var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  //res.redirect("/homepage.html");
    console.log("TESTING 5");
});

module.exports = router;
