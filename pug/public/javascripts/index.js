let dayButtonPressed = 0;
var workoutsToBeSaved = {
    0 : [

    ],
    1 : [

    ],
    2 : [

    ],
    3 : [

    ],
    4 : [

    ],
    5 : [

    ],
    6 : [

    ]
}

fetch("http://localhost:2718/workout/1234")
    .then((response) => {
        if (response.ok) {
            response.json().then((data) => {
                var currentDate = new Date()
                currentDate.setDate(7)
                var firstOfMonth = new Date()
                var firstOfWeek = new Date()

                firstOfWeek.setDate(currentDate.getDate()-currentDate.getDay())
                firstOfMonth.setDate(1)
                var daysLeft = 31 - (7 - firstOfMonth.getDay())
                var weekCheck = 31 - firstOfWeek.getDate() + 1
                
                const year = firstOfWeek.getFullYear()
                const month = firstOfWeek.getMonth() + 1
                var currentWeek
                if (weekCheck < daysLeft) currentWeek = 1
                //                         (( 6            - (7 - 2) - 1 ) / 7 = 2
                //                         (( 13           - (7 - 2) - 1 ) / 7) = 3
                else currentWeek = (((firstOfWeek.getDate() - (7 - firstOfMonth.getDay()))-1)/7) + 2


                for (var i = 0; i < 7; i++) {
                    var day = firstOfWeek.getDate() + i
                    var dayOfWeek = firstOfWeek.getDay() + i

                    var ul = document.querySelector("#list"+dayOfWeek)

                    data[year+""][month+""][currentWeek+""][day+""]["workouts"].forEach(element => { // ***** need to figure out how to handle empty objects *****
                        var exercise = element['name'] + ': Reps: ';
                        exercise = exercise + element['reps'] + ': Sets: ';
                        exercise = exercise + element['sets']
                        // place the data on the UI

                        var li = document.createElement('li')
                        li.innerHTML = exercise
                        ul.appendChild(li)
                    });
                }
            })
        }
    })

const shareButton = document.getElementById('share-workouts')
shareButton.addEventListener('click', shareWorkouts)

async function shareWorkouts() {

}

const saveButton = document.getElementById('save-workouts')
saveButton.addEventListener('click', saveWorkouts)
    
async function saveWorkouts() {
    let myWorkoutData
        

    fetch("http://localhost:2718/workout/1000").then((response) => {
        if(response.ok) {
            response.json().then((data) => {
                myWorkoutData = data
            })
        }
        else {
        myWorkoutData = {
            userID: 1000,
            2023: {
                8: {
                    4: {
                        23: {
                            "workouts": [

                            ]
                        }
                    }
                }
            }
    }
    }
    })

        //addWorkoutWithoutCalendarWeek = (o, workout, year, month, day)
    console.log(workoutsToBeSaved[1].length)
    
    for (i = 0; i < Object.keys(workoutsToBeSaved).length; i++) {
        for (j = 0; j < workoutsToBeSaved[i].length; j++) {
            addWorkoutWithoutCalendarWeek(myWorkoutData, workoutsToBeSaved[i + 1][j], 2023, 8, 23)
            console.log("Saved Workout")
        }
    }
    
    const response = await fetch("http://localhost:2718/workout/", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify(myWorkoutData) // body data type must match "Content-Type" header
        });
        console.log(JSON.stringify(myWorkoutData))
        return response.json(); // parses JSON response into native JavaScript objects
}

    
const addButton = document.getElementById('addButton')
addButton.addEventListener('click', addWorkout)

function addWorkout() {
    let dayList
    let workoutName = document.getElementById('workoutName')
    let workoutDes = document.getElementById('workoutDes')
    let reps = document.getElementById('reps')
    let sets = document.getElementById('sets')

    let workout = {
        name: workoutName.value,
        desc: workoutDes.value,
        reps: reps.value,
        sets: sets.value
    }
    switch (dayButtonPressed) {
        case 0: {
            dayList = document.getElementById('list0')
            break
        }
        case 1: {
            dayList = document.getElementById('list1')
            break
        }
        case 2: {
            dayList = document.getElementById('list2')
            break
        }
        case 3: {
            dayList = document.getElementById('list3')
            break
        }
        case 4: {
            dayList = document.getElementById('list4')
            break
        }
        case 5: {
            dayList = document.getElementById('list5')
            break
        }
        case 6: {
            dayList = document.getElementById('list6')
            break
        }
    }

    let li = document.createElement("li")
    let workoutStr = `Name: ${workout.name}\n` + `Description: ${workout.desc}\n` + `Reps: ${workout.reps}\n` + `Sets: ${workout.sets}`
    li.title = workoutStr
    li.appendChild(document.createTextNode(workoutStr))
    dayList.appendChild(li)
    workoutName.value = null
    workoutDes.value = null
    reps.value = null
    sets.value = null
    closePopup()
    workoutsToBeSaved.dayButtonPressed.push(workout)
}

function displayPopup(day) {
    dayButtonPressed = day
    console.log(dayButtonPressed)
    document.getElementById('myForm').style.display = "block"
}

function closePopup() {
    document.getElementById('myForm').style.display = "none"
}

// old way of handling the data
// const today = new Date()
// const month = today.getMonth() + 1

// for (var i = 0; i < 7; i++){
//     const retrievalDate = (today.getDate() - today.getDay())+i
//     var dateString = today.getFullYear()
//     if (month < 10) dateString = dateString+"0"+month;
//     else dateString = dateString+""+month;
//     if (retrievalDate < 10) dateString = dateString+"0"+retrievalDate;
//     else dateString = dateString+""+retrievalDate;

//     // fetch data from the database through the api
    
// }



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
    for (week in o[year][month]){
        for (day in o[year][month][week]) {
            d9.setDate(day)
            if (d9.getDay() == (weekday - 1)) {
                o[year][month][week][day]['workouts'].push(workout)
            }
        }
    }
}

// //for these methods o refers to a user's calendar object and everything else should hopefully be self explanatory

// // returns a calendar object for the current month given a user id
// // run only when creating a user because the object returned is an empty calendar for a given month with a userID key and isn't useful when trying to update
// exports.createCalendar = createCalendar

// // returns a user's calendar object updated with keys for current month, safe to run multiple times because it only works if keys for current month don't exist
// exports.updateCalendar = updateCalendar

// // returns a specific day object from a user's calendar object without needing to know the calendar week
// // don't put in values for a day that doesn't exist yet in a user's calendar because I haven't written checks yet so if you do that it's on you
// // same applies to addWorkoutWithoutCalendarWeek()
// exports.getDayWithoutCalendarWeek = getDayWithoutCalendarWeek

// // adds a workout into a specific day's workout object
// // kinda redundant now that I think about it because you can just use something like getDayWithoutCalendarWeek()['workouts'].push() instead but it's here if you want a different flavor
// exports.addWorkoutWithoutCalendarWeek = addWorkoutWithoutCalendarWeek

// // adds a given workout object to every day of a month
// // don't put in a month/year that isn't in the user's calendar because no checks, same goes for addWeeklyWorkout()
// exports.addDailyWorkout = addDailyWorkout

// // adds a given workout object to every specified weekday in a month
// // for our convenience weekdays go from 1-7 so keep that in mind when using this (1 is subtracted from weekday because date objects use 0-6)
// exports.addWeeklyWorkout = addWeeklyWorkout