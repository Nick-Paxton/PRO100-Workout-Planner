let userNameBox
let passwordBox
let submit

window.onload = function () {
    userNameBox = document.getElementById("username-field")
    passwordBox = document.getElementById("password-field")
    submit = document.getElementById("login-form-submit")
}



function submitClick() {
    console.log("Button Working")
    let userName = userNameBox.value
    let password = passwordBox.value
    console.log(userName)
    console.log(password)
    userNameBox.value = ""
    passwordBox.value = ""
}