const today = new Date()
const month = today.getMonth() + 1

for (var i = 0; i < 7; i++){
    const retrievalDate = (today.getDate() - today.getDay())+i
    var dateString = today.getFullYear()
    if (month < 10) dateString = dateString+"0"+month;
    else dateString = dateString+""+month;
    if (retrievalDate < 10) dateString = dateString+"0"+retrievalDate;
    else dateString = dateString+""+retrievalDate;

    // fetch data from the database through the api
    fetch("http://localhost:2718/workout/" + dateString)
    .then((response) => {
        if (response.ok) {
            response.json().then((data) => {
                var currentDate = new Date(data['date'])
                const dayOfWeek = currentDate.getDay()
                // get the UI element
                var ul = document.querySelector("#list"+dayOfWeek)
                data['exercises'].forEach(element => {
                    var exercise = element['name'] + ': Reps: ';
                    exercise = exercise + element['reps'] + ': Sets: ';
                    exercise = exercise + element['sets']
                    // place the data on the UI
                    var li = document.createElement('li')
                    li.innerHTML = exercise
                    ul.appendChild(li)
                });
                
            })
        } else {
            // say that there is no workout for that day yet
        }
    })
}

