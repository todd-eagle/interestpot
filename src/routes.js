  
import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Register from './components/Register/Register'
import Dashboard from './components/Dashboard/Dashboard'
import Landing from './components/Landing/Landing-1'
import HomePage from './components/Home/Home'
import Auth from './components/Auth/Auth'
import Login from './components/Auth/Login'
import Profile from './components/Profile/Profile'

export default (
    <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/landing" component={Landing} />
        <Route path="/register" component={Register} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/auth" component={Auth} />
        <Route path="/login" component={Login} />
        <Route path="/profile" component={Profile} />
    </Switch>
)
