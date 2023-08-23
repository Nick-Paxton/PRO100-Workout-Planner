let mainlist = document.querySelector('.mainlist')

fetch('http://localhost:2718/community/all')
    .then((response) => {
        if (response.ok) {
            response.json().then((jsonData) => {

                jsonData.forEach(element => {
                    let li = document.createElement('li')
                    li.className = 'mainlist-item'
                    let div = document.createElement('div')
                    div.className = 'workout-title'
                    div.innerHTML = 'User ' + element['userID'] + "'s " + element['title']
                    li.appendChild(div)

                    let ul = document.createElement('ul')
                    ul.className = 'workout-list'
                    element['workouts'].forEach(workout => {
                        let lichild = document.createElement('li')
                        let h3 = document.createElement('h3')
                        let p1 = document.createElement('p')
                        let p2 = document.createElement('p')
                        h3.innerHTML = workout['name']
                        p1.innerHTML = 'Sets: ' + workout['sets']
                        p2.innerHTML = 'Reps: ' + workout['reps']

                        lichild.appendChild(h3)
                        lichild.appendChild(p1)
                        lichild.appendChild(p2)

                        ul.appendChild(lichild)
                    })

                    li.appendChild(ul)

                    mainlist.appendChild(li)
                });

                
            })
        }
    })

