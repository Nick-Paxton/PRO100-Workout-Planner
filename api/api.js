const express = require('express')
const cors = require('cors')

const app = express()
const port = 2718

app.get('/', (req, res) => {
    res.send('Welcome to the Workout API')
})

const workoutRoutes = require('./routes/workout.js')
const userRoutes = require('./routes/user.js')
const cal = require('./data/calendar.js')
const util = require('util')

app.use(express.json())
app.use(cors())
app.use('/workout/', workoutRoutes)
app.use('/users/', userRoutes)

app.listen(port, () => {
    console.log('API Service listening at localhost:2718')
    // c = cal.createCalendar(111)
    // console.log(util.inspect(c, false, null, true))
    // cal.addDailyWorkout(c, "daily workout", 2023, 8)
    // cal.addWeeklyWorkout(c, "weekly workout", 2023, 8, 1)
    // cal.addWorkoutWithoutCalendarWeek(c, "10km run and 100 push ups, sit ups, and squats", 2023, 8, 27)
    // cal.updateCalendar(c)
    // console.log(util.inspect(c, false, null, true))
    // console.log(cal.getDayWithoutCalendarWeek(c, 2023, 8, 27))
})