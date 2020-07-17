import axios from 'axios'

const initialState = {
   user: {},
   isLoggedIn: false
}

const LOGIN_USER = 'LOGIN_USER'
const LOGOUT_USER = 'LOGOUT_USER'

export const login = (user) => {
    console.log("user redux", user)
    return {
        type: LOGIN_USER, 
        payload: user
    }
}

export const logout = () => {
    const destroySession = axios.delete('/api/auth/logout')
    console.log('Destroyed session = ',destroySession)
    return {
        type: LOGOUT_USER,
        payload: initialState
    }
}

export default function (state = initialState, action){
    console.log("Action Type",action.type)
    switch (action.type) {
        case LOGIN_USER:
            return{...state, user: action.payload, isLoggedIn: true}
        case LOGOUT_USER  + '_FULFILLED':
            return{...state, ...action.payload}
        default:
            return initialState
    }
}
