import React from 'react';
import './home-content.css';

import Navbar from './navbar';
import {Footer} from './footer';
import './Chat.css';

import { login } from '../Actions/action';
import { connect } from 'react-redux';

export class Home extends React.Component {
    render () {
        return (
            <div className="home-content">
                <Navbar/>
                <br></br>
                <br></br>
                <h1>HOME PAGE</h1>
                <Footer/>
            </div>
        );
    }
};

// Retrieve the redux state and add it to the component properties.
const mapStateToProps = (state) => {
    return {
        isLoginPending: state.isLoginPending,
        isLoginSuccess: state.isLoginSuccess,
        isLoginError: state.isLoginError,
        isAdministrator: state.isAdministrator
    };
  }
  
const mapDispatchToProps = (dispatch) => {
    return {
        login: (username, password) => dispatch(login(username, password))
    };
}
  
  export default connect(mapStateToProps, mapDispatchToProps)(Home);
  