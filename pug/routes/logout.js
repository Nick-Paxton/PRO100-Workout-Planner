var express = require('express')
var router = express.Router()

router.get('/', function(req, res, next) {
    console.log("logged out: " + req.session.loggedIn)
    //req.session.loggedIn = undefined
    req.session.destroy()
    res.redirect('/')
})

module.exports = router