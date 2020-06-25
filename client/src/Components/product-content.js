import React from 'react';
import './product-content.css';

import Navbar from './navbar';
import { Footer } from './footer';

import Bid from './bid-content';

import { connect } from 'react-redux';
import { login } from '../Actions/action';

class Product extends React.Component {

    constructor() {
        super();
        this.state = {
            js: undefined,
            seller: undefined,
            content: undefined
        }
    }

    // Retrieve the JSON data of all the model posts
    GetJsonData () {
        fetch('http://localhost:4200/api/products/' + this.props.match.params.productID, {
            method: 'get'
        }).then(res =>
            res.json().then(json => {
                this.setState({ js: json});
                this.GetSellerData();
            })
        );
    }

    GetSellerData () {
        fetch('http://localhost:4200/api/seller/' + this.state.js[0].SELLERID, {
            method: 'get'
        }).then(res =>
            res.json().then(json => {
                this.setState({ seller: json});
            })
        );
    }

    componentDidMount () {
        this.GetJsonData();
    }

    render () {
        const { js, seller } = this.state;
        return (
            <div className="content">
                <Navbar/>
                <br></br>
                <br></br>
                { js && seller &&
                <div className="product-container">
                    <div className="product-header">{js[0].NAME}</div> 
                    <img className="product-image" src={js[0].IMG}/>
                    <div className="product-info">
                        <p>{js[0].DESCRIPTION}</p>
                        <h2>Product Details</h2>
                        <p><b>Fruit:</b> {js[0].FRUIT}</p>
                        <p><b>Energy:</b> {js[0].ENERGY} Kcal</p>
                        <p><b>Carbohydrates:</b> {js[0].CARBOHYDRATES}g</p>
                        <p><b>Sugar:</b> {js[0].SUGAR}g</p>
                        <p><b>Sodium:</b> {js[0].SODIUM}mg</p>
                        <p><b>Vitamin C:</b> {js[0].VITAMINC}mg</p>
                    </div>
                    <div className="product-seller">
                        <h2>Seller Contact Info</h2>
                        <p><b>Seller:</b> {seller[0].USERNAME}</p>
                        <p><b>Email:</b> <a href={`mailto:danielmus1999@hotmail.com?subject=Inquiry%20about%20${js[0].NAME}`}>{seller[0].EMAIL}</a></p>
                    </div>
                </div>
                }
                
                <div className="bid-container">
                    {js && <Bid productID={this.state.js[0].ID}/>}
                </div>
                <div className="clear"></div>
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(Product);
  