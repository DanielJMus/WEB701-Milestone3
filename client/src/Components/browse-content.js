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

    // Format the JSON data of the posts into displayable HTML
    GetProducts () {
        var jsonFinal = "";
        for(var i = 0; i < this.state.js.length; i++) {
            jsonFinal +=    "<div class='section'>" +
                                "<div class='section-info'>" +
                                    "<a href='../product/" + this.state.js[i].ID + "'><h2 class='section-title' product-id='" + this.state.js[i].ID + "'>" + this.state.js[i].NAME + " | $" + this.state.js[i].PRICE +"</h2></a>" +
                                    "<p class='section-description'>" + this.state.js[i].DESCRIPTION + "</p>" +
                                "</div>" +
                                "<img class='section-image' src='" + this.state.js[i].IMG + "'/>" +
                                "<div class='clear'/>" +
                            "</div></div>";
        }
        return jsonFinal;
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
                <div className="modeling-content">
                    <h1>Browse Products</h1>

                    {js && <div className="content" dangerouslySetInnerHTML={{ __html: this.GetProducts() }}></div>}

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