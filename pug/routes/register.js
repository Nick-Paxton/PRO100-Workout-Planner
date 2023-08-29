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
    console.log("OK")
    res.redirect('/')

    // await fetch("http://localhost:2718/user/", {
    //     method: "POST",
    //     headers: {
    //         'Content-Type': 'application/json;charset=utf-8'
    //     },
    //     body: JSON.stringify({
    //         username: data['username'],
    //         password: data['password'],
    //         userID: 17
    //     })
    //     }).then((response) => {
    //         if (response.ok) {
    //             req.session.loggedIn = data['username']
    //             console.log("OK")
    //             res.redirect('/')
    //         }
    // })
})

module.exports = router