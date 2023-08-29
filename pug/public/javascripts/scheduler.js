

async function getWorkoutsByMonthAsList() {
    let month = new Date(Date.now()).getMonth() + 1
    console.log(month)
    let userID = "1"
    await fetch("http://localhost:2718/workout/" + userID).then(async (response) => {
        if(response.ok) {
            await response.json().then((data) => {
                workoutData = data
                workoutData
            })
        }
    })
}
getWorkoutsByMonthAsList()
