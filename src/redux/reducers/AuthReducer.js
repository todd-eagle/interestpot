import axios from 'axios'

const initialState = {
   user: {},
   isLogdgedIn: false
}

const LOGIN_USER = 'LOGIN_USER'
const LOGOUT_USER = 'LOGOUT_USER'

export const login = (user) => {
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
    console.log(action.type)
    switch (action.type) {
        case LOGIN_USER:
            return{...state, user: action.payload, isLogdgedIn: true}
        case LOGOUT_USER  + '_FULFILLED':
            return{...state, ...action.payload}
        default:
            return initialState

    }
}
