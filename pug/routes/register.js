var express = require('express')
var router = express.Router()

router.get('/', function(req, res, next) {
    res.render('register', {title: 'Register', loggedIn: req.session.loggedIn})
})

//currently only sets variable in session to maintain login status
//todo: add actual login logic with calls to database
router.post('/', async function(req, res, next) {
    let data = req.body
    req.session.loggedIn = data['username']
    console.log("registered: " + req.session.loggedIn)
    console.log("redirecting")
    res.redirect('/')
})

module.exports = router