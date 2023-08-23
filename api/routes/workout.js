const express = require('express')
const router = express.Router()
const dal = require('../data/workoutdata.js')

const db = 'workout_planner'
const collection = 'default_workouts'


const get = (req, res) => {
    try {
        dal.Get(db, collection, req.body, (jsonData) => {
            res.json(jsonData)
        })
    } catch (err) {
        res.sendStatus(500)
    }
}


const getByUserID = (req, res) => {
    const userID = req.params.userID
    try {
        dal.getByUserID(db,collection,userID, (jsonData) => {
            if (jsonData) {
                res.json(jsonData)
            } else {
                res.sendStatus(404)
            }
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
            '2023': req.body['2023']
        }
        dal.Post(db, collection, body, () => {
            res.sendStatus(200)
        })
    } catch (err) {
        res.sendStatus(500)
    }
}


const deleteWorkout = (req, res) => {
    try {
        dal.Delete(db, collection, req.body, () => {
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
router.get('/:userID', getByUserID)

module.exports = router