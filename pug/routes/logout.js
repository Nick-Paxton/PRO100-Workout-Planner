var express = require('express')
var router = express.Router()

router.get('/', function(req, res, next) {
    req.session.loggedIn = undefined
    console.log("logged out: " + req.session.loggedIn)
    res.redirect('/')
})

module.exports = router