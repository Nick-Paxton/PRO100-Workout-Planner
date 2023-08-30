const express = require('express')
const router = express.Router()
const dal = require('../data/userdata.js')

const db = 'workout_planner'
const collection = 'users'

const get = (req, res) => {
    try {
        dal.get(db, collection, req.body, (jsonData) => {
            res.json(jsonData)
        })
    } catch (err) {
        res.sendStatus(500)
    }
}

const patch = (req, res) => {
    try {
        dal.Update(db, collection, req.body, () => {
            res.sendStatus(200)
        })
    } catch (err) {
        res.sendStatus(500)
    }
}


const post = (req, res) => {
    try {
        let body = {
            userID: req.body['userID'],
            username: req.body['username'],
            password: req.body['password']
        }
        dal.post(db, collection, body, () => {
            res.sendStatus(200)
        })
    } catch (err) {
        res.sendStatus(500)
    }
}


const deleteUser = (req, res) => {
    try {
        dal.Delete(db, collection, req.body, () => {
            res.sendStatus(200)
        })
    } catch (err) {
        res.sendStatus(500)
    }
}

const getValidUserCheck = (req, res) => {
    const username = req.params.username
    const password = req.params.password
    try {
        let body = {
            username: username
        }
        dal.get(db,collection, body, (jsonData) => {
            if (jsonData) {
                if (jsonData['password'] == password) {
                    res.json({ userID: jsonData['userID'] })
                } else {
                    res.json({ userID: false })
                }
            } else {
                res.json({ userID: false })
            }
            
        })
    } catch (err) {
        res.sendStatus(500)
    }
}

const getDocumentCount = (req, res) => {
    try {
        dal.getCount(db, collection, req.body, (jsonData) => {
            res.json({ count: jsonData })
        })
    } catch (err) {
        res.sendStatus(500)
    }
}

router.get('/', get)
router.patch('/', patch)
router.post('/', post)
router.delete('/', deleteUser)
router.get('/:username&:password', getValidUserCheck)
router.get('/count', getDocumentCount)

module.exports = router