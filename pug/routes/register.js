var express = require('express')
var router = express.Router()
var c = require('../public/javascripts/calendar')

router.get('/', function(req, res, next) {
    res.render('register', {title: 'Register', loggedIn: req.session.loggedIn})
})

//currently only sets variable in session to maintain login status
//todo: add actual login logic with calls to database
router.post('/', async function(req, res, next) {
    // let data = req.body
    // req.session.loggedIn = data['username']
    // console.log("OK")
    // res.redirect('/')

    if (req.body.username && req.body.password) {
        await fetch("http://localhost:2718/users/count").then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    if (data['count']) {
                        //console.log('Count gotten')
                        fetch("http://localhost:2718/users", {
                            method: "POST", // *GET, POST, PUT, DELETE, etc.
                            headers: {
                                'Content-Type': 'application/json;charset=utf-8'
                            },
                            body: JSON.stringify({ username: req.body.username, password: req.body.password, userID: data['count'] + 1} ) // body data type must match "Content-Type" header
                            })
                        fetch("http://localhost:2718/workout", {
                            method: "POST", // *GET, POST, PUT, DELETE, etc.
                            headers: {
                                'Content-Type': 'application/json;charset=utf-8'
                            },
                            body: JSON.stringify(c.createCalendar(data['count'] + 1)) // body data type must match "Content-Type" header
                            })
                        console.log('OK')
                        res.redirect('/login')
                    } else {
                        
                    }
                })
            } 
        })
    }
})

module.exports = router