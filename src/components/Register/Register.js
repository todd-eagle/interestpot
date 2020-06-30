import React, {Component} from 'react';
import axios from 'axios'


class Register extends Component() {
   constructor(){
        super()
        this.state ={
            categories: [],
            articles: []
        }
    }



    render(){
        return(
            <div>This is the registration page</div>
        )
    }
}

export default Register;