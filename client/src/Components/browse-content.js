import React from 'react';
import './browse-content.css';

import Navbar from './navbar';
import {Footer} from './footer';

import { connect } from 'react-redux';
import { login } from '../Actions/action';

class Browse extends React.Component {

    constructor() {
        super();
        this.state = {
            js: undefined,
            content: undefined
        }
    }

    // Retrieve the JSON data of all the model posts
    GetJsonData () {
        fetch('http://localhost:4200/api/products/', {
            method: 'get'
        }).then(res =>
            res.json().then(json => {
                this.setState({ js: json});
            })
        );
    }

    componentDidMount () {
        this.GetJsonData();
    }

    contentClickHandler = (e) => {
        const targetLink = e.target.closest('a');
        const productTarget = "/product/" + targetLink.getAttribute('productID');
        if(!targetLink) return;
        e.preventDefault();
        this.props.history.push(productTarget)
    }

    render () {
        const { js } = this.state;
        if (js == null) return null;
        var products = js.map(item => 
            <div className='section'>
                <div className='section-info'>
                    <a href="/" productID={item.ID}>
                        <h2 className='section-title' product-id={item.ID}>{item.NAME} | ${item.PRICE}</h2>
                    </a>
                    <p className='section-description'>{item.DESCRIPTION}</p>
                </div>
                    <img className='section-image' src={item.IMG}/>
                <div class='clear'/>
            </div>
        )
        return (
            <div className="content">
                <Navbar/>
                <br></br>
                <br></br>
                <div className="modeling-content">
                    <h1>Browse Products</h1>

                    {js && <div className="content" onClick={this.contentClickHandler}>{products}</div>}

                    <div className="clear"/>
                </div>
                <Footer/>
            </div>
        );
    }
};

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
  
  export default connect(mapStateToProps, mapDispatchToProps)(Browse);