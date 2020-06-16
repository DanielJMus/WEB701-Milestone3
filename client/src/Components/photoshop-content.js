import React from 'react';
import './photoshop-content.css';
import { Link } from 'react-router-dom';

import Navbar from './navbar';
import {Footer} from './footer';

import { connect } from 'react-redux';
import { login } from '../Actions/action';
 
class Photoshop extends React.Component {

    constructor() {
        super();
        this.state = {
            js: undefined,
        }
    }

    // Retrieve the JSON data of all the photoshop
    getPhotos () {
        fetch('http://localhost:4200/api/photoshops/', {
            method: 'get'
        }).then(res =>
            res.json().then(json => {
                this.setState({ js: json});
            })
        );
    }

    // Format the JSON data of the photos into their respective columns
    getPhotoColumn (column) {
        var jsonFinal = "";
        for(var i = column; i < this.state.js.length; i+=3) {
            jsonFinal += "<img className='img' src='" + this.state.js[i].ImageUrl + "' title='" + this.state.js[i].Title + "'/>";
        }
        return jsonFinal;
    }

    componentDidMount () {
        this.getPhotos();
    }

    render () {
        const { js } = this.state;
        return (
            <div className="content">
                <Navbar/>
                <div className="photoshop-content">
                    <br></br>
                    <br></br>
                    <h1>Restoration, Colorization, Manipulation</h1>
                    <h2 className="quote">7 Years of Photoshop Experience</h2>

                    <h2 className="quote"><Link to="/contact" className="quote-button">Get a Quote</Link></h2>

                    {js && <div className="column" dangerouslySetInnerHTML={{ __html: this.getPhotoColumn(0) }}></div>}

                    {js && <div className="column" dangerouslySetInnerHTML={{ __html: this.getPhotoColumn(1) }}></div>}

                    {js && <div className="column" dangerouslySetInnerHTML={{ __html: this.getPhotoColumn(2) }}></div>}

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
  
  export default connect(mapStateToProps, mapDispatchToProps)(Photoshop);