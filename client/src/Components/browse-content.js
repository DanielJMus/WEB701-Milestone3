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

        var url = "http://localhost:4200/api/";
        if(this.props.match.params.search != null) {
            url += "fruitproducts/" + this.props.match.params.search.toLowerCase();
        } else {
            url += 'products'
        }

        fetch(url, {
            method: 'get'
        }).then(res =>
            res.json().then(json => {
                this.setState({ js: json});
            })
        );
    }

    componentDidMount () {
        document.title = "Browse | Fresh Fruit Juice";
        this.GetJsonData();
    }

    contentClickHandler = (e) => {
        const targetLink = e.target.closest('a');
        if(!targetLink) return;
        const productTarget = "/product/" + targetLink.getAttribute('productid');
        e.preventDefault();
        this.props.history.push(productTarget)
    }

    render () {
        const { js } = this.state;
        if (js == null) return null;
        var products = js.map(item => 
            <div className='section'>
                <img alt="" className='section-image' src={item.IMG}/>
                <div className='section-info'>
                    <a href="/" productid={item.ID}>
                        <h2 className='section-title' product-id={item.ID}>{item.NAME}</h2>
                    </a>
                    <h3 className='section-title'>${item.PRICE} / L</h3>
                    <p className='section-description'>{item.DESCRIPTION}</p>
                </div>
            </div>
        )
        return (
            <div className="content">
                <Navbar/>
                <br></br>
                <br></br>
                <div className="product-content">
                    <h1>Browse Products</h1>

                    {js && <div className="products" onClick={this.contentClickHandler}>{products}</div>}

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