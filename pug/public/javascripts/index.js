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

    
const addButton = document.getElementById('addButton')
addButton.addEventListener('click', addWorkout)

function addWorkout() {
    let dayList
    let workoutName = document.getElementById('workoutName')
    let workoutDes = document.getElementById('workoutDes')
    let reps = document.getElementById('reps')
    let sets = document.getElementById('sets')

    let workout = {
        name: workoutName.textContent,
        desc: workoutDes.textContent,
        reps: reps.textContent,
        sets: sets.textContent
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
    const workoutStr = workout.name + "\nReps"
    li.appendChild(document.createTextNode(workout))
    dayList.appendChild(li)
    closePopup()
    
}

function displayPopup(day) {
    dayButtonPressed = day
    console.log(dayButtonPressed)
    document.getElementById('myForm').style.display = "block"
}

function closePopup() {
    document.getElementById('myForm').style.display = "none"
}

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