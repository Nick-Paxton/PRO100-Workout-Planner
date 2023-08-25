var express = require('express')
var router = express.Router()

router.get('/', function(req, res, next) {
    res.render('community', {title: 'Community', loggedIn: req.session.loggedIn})
})

module.exports = router