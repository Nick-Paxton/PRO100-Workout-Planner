const express = require('express')
const cors = require('cors')

const app = express()
const port = 2718

app.get('/', (req, res) => {
    res.send('Welcome to the Workout API')
})

const workoutRoutes = require('./routes/workout.js')

app.use(express.json())
app.use(cors())
app.use('/workout/', workoutRoutes)

app.listen(port, () => {
    console.log('API Service listening at localhost:2718')
})