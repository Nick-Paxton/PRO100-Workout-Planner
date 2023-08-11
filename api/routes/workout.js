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


const getByDate = (req, res) => {
    const dateString = req.params.date
    try {
        dal.getByDate(db,collection,dateString, (jsonData) => {
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
        body = {
            ID: req.body['ID'],
            date: new Date(req.body["date"]),
            exercises: req.body['exercises']
        }
        dal.Post(db, collection, body, () => {
            res.sendStatus(200)
        })
    } catch (err) {
        res.sendStatus(500)
    }
}


const deleteJoke = (req, res) => {
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
router.delete('/', deleteJoke)
router.get('/:date', getByDate)

module.exports = router