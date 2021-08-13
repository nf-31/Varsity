import axios from "axios"

const URL = "http://localhost:3001/api"
const json_headers = {
  "Accept": "application/json",
  "Content-Type": "application/json"
}
const DEBUG = false;

export function login(username, password, rememberMe, cb) {

  axios.post(`${URL}/login`, {
    auth: {
      username: username,
      password: password,
      rememberMe: rememberMe
    }
  }, {
    headers: json_headers
  }).then(function (response) {
    const token = response.data.authtoken
    const expiresIn = response.data.expiresIn
    localStorage.setItem("token", token)
    localStorage.setItem("expiresIn", expiresIn)
    console.log('Successfully logged in')
  }).then(function () {
    cb(true) // once logged in call the callback
  }).catch(function (error) {
    console.error(error)
    console.error('Failed to log in')
    cb(false)
  })
}

export function register(username, email, password, cb) {

  axios.post(`${URL}/register`, {
      username: username,
      password: password,
      email: email
  }, {
    headers: json_headers
  }).then(function () {
    cb(true) // once logged in call the callback
  }).catch(function (error) {
    console.error(error)
    console.error('Failed to log in')
    cb(false)
  })
}

export function logout(cb) {
  const token = localStorage.getItem("token")
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
  axios.post(`${URL}/logout`).then(function (response) {
    localStorage.removeItem("token")
    localStorage.removeItem("expiresIn")
    console.log('Successfully logged out')
    cb(true)
  }).catch(function (error) {
    console.error(error)
    console.error('Failed to log out')
    cb(false)
  })
}

export function isLoggedIn() {
  if (DEBUG) {
    return true
  }

  let token = localStorage.getItem("token");
  let expiresIn = localStorage.getItem("expiresIn");
  // check if token exists
  if (token === null) {
    return false
  }

  // check if token is expired
  let currDate = new Date();
  // duration?
  let diff = currDate.getTime() - expiresIn;

  if (diff >= 0) {
    return false
  }

  return true
}
