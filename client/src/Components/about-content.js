import React from 'react';
import './about-content.css';

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
                <div className="about-content">
                    <h1>Welcome to Fresh Fruit Juice!</h1>
                    <br></br>
                    <br></br>
                    <p className="about-text">
                        <h2>Who are we?</h2><br></br>
                        Fresh Fruit Juice aims to create an easy to use online marketplace for fresh juice products around the nation.<br></br>
                        Our goal is to provide a collaborative central hub for all NZ juice manufacturers to promote and sell their products, allowing customers to inquire about or purchase these products
                        from listings without having to leave the site.
                    </p>
                    <img className="about-img" src="https://images.unsplash.com/photo-1578859970983-18494e57c008"></img>
                    <div className="clear"></div>
                </div>
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
  