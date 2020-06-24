import React from 'react';
import './register-content.css';

import Navbar from './navbar';
import { Footer } from './footer';

import { connect } from 'react-redux';
import { login } from '../Actions/action';

class Register extends React.Component {

    componentWillMount ()
    {
        document.title = "About | Fresh Fruit Juice";
    }

    render () {
        return (
            <div className="content">
                <Navbar/>
                <br></br>
                <br></br>
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
        isSeller : state.isSeller
    };
  }
  
const mapDispatchToProps = (dispatch) => {
    return {
        login: (username, password) => dispatch(login(username, password))
    };
}
  
  export default connect(mapStateToProps, mapDispatchToProps)(Register);
  