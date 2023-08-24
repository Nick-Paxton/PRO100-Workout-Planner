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

const shareButton = document.getElementById('share-workouts')
shareButton.addEventListener('click', shareWorkouts)

async function shareWorkouts() {

}

const saveButton = document.getElementById('save-workouts')
saveButton.addEventListener('click', saveWorkouts)
    
async function saveWorkouts() {
    let myWorkoutData
        

    await fetch("http://localhost:2718/workout/100").then(async (response) => {
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
    firstOfWeek.setDate(firstOfWeek.getDate()-firstOfWeek.getDay())
    
    for (i = 0; i < 7; i++) {
        for (j = 0; j < workoutsToBeSaved[i].length; j++) {
            myWorkoutData["2023"]["8"][firstOfWeek.getDate()+i+""].workouts.push(workoutsToBeSaved[i][j])
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
    let workoutStr = `Name: ${workout.name}\n` + `Description: ${workout.desc}\n` + `Reps: ${workout.reps}\n` + `Sets: ${workout.sets}`
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

function displayPopup(day) {
    dayButtonPressed = day
    document.getElementById('myForm').style.display = "block"
}

function closePopup() {
    document.getElementById('myForm').style.display = "none"
}