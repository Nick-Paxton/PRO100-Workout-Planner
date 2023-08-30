var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  user = req.session.loggedIn
  res.json({userID: user})
});

module.exports = router;
