var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('current user: ' + req.session.loggedIn)
  res.render('index', { title: 'Workout Planner', 
  loggedIn: req.session.loggedIn,
  js: 'javascripts/index.js' });
});


module.exports = router;
