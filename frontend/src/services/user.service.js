import Axios from 'axios'
import { storageService } from './async-storage.service.js'

const STORAGE_KEY = 'userDB'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

const BASE_URL =
    process.env.NODE_ENV === 'production' ? '/api/auth/' : '//localhost:3030/api/auth/'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    save,
    // addActivity
}

var axios = Axios.create({
    withCredentials : true
})


window.us = userService

function save(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
    return storageService.put(STORAGE_KEY, user)
}

// function login(credentials) {
//     return storageService.query(STORAGE_KEY).then(users => {
//         const user = users.find(user => user.username === credentials.username &&
//             user.password === credentials.password)
//             _handleLogin(user)
//         return user
//     })


// }

function login(credentials){
    console.log('credentials',credentials )
    const url = BASE_URL +  'login'
    return axios.post(url, credentials)
    .then(res => res.data)
    .then(user => {
        console.log('user after axios', user)
        const miniUser = {username: user.username, isAdmin: user.isAdmin}
        sessionStorage.setItem('loggedinUser', JSON.stringify(miniUser))
        return user
    })   
    .catch(err => {
        console.error('Error:', err)
    })

    
}


function signup(userInfo) {
    // userInfo.balance = 1000
    // userInfo.prefs = { color: '#0000ff', bgColor: '#c1c1c1' }
    // userInfo.activities = []

    return storageService.post(STORAGE_KEY, userInfo)
        .then((user) => {
            _handleLogin(user)
            return user
        })
}
// function updateBalance(diff) {

//     const user = userService.getLoggedinUser()
//     user.balance += diff
//     return storageService.put(STORAGE_KEY, user)
//         .then((user) => {
//             sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
//             return user.balance
//         })
// }
function logout() {
    const url = BASE_URL + 'logout'
    return axios.post(url).then(() => {
        sessionStorage.removeItem('loggedinUser')
    })
    // sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, null)
    // return Promise.resolve()
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _handleLogin(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
}

// function (activity) {
//     let user = getLoggedinUser()
//     user = {...user, activities: [...user.activities, activity]}
//     return storageService.put(STORAGE_KEY, user)
    
// }

// Test Data

// userService.signup({
//     username: 'muki',
//     password: 'muki',
//     fullname: 'Muki Ja',
//     balance: 10000,
//     prefs: { color: '#0000ff', bgColor: '#c1c1c1' },
//     activities: [{txt: 'Added a Toy', at: 1523873242735}]
// })

// userService.login({username: 'miki', password: 'miki'})


