import authReducer from './reducers/AuthReducer'
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';


export default createStore(authReducer,  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())