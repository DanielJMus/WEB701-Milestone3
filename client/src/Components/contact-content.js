import React from 'react';
import './contact-content.css';

import Navbar from './navbar';
import { Footer } from './footer';

import { connect } from 'react-redux';
import { login } from '../Actions/action';

class Contact extends React.Component {

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = { 
            submitted: false
        }
    }

    render () {
        return (
            <div className="content">
                <Navbar/>
                <br></br>
                <br></br>
                <div className="contact-content">
                <h1>Contact Me</h1>
                { !this.state.submitted && <form className="input-form" onSubmit={this.handleSubmit}>
                    <h3>Name:</h3>
                    <input className="input-name" ref={(ref) => {this.Name = ref}} type="text" name="name"></input><br></br>
                    <h3>Message:</h3>
                    <textarea className="input-textarea" ref={(ref) => {this.Content = ref}} type="text" rows="15" name="content"></textarea><br></br>
                    <input className="input-submit" type="submit" value="Submit"></input>
                </form> }
                {/* Display a message after the user submits their message */}
                { this.state.submitted && 
                    <h2 className="input-submitted">Thank you for your inquiry!<br></br>I will try to respond as soon as possible.</h2>
                }
                <div className="clear"/>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                </div>
                <Footer/>
            </div>
        );
    }

    // Submit the mail message, opening the mail app with the contents of the form.
    handleSubmit(e) {
        e.preventDefault();
        this.setState({submitted:true});
        window.location.href = "mailto:danielmus1999@hotmail.com?subject=Inquiry%20from%20" + this.Name.value + "&body=" + this.Content.value;
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
  
export default connect(mapStateToProps, mapDispatchToProps)(Contact);
  