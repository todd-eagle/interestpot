import React,  { useState }  from 'react'
import {connect} from 'react-redux';
import {login} from '../../redux/reducers/AuthReducer';
import {Link} from 'react-router-dom';
import Axios from 'axios';
import logo from '../../img/logo.png'
import './Auth.scss'

const Auth = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // const [confirm, setConfirm] = useState('')

    const handleSubmit = async e => {
        try {
        const register = await Axios.post('/api/auth/register', {email, password})
        console.log(register.data)
        props.login(register.data)
        props.history.push('/register');
        }catch{(console.error())}     
    }

    return (
        <>
        {/* {console.log(props)} */}
        <header class="header-page">
            <Link to="/">
            <div class="title-logo">  
                <img class="logo-home" src={logo} alt="InterestPot"/>
                <div class="title">
                    InterestPot
                </div>
                
            </div>
            </Link>
        </header>
        <div className="login-reg-page">
            <div className="login-box">
            <h2>On Your Marks...</h2>
                <p class="login-text">The most exciting part about starting a new journey is the anticpation.  Don't you think?</p>
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