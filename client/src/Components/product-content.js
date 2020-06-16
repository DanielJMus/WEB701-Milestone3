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
                console.log(json);
            })
        );
    }

    componentDidMount () {
        this.GetJsonData();
    }

    render () {
        const { js } = this.state;
        return (
            <div className="content">
                <Navbar/>
                <br></br>
                <br></br>
                <div className="product-container">
                    { js && <div className="product-header">{this.state.js[0].NAME}</div> }
                </div>
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
  