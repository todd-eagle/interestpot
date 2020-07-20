import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import axios from 'axios'
import {logout} from '../../redux/reducers/AuthReducer';
import logo from './../../img/logo.png'
import './Profile.scss'

const Profile = (props) => {

    useEffect( () => {
        if(!props.isLoggedIn){props.history.push('/login')}
       }, [])

    const [email, updateEmail] = useState(`${props.user.email}`)
    const [password, updatePassword] = useState('')
    const [isMenuOpen, setMenu] = useState(false);

    const toggleMenu = () => setMenu(!isMenuOpen)
  
    let isSucessful

    const handleSubmit = async e => {
        try {
        const updated = await axios.put(`/api/auth/user/${props.user.id}`, {email})
        console.log("updated: ", updated)
        isSucessful=true
        // props.login(loggedIn.data)
        }catch{
            console.error()
            isSucessful =false
        }     
    }

    const renderMenu = () => {
        return <nav className="menu">
                  <span className="nav-icon nav-icon__close" onClick={() => toggleMenu()}>&nbsp;</span>
                    <div className="menu-box">
                        <Link onClick={e => props.logout()} className="menu-item" to='/login'>Logout</Link>
                        <Link className="menu-item" to='/landing'>Your Site</Link>
                        <Link className="menu-item"  to='/dashboard'>Interests Dashboard</Link>
                    </div>    
              </nav>
      }

    return <>
        <div className="header-profile">
            <Link to="/landing">
            <div className="title-logo">
                <img className="logo-home" src={logo} alt="InterestPot" />
                <div className="title">
                    InterestPot
                </div>
            </div>
            </Link>    
            <div className="menu-content" onClick={() => toggleMenu()}>
            <span className="nav-icon">&nbsp;</span>
            {isMenuOpen ? renderMenu() : null}
            </div>
        </div> 
        <div className="profile-page">
            <div className="profile-box">
                <h2>My Profile</h2>
                <p className="profile-text">
                    Yes it's simple, but beauty lies in it's simplicity.
                </p>
                    <p className="profile-text">Change Email</p>
                    <input type="text" name="email" id="email" placeholder="Email" value={email}
                    onChange={e => updateEmail(e.target.value)}/>
                    <button className="btn" onClick={handleSubmit}>Update Email</button>
                {/* <div className="password-change">
                    <p>Update Password</p>
                    <input type="text" name="password" id="password" placeholder="Password" value={props.password}
                    onChange={e => updatePassword(e.target.value)}/>
                    <button className="button">Update Email</button>
                </div> */}
            </div>
        </div>
        </>
}

const mapStateToProps =  reduxState => reduxState
export default connect(mapStateToProps, {logout})(Profile)