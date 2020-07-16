import React,  { useState }  from 'react'
import {connect} from 'react-redux';
import {login} from '../../redux/reducers/AuthReducer';
import Axios from 'axios';

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
        {console.log(props)}
        <div className="auth">
            <input type="text" className="authInput" id="email" 
            name="email" placeholder="Email" required onChange={e => setEmail(e.target.value)} />
            <input type="password" className="authInput"
             id="password" name="password" placeholder="Password" required onChange={e => setPassword(e.target.value)} />
            {/* <input type="password" className="authInput" id="confirm" name="confirm" placeholder="Conform Password" required /> */}
        </div>
        <div className="btn-container" onClick={handleSubmit}><button className="btn">Pick Your Interests!</button></div>
        </>
    )
}

const mapStateToProps =  reduxState => reduxState
export default connect(mapStateToProps, {login})(Auth)