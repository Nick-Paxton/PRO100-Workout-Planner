const express = require('express')
const cors = require('cors')

const app = express()
const port = 2718

app.get('/', (req, res) => {
    res.send('Welcome to the Workout API')
})

const communityRoutes = require('./routes/community.js')
const workoutRoutes = require('./routes/workout.js')
const userRoutes = require('./routes/user.js')

app.use(express.json())
app.use(cors())
app.use('/workout/', workoutRoutes)
app.use('/users/', userRoutes)
app.use('/community/', communityRoutes)

app.listen(port, () => {
    console.log('API Service listening at localhost:2718')
})