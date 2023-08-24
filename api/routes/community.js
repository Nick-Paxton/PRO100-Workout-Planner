const express = require('express')
const router = express.Router()
const dal = require('../data/communitydata.js')

const db = 'workout_planner'
const collection = 'community_workouts'

const get = (req, res) => {
    try {
        dal.get(db,collection, req.body, (jsonData) => {
            res.json(jsonData)
        })
    } catch (err) {
        res.sendStatus(500)
    }
}

const getAllWorkouts = (req, res) => {
    try {
        dal.getAll(db,collection, req.body, (jsonData) => {
            res.json(jsonData)
        })
    } catch (err) {
        res.sendStatus(500)
    }
}

const patch = (req, res) => {
    try {
        dal.update(db, collection, req.body, () => {
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
            title: req.body['title'],
            workouts: req.body['workouts']
        }
        dal.post(db, collection, body, () => {
            res.sendStatus(200)
        })
    } catch (err) {
        res.sendStatus(500)
    }
}

const deleteWorkout = (req, res) => {
    try {
        dal.delete(db, collection, req.body, () => {
            res.sendStatus(200)
        })
    } catch (err) {
        res.sendStatus(500)
    }
}

router.get('/', get)
router.patch('/', patch)
router.post('/', post)
router.delete('/', deleteWorkout)
router.get('/all', getAllWorkouts)

module.exports = router