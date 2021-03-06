import React,  { useState }  from 'react'
import {connect} from 'react-redux';
import {login} from '../../redux/reducers/AuthReducer';
import {Link} from 'react-router-dom';
import axios from 'axios';
import logo from '../../img/logo.png'
import './Auth.scss'

const Auth = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async e => {
        try {
        const register = await axios.post('/api/auth/register', {email, password})
        console.log("register: ", register)
        props.login(register.data)
        props.history.push('/register');
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
            <h2>On Your Marks...</h2>
                <p className="login-text">The most exciting part about starting a new journey is the anticpation.  Don't you think?</p>
                <input type="text" className="authInput" id="email" 
                name="email" placeholder="Email" required onChange={e => setEmail(e.target.value)} />
                <input type="password" className="authInput"
                id="password" name="password" placeholder="Password" required onChange={e => setPassword(e.target.value)} />
                <button className="btn login"  onClick={handleSubmit}>Let's Go!</button>

            </div>
        </div>
        </>
    )
}

const mapStateToProps =  reduxState => reduxState
export default connect(mapStateToProps, {login})(Auth)