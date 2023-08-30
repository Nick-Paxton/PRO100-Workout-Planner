const { getDayWithoutCalendarWeek } = require("./calendar")


async function getWorkoutsByMonthAsList() {
    let month = new Date(Date.now()).getMonth() + 1
    console.log(month)
    let userID = "1"
    await fetch("http://localhost:2718/workout/" + userID).then(async (response) => {
        if(response.ok) {
            await response.json().then((data) => {
                workoutData = data
                let index = 1;
                while (index <= 31) {
                    document.getElementById('content').textContent = getDayWithoutCalendarWeek(workoutData, new Date(Date.now()).getFullYear(), month, index)['workouts']
                }
            })
        }
    })
}
const calandarDayButton = document.getElementById('day')
calandarDayButton.addEventListener('click', getWorkoutsByMonthAsList)