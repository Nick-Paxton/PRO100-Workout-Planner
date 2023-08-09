const express = require('express')

const app = express()
const port = 2718

app.get('/', (req, res) => {
    res.send('Welcome to the Workout API')
})

const workoutRoutes = require('./routes/workout.js')

app.use(express.json())
app.use('/', workoutRoutes)

app.listen(port, () => {
    console.log('API Service listening at localhost:2718')
})