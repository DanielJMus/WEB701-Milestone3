import React from 'react';
import './gamedev-content.css';
import { Link } from "react-router-dom";

import Navbar from './navbar';
import { Footer } from './footer';

import { connect } from 'react-redux';
import { login } from '../Actions/action';

class Gamedev extends React.Component {

    constructor() {
        super();
        this.state = {
            js: undefined,
            content: undefined
        }
    }

    // Retrieve the JSON data of all the gamedev posts
    getJsonData () {
        fetch('http://localhost:4200/api/gamedev/', {
            method: 'get'
        }).then(res =>
            res.json().then(json => {
                this.setState({ js: json});
            })
        );
    }

    // Format the JSON data of the posts into displayable HTML
    getArticles () {
        var jsonFinal = "";
        for(var i = 0; i < this.state.js.length; i++) {
            jsonFinal +=    "<div class='section'>" +
                                "<div class='section-info'>" +
                                    "<h2 class='section-title'>" + this.state.js[i].Title +"</h2>" +
                                    "<p class='section-description'>" + this.state.js[i].Description + "</p>" +
                                "</div>" +
                                "<img class='section-image' src=" + this.state.js[i].ImageUrl + "/>" +
                                "<div class='clear'/>" +
                            "</div></div>";
        }
        return jsonFinal;
    }

    componentDidMount () {
        this.getJsonData();
    }

    render () {
        const { js } = this.state;
        return (
            <div className="content">
                <Navbar/>
                <br></br>
                <br></br>
                <div className="gamedev-content">
                    <h1>6 Years of Unity3D Games and Assets</h1>
                    <h2 className="quote"><Link to="/contact" className="quote-button">Get a Quote</Link></h2>

                    {js && <div className="content" dangerouslySetInnerHTML={{ __html: this.getArticles() }}></div>}

                    <div className="clear"/>
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
        isAdministrator: state.isAdministrator
    };
  }
  
const mapDispatchToProps = (dispatch) => {
    return {
        login: (username, password) => dispatch(login(username, password))
    };
}
  
  export default connect(mapStateToProps, mapDispatchToProps)(Gamedev);