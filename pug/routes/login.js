var express = require('express')
var router = express.Router()

router.get('/', function(req, res, next) {
    res.render('login', {title: 'Login', loggedIn: req.session.loggedIn})
})

//currently only sets variable in session to maintain login status
//todo: add actual login logic with calls to database
router.post('/', async function(req, res, next) {
    if (req.body.username && req.body.password) {
        await fetch("http://localhost:2718/users/"+req.body.username+"&"+req.body.password).then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    if (data['userID']) {
                        // if this is a valid user then store a cookie somewhere and send them to the main page
                        console.log('found user')
                        req.session.loggedIn = data['userID']
                        console.log("logged in: " + req.session.loggedIn)
                        res.redirect('/')
                    } else {
                        // create a new user with a random id 
                        console.log('no user found')
                    }
                })
            } 
        })
    }
})

module.exports = router