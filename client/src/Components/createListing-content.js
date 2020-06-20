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
                        <h3>Listing Name:</h3>
                        <input className="input-name" ref={(ref) => {this.Name = ref}} type="text" name="name"></input><br></br>
                        <h3>Description</h3>
                        <textarea className="input-textarea" ref={(ref) => {this.Description = ref}} type="text" rows="15" name="description"></textarea><br></br>
                        <h3>Fruit:</h3>
                        <input className="input-name" ref={(ref) => {this.Fruit = ref}} type="text" name="fruit"></input><br></br>
                        <h3>Sugar (g):</h3>
                        <input className="input-name" ref={(ref) => {this.Sugar = ref}} type="number" name="sugar"></input><br></br>
                        <h3>Calories:</h3>
                        <input className="input-name" ref={(ref) => {this.Calories = ref}} type="number" name="calories"></input><br></br>
                        <h3>Image URL:</h3>
                        <input className="input-name" ref={(ref) => {this.URL = ref}} type="text" name="url"></input><br></br>
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
        // Calculate price
        fetch('http://localhost:4200/api/products', {
            method: 'post',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify({
                "NAME": this.Name.value,
                "DESCRIPTION": this.Description.value,
                "PRICE": 0,
                "CALORIES": this.Calories.value,
                "FRUIT": this.Fruit.value,
                "SUGAR": this.Sugar.value,
                "IMG": this.URL.value,
                "SELLERID": this.props.userID
            })
        }).then(res => {
            if (res.status === 201) {
                alert("Successfully created listing");
                this.setState({submitted:true});
            } else {
                alert(res.status);
            }
        });
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
  