let globalVar = {
    submitBtn: document.querySelector('#login-form-submit'),
    usernameField: document.querySelector('#username-field'),
    passwordField: document.querySelector('#password-field'),
    cookie: document.cookie
}

globalVar.submitBtn.addEventListener('click', () => {
    let username = globalVar.usernameField.value
    let password = globalVar.passwordField.value

    if (username && password) {
        fetch("http://localhost:2718/users/"+username+"&"+password).then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    if (data['userID']) {
                        // if this is a valid user then store a cookie somewhere and send them to the main page
                        console.log('found user')
                    } else {
                        // create a new user with a random id 
                        console.log('no user found')
                    }
                })
            } 
        })
    }
})