import authReducer from './reducers/AuthReducer'
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';

export default createStore(authReducer, applyMiddleware(promiseMiddleware))