//a bunch of dirty code that assembles calendar objects to be stored

first = new Date()
day = new Date()
first.setDate(1)
day.setDate(1)
count = 0
nextMonth = new Date()
nextMonth.setMonth(first.getMonth() + 1)
nextMonth.setDate(0)
daysLeft = nextMonth.getDate()
currentDay = 1

obj = {
    userID: 0
}

const keyCheck = (o) => {
    //if obj doesn't have year key, set it
    if (!o.hasOwnProperty(first.getFullYear())) {
        o[first.getFullYear()] = {}
    }
    //if obj doesn't have month key, set it
    if (!o[first.getFullYear()].hasOwnProperty((first.getMonth() + 1))) {
        o[first.getFullYear()][(first.getMonth() + 1)] = {}
    }
    //if obj doesn't have calendar week key, set it
    if (!o[first.getFullYear()][(first.getMonth() + 1)].hasOwnProperty(count)) {
        o[first.getFullYear()][(first.getMonth() + 1)][count] = {}
    }
    //if obj doesn't have current day key, set it
    if (!o[first.getFullYear()][(first.getMonth() + 1)][count].hasOwnProperty(currentDay)) {
        o[first.getFullYear()][(first.getMonth() + 1)][count][currentDay] = {workouts: []}}
}

const firstWeek = (o) => {
    for (i = 0; i < (7 - first.getDay()); i++) {
        keyCheck(o)
    
        daysLeft--
        currentDay++
    }
}

const regularWeek = (o) => {
    for (d = 0; d < 7; d++) {
        if (daysLeft <= 0){
            break
        }

        keyCheck(o)

        daysLeft--
        currentDay++
    }
}

while (first.getMonth() == day.getMonth()) {
    count += 1

    if (count == 1) {
        firstWeek(obj)
    }
    if (count > 1) {
        regularWeek(obj)
    }

    day.setTime(day.getTime() + 604800000)
}

if (daysLeft > 0) {
    count += 1
    regularWeek(obj)
}

const createCalendar = (user) => {
    obj['userID'] = user
    return obj
}

const updateCalendar = (o) => {
    first = new Date()
    day = new Date()
    first.setDate(1)
    day.setDate(1)
    count = 0
    nextMonth = new Date()
    nextMonth.setMonth(first.getMonth() + 1)
    nextMonth.setDate(0)
    daysLeft = nextMonth.getDate()
    currentDay = 1

    while (first.getMonth() == day.getMonth()) {
        count += 1
    
        if (count == 1) {
            firstWeek(o)
        }
        if (count > 1) {
            regularWeek(o)
        }
    
        day.setTime(day.getTime() + 604800000)
    }
    
    if (daysLeft > 0) {
        count += 1
        regularWeek(o)
    }
}

const getCalendarWeek = (o, year, month, day) => {
    calendarWeek = 0
    
    for (key in o[year][month]) {
        if (Object.keys(o[year][month][key]).includes(String(day))) {
            calendarWeek = key
            break
        }
    }
    
    return calendarWeek
}

const getDayWithoutCalendarWeek = (o, year, month, day) => {
    calendarWeek = getCalendarWeek(o, year, month, day)
    return o[year][month][calendarWeek][day]
}

const addWorkoutWithoutCalendarWeek = (o, workout, year, month, day) => {
    calendarWeek = getCalendarWeek(o, year, month, day)
    o[year][month][calendarWeek][day]['workouts'].push(workout)
}

const addDailyWorkout = (o, workout, year, month) => {
    for (week in o[year][month]){
        for (day in o[year][month][week]) {
            o[year][month][week][day]['workouts'].push(workout)
        }
    }
}

const addWeeklyWorkout = (o, workout, year, month, weekday) => {
    d9 = new Date()
    console.log("day of the week: " + d9.getDay())
    for (week in o[year][month]){
        for (day in o[year][month][week]) {
            d9.setDate(day)
            console.log("day of the week: " + d9.getDay())
            if (d9.getDay() == (weekday - 1)) {
                o[year][month][week][day]['workouts'].push(workout)
                console.log("workout added")
            }
            //d9.setDate(d9.getDate() + 86400000)
        }
    }
}

const returnCalendarWeek = (o) => {
    
}

// to import use const calendar = require('./data/calendar.js')
// returns an calendar object for the current month
// if run multiple times, objects will not be overwritten because keys are only added if they don't already exist
// use to create a new key for the current month for a given user if it doesn't already exist or to create a new calendar for a user that doesn't have one
// not sure if this helps much but I can explain the usage in more detail if need be
exports.createCalendar = createCalendar

exports.updateCalendar = updateCalendar

exports.getDayWithoutCalendarWeek = getDayWithoutCalendarWeek

exports.addWorkoutWithoutCalendarWeek = addWorkoutWithoutCalendarWeek

exports.addDailyWorkout = addDailyWorkout

exports.addWeeklyWorkout = addWeeklyWorkout