import React from 'react';
import './contact-content.css';

import Navbar from './navbar';
import { Footer } from './footer';

import { connect } from 'react-redux';
import { login } from '../Actions/action';

class CreateListing extends React.Component {
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
                {/* If the user is not logged in */}
                { (!this.props.isLoginSuccess || !this.props.isSeller) &&
                    <div className="admin-panel">
                        <header>
                            <h1>ACCESS DENIED</h1>
                        </header>
                        <h2>You do not have access to this page, please log into a seller account.</h2>
                    </div>
                }

                {/* Main form */}
                { !this.state.submitted && this.props.isLoginSuccess && 
                    <form className="input-form" onSubmit={this.handleSubmit}>
                        <h3>Name:</h3>
                        <input className="input-name" ref={(ref) => {this.Name = ref}} type="text" name="name"></input><br></br>
                        <h3>Message:</h3>
                        <textarea className="input-textarea" ref={(ref) => {this.Content = ref}} type="text" rows="15" name="content"></textarea><br></br>
                        <input className="input-submit" type="submit" value="Submit"></input>
                    </form> 
                }

                {/* Submission confirmation */}
                { this.state.submitted && 
                    <h2 className="input-submitted">Auction listing created successfully!</h2>
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
    }
};

// Retrieve the redux state and add it to the component properties.
const mapStateToProps = (state) => {
    return {
        isLoginPending: state.isLoginPending,
        isLoginSuccess: state.isLoginSuccess,
        isLoginError: state.isLoginError,
        isSeller: state.isSeller,
        userID: state.userID
    };
  }
  
const mapDispatchToProps = (dispatch) => {
    return {
        login: (username, password) => dispatch(login(username, password))
    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(CreateListing);
  