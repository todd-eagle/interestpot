import React from 'react';
import {connect} from 'react-redux';


function Home() {
    return (
      <div>
          <p>This is the home page</p>
      </div>
    );
}

const mapStateToProps =  reduxState => reduxState
export default connect(mapStateToProps)(Home)