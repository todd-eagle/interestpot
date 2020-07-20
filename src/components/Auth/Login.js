import React,  { useState }  from 'react'
import {connect} from 'react-redux';
import {login} from '../../redux/reducers/AuthReducer';
import {Link} from 'react-router-dom';
import axios from 'axios';
import logo from '../../img/logo.png'
import './Auth.scss'

const Login = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async e => {
        try {
        const loggedIn = await axios.post('/api/auth/login', {email, password})
        console.log("loggedIn: ", loggedIn)
        props.login(loggedIn.data)
        props.history.push('/Landing');
        }catch{(console.error())}     
    }

    return (
        <>
        {/* {console.log("props: ", props)} */}
        <header className="header-page">
            <Link to="/">
            <div className="title-logo">  
                <img className="logo-home" src={logo} alt="InterestPot"/>
                <div className="title">
                    InterestPot
                </div>    
            </div>
            </Link>
        </header>
        <div className="login-reg-page">
            <div className="login-box">
            <h2>Welcome Back!.</h2>
                <p className="login-text">We missed you.</p>
                <input type="text" className="authInput" id="email" 
                name="email" placeholder="Email" required onChange={e => setEmail(e.target.value)} />
                <input type="password" className="authInput"
                id="password" name="password" placeholder="Password" required onChange={e => setPassword(e.target.value)} />
                <button className="btn login"  onClick={handleSubmit}>What did I miss?</button>

            </div>
        </div>
        </>
    )
}

const mapStateToProps =  reduxState => reduxState
export default connect(mapStateToProps, {login})(Login)