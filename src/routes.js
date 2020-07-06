  
import React from 'react';
import {Switch, Route} from 'react-router-dom';
import AuthForm from './components/Form/Form'
import Register from './components/Register/Register'
import Dashboard from './components/Dashboard/Dashboard'
import Landing from './components/Landing/Landing-1'
import HomePage from './components/Home/Home'

export default (
    <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/landing" component={Landing} />
        <Route path="/register" component={Register} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="auth" component={AuthForm}  />
    </Switch>
)
