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

const keyCheck = () => {
    //if obj doesn't have year key, set it
    if (!obj.hasOwnProperty(first.getFullYear())) {
        obj[first.getFullYear()] = {}
    }
    //if obj doesn't have month key, set it
    if (!obj[first.getFullYear()].hasOwnProperty((first.getMonth() + 1))) {
        obj[first.getFullYear()][(first.getMonth() + 1)] = {}
    }
    //if obj doesn't have calendar week key, set it
    if (!obj[first.getFullYear()][(first.getMonth() + 1)].hasOwnProperty(count)) {
        obj[first.getFullYear()][(first.getMonth() + 1)][count] = {}
    }
    //if obj doesn't have current day key, set it
    if (!obj[first.getFullYear()][(first.getMonth() + 1)][count].hasOwnProperty(currentDay)) {
        obj[first.getFullYear()][(first.getMonth() + 1)][count][currentDay] = {workouts: []}}
}

const firstWeek = () => {
    for (i = 0; i < (7 - first.getDay()); i++) {
        keyCheck()
    
        daysLeft--
        currentDay++
    }
}

const regularWeek = () => {
    for (d = 0; d < 7; d++) {
        if (daysLeft <= 0){
            break
        }

        keyCheck()

        daysLeft--
        currentDay++
    }
}

while (first.getMonth() == day.getMonth()) {
    count += 1

    if (count == 1) {
        firstWeek()
    }
    if (count > 1) {
        regularWeek()
    }

    day.setTime(day.getTime() + 604800000)
}

// console.log(obj)
// console.log(obj[2023][8][5])

// object[year][month][calendarWeek][day]
// object[2023][8][4][23]