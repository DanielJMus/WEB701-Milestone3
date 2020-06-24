import React from 'react';
import './contact-content.css';

import Navbar from './navbar';
import { Footer } from './footer';

import './createListing-content.css';

import { connect } from 'react-redux';
import { login } from '../Actions/action';

class CreateListing extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.calculatePrice = this.calculatePrice.bind(this);
        this.state = { 
            submitted: false,
            priceEstimation: 0
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
                    <form className="input-form" onSubmit={this.handleSubmit} onChange={this.calculatePrice}>
                        <h3>Listing Name:</h3>
                        <input className="input-name" ref={(ref) => {this.Name = ref}} type="text" name="name"></input><br></br>
                        <h3>Description</h3>
                        <textarea className="input-textarea" ref={(ref) => {this.Description = ref}} type="text" rows="15" name="description"></textarea><br></br>
                        <h3>Fruit:</h3>
                        <input className="input-name" ref={(ref) => {this.Fruit = ref}} type="text" name="fruit"></input><br></br>
                        <h3>Energy (Kcal):</h3>
                        <input className="input-name" ref={(ref) => {this.Energy = ref}} type="number" name="energy" defaultValue="0"></input><br></br>
                        <h3>Carbohydrates (g):</h3>
                        <input className="input-name" ref={(ref) => {this.Carbohydrates = ref}} type="number" name="carbohydrates" defaultValue="0"></input><br></br>
                        <h3>Sugar (g)</h3>
                        <input className="input-name" ref={(ref) => {this.Sugar = ref}} type="number" name="sugar" defaultValue="0"></input><br></br>
                        <h3>Sodium (mg)</h3>
                        <input className="input-name" ref={(ref) => {this.Sodium = ref}} type="number" name="sodium" defaultValue="0"></input><br></br>
                        <h3>Vitamin C (mg)</h3>
                        <input className="input-name" ref={(ref) => {this.VitaminC = ref}} type="number" name="vitaminc" defaultValue="0"></input><br></br>
                        <h3>Image URL:</h3>
                        <input className="input-name" ref={(ref) => {this.URL = ref}} type="text" name="url"></input><br></br>
                        <h2>Estimated Price: ${this.state.priceEstimation} / L</h2>
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
                "PRICE": this.state.priceEstimation,
                "FRUIT": this.Fruit.value,
                "ENERGY": this.Energy.value,
                "CARBOHYDRATES": this.Carbohydrates.value,
                "SUGAR": this.Sugar.value,
                "SODIUM": this.Sodium.value,
                "VITAMINC": this.VitaminC.value,
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

    calculatePrice(e)
    {
        // Have to estimate basic price based on amount of stuff included
        // 1 liter bottle is around: 
        var estimatedPrice =    (parseFloat(this.Energy.value) + 
                                parseFloat(this.Carbohydrates.value) + 
                                parseFloat(this.Sugar.value) +
                                parseFloat(this.Sodium.value) + 
                                parseFloat(this.VitaminC.value)) / 100;
        // Add on other prices to ensure good profit margin, such as cost of bottle and packaging/sending
        estimatedPrice += 2.00;
        if(isNaN(estimatedPrice))
        {
            estimatedPrice = 0;
        }
        this.setState({priceEstimation: estimatedPrice.toFixed(2)});
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
  