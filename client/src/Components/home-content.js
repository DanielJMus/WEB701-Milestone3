import React from 'react';
import './home-content.css';

import Navbar from './navbar';
import {Footer} from './footer';
import './Chat.css';

import { login } from '../Actions/action';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            search: '',
            searchSubmitted: false
         }
    }

    componentWillMount ()
    {
        document.title = "Fresh Fruit Juice";
    }

    checkSearch = (e) => {
        this.setState({search: e.target.value});
        if(e.key === 'Enter')
        {
            this.setState({searchSubmitted: true});
            console.log("Enter");
        }
    }

    render () {

        if (this.state.searchSubmitted)
        {
            var destination = "browse/" + this.state.search;
            return <Redirect push to={destination}/>
        }

        return (
            <div className="home-content">
                <Navbar/>
                <br></br>
                <br></br>
                <img className="home-banner" src={require("../Images/home-banner.jpg")}></img>
                <div className="searchbar-container">
                    <h2 className="search-header">What are you looking for?</h2>
                    <input className="searchbar" type="text" onKeyPress={this.checkSearch}  placeholder="Search.."/>
                    <div className="clear"></div>
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(Home);
  