import React, { useEffect } from 'react';
import routes from './routes';
import {connect} from 'react-redux';
import {login} from './redux/reducers/AuthReducer';



import './App.scss';
import Axios from 'axios';

function App(props) {
  useEffect( async () => {
    // console.log("useEffects")
    const user = await Axios.get('/api/auth/session')
    props.login(user.data)
   }, [])

  return (
    <div className="App">
      {routes}
    </div>
  )
}

const mapStateToProps = reduxState => reduxState
export default connect(mapStateToProps,  {login})(App)