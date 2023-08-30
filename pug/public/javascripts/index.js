//var c = require('./calendar')
currentUser = -1

var getUserID = async () => {
    res = await fetch("http://localhost:3000/users")
    r = await res.json()
    currentUser = r['userID']
    console.log('user gotten: ' + r['userID'])
}
var addWeeklyWorkout = (o, workout, year, month, weekday) => {
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
    console.log(o)
    return o
}

let dayButtonPressed = 0;
var workoutsToBeSaved = [
    [],
    [],
    [],
    [],
    [],
    [],
    []
]
var myWorkoutData = null

// fetch("http://localhost:2718/workout/1234")
//     .then((response) => {
//         if (response.ok) {
//             response.json().then((data) => {
//                 var currentDate = new Date()
//                 currentDate.setDate(7)
//                 var firstOfMonth = new Date()
//                 var firstOfWeek = new Date()

//                 firstOfWeek.setDate(currentDate.getDate()-currentDate.getDay())
//                 firstOfMonth.setDate(1)
//                 var daysLeft = 31 - (7 - firstOfMonth.getDay())
//                 var weekCheck = 31 - firstOfWeek.getDate() + 1
                
//                 const year = firstOfWeek.getFullYear()
//                 const month = firstOfWeek.getMonth() + 1
//                 var currentWeek
//                 if (weekCheck < daysLeft) currentWeek = 1
//                 //                         (( 6            - (7 - 2) - 1 ) / 7 = 2
//                 //                         (( 13           - (7 - 2) - 1 ) / 7) = 3
//                 else currentWeek = (((firstOfWeek.getDate() - (7 - firstOfMonth.getDay()))-1)/7) + 2


//                 for (var i = 0; i < 7; i++) {
//                     var day = firstOfWeek.getDate() + i
//                     var dayOfWeek = firstOfWeek.getDay() + i

//                     var ul = document.querySelector("#list"+dayOfWeek)

//                     data[year+""][month+""][currentWeek+""][day+""]["workouts"].forEach(element => { // ***** need to figure out how to handle empty objects *****
//                         var exercise = element['name'] + ': Reps: ';
//                         exercise = exercise + element['reps'] + ': Sets: ';
//                         exercise = exercise + element['sets']
//                         // place the data on the UI

//                         var li = document.createElement('li')
//                         li.innerHTML = exercise
//                         ul.appendChild(li)
//                     });
//                 }
//             })
//         }
//     })

const shareButton = document.getElementById('share-button')
shareButton.addEventListener('click', shareWorkouts)

async function shareWorkouts() {
    let dayList
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

    let liElements = dayList.getElementsByTagName("li")
    let title = document.getElementById('title')
    console.log(title.value)

    if (title.value === "") {
        title.place = "PLEASE ENTER A TITLE"
        return
    }

    await getUserID()

    let communityPost = {
        userID: currentUser,
        title: title.value,
        workouts: [
            
        ]
    }

    for (i = 0; i < liElements.length; i++) {
        liText = liElements[i].innerHTML
        liSplit = liText.split(" ")
        workout = {
            name: liSplit[1],
            reps: liSplit[5],
            sets: liSplit[7]
        }
        communityPost["workouts"].push(workout)
    }

    console.log(communityPost)


    await fetch("http://localhost:2718/community/", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(communityPost) // body data type must match "Content-Type" header
        }).then((response) => {
            if (response.ok) {
                console.log("OK")
            }
            console.log(myWorkoutData)
    })

    closeTitlePop()
}

const saveButton = document.getElementById('save-workouts')
saveButton.addEventListener('click', saveWorkouts)

async function saveWorkouts() {
    let myWorkoutData
    
    await getUserID()

    await fetch("http://localhost:2718/workout/" + currentUser).then(async (response) => {
        if(response.ok) {
            await response.json().then((data) => {
                myWorkoutData = data
            })
        }
        else {
            myWorkoutData = {
                userID: 100,
                2023: {
                    8: {
                        20 : {"workouts": []},
                        21 : {"workouts": []},
                        22 : {"workouts": []},
                        23 : {"workouts": []},
                        24 : {"workouts": []},
                        25 : {"workouts": []},
                        26 : {"workouts": []}
                    }
                }
            }
        }
    })
    var firstOfWeek = new Date()
    firstOfWeek.setDate(firstOfWeek.getDate()-7)
    firstOfWeek.setDate(firstOfWeek.getDate()-firstOfWeek.getDay())
    
    for (i = 0; i < 7; i++) {
        for (j = 0; j < workoutsToBeSaved[i].length; j++) {
            // myWorkoutData["2023"]["8"][firstOfWeek.getDate()+i+""].workouts.push(workoutsToBeSaved[i][j])
            h = addWeeklyWorkout(myWorkoutData, workoutsToBeSaved[i][j], firstOfWeek.getFullYear(), firstOfWeek.getMonth() + 1, i + 1)
            myWorkoutData = h
        }
    }
    
    await fetch("http://localhost:2718/workout/", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(myWorkoutData) // body data type must match "Content-Type" header
        }).then((response) => {
            if (response.ok) {
                console.log("OK")
            }
            console.log(myWorkoutData)
    })
        
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
    let workoutStr = `Name: ${workout.name} \n` + `Description: ${workout.desc} \n` + `Reps: ${workout.reps} \n` + `Sets: ${workout.sets}`
    li.title = workoutStr
    li.appendChild(document.createTextNode(workoutStr))
    dayList.appendChild(li)
    workoutName.value = null
    workoutDes.value = null
    reps.value = null
    sets.value = null
    closePopup()
    workoutsToBeSaved[dayButtonPressed].push(workout)
}

function closeTitlePop() {
    document.getElementById('addTitle').style.display = "none"
}

function displayTitlePop(day) {
    dayButtonPressed = day
    document.getElementById('addTitle').style.display = "block"
}

function displayPopup(day) {
    dayButtonPressed = day
    document.getElementById('myForm').style.display = "block"
}

function closePopup() {
    document.getElementById('myForm').style.display = "none"
}