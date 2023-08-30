var express = require('express')
var router = express.Router()

router.get('/', function(req, res, next) {
    if (!req.session.loggedIn) {
        res.redirect('http://localhost:3000/community/')
    }
    res.render('scheduler', {title: 'Scheduler', loggedIn: req.session.loggedIn})
})

module.exports = router