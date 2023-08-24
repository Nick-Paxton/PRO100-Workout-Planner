var express = require('express')
var router = express.Router()

router.get('/', function(req, res, next) {
    res.render('login', {title: 'Login'})
})

router.post('/', async function(req, res, next) {
    let data = req.body
    req.session.loggedIn = data['username']
    console.log("logged in: " + req.session.loggedIn)
    console.log("redirecting")
    console.log(data)
    res.redirect('/')
})

module.exports = router