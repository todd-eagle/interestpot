import React, {useState} from 'react';
import {connect} from 'react-redux';
import './Home.scss'
import logo from '../../img/logo.png'


function Home() {

  const [isMenuOpen, setMenu] = useState(false);

  const toggleMenu = () => setMenu(!isMenuOpen)

  const renderMenu = () => {
    return <nav className="menu">
              <span className="nav-icon nav-icon__close" onClick={() => toggleMenu()}>&nbsp;</span>
                <div className="menu-box">
                    <a href="#" className="menu-item">Login</a>
                    <a href="#"  className="menu-item">Register</a>
                    <a href="#"  className="menu-item">Account</a>
                </div>    
          </nav>
  }
    return (
      <>
            <div className="header-home">
            <div className="title-logo">
                <img className="logo-home" src={logo} />
                <div className="title">
                    InterestPot
                </div>
            </div>
           <div className="menu-content" onClick={() => toggleMenu()}>
            <span className="nav-icon">&nbsp;</span>
            {isMenuOpen ? renderMenu() : null}
        </div>
        </div>
        <div className="hero">
            <div className="hero-content">
                <div className="hero-left">
                    <h1>All Your Interests in one Convenient Space.</h1>
                    <p>
                       Tell us your interests and leave the rest to us. 
                    </p>
                    <button className="btn">Get Started</button>
                </div>
                <div className="hero-right"></div>

            </div>
        </div>
        <main className="page-main">

        </main>
      </>
    );
}

const mapStateToProps =  reduxState => reduxState
export default connect(mapStateToProps)(Home)