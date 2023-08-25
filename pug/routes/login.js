var express = require('express')
var router = express.Router()

router.get('/', function(req, res, next) {
    res.render('login', {title: 'Login', loggedIn: req.session.loggedIn})
})

//currently only sets variable in session to maintain login status
//todo: add actual login logic with calls to database
router.post('/', async function(req, res, next) {
    let data = req.body
    req.session.loggedIn = data['username']
    console.log("logged in: " + req.session.loggedIn)
    res.redirect('/')
})

module.exports = router