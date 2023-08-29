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
        }
    }
}

const returnCalendarWeek = (o) => {
    
}

const addInBasicUserCalandars = () => { // This method is only to add in hardcoded Users. Either for testing or to be used for the community page
    
}

//for these methods o refers to a user's calendar object and everything else should hopefully be self explanatory

// returns a calendar object for the current month given a user id
// run only when creating a user because the object returned is an empty calendar for a given month with a userID key and isn't useful when trying to update
exports.createCalendar = createCalendar

// returns a user's calendar object updated with keys for current month, safe to run multiple times because it only works if keys for current month don't exist
exports.updateCalendar = updateCalendar

// returns a specific day object from a user's calendar object without needing to know the calendar week
// don't put in values for a day that doesn't exist yet in a user's calendar because I haven't written checks yet so if you do that it's on you
// same applies to addWorkoutWithoutCalendarWeek()
exports.getDayWithoutCalendarWeek = getDayWithoutCalendarWeek

// adds a workout into a specific day's workout object
// kinda redundant now that I think about it because you can just use something like getDayWithoutCalendarWeek()['workouts'].push() instead but it's here if you want a different flavor
exports.addWorkoutWithoutCalendarWeek = addWorkoutWithoutCalendarWeek

// adds a given workout object to every day of a month
// don't put in a month/year that isn't in the user's calendar because no checks, same goes for addWeeklyWorkout()
exports.addDailyWorkout = addDailyWorkout

// adds a given workout object to every specified weekday in a month
// for our convenience weekdays go from 1-7 so keep that in mind when using this (1 is subtracted from weekday because date objects use 0-6)
exports.addWeeklyWorkout = addWeeklyWorkout