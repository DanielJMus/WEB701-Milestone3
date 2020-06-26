import React from 'react'

import './dashboard-content.css';

import Navbar from '../../navbar';
import {Footer} from '../../footer';

import { Link } from "react-router-dom";

import { connect } from 'react-redux';
import { login } from '../../../Actions/action';
import { logout } from '../../../Actions/action';

const bcrypt = require('bcryptjs');

class Dashboard extends React.Component {  

    constructor() {
        super();
        this.state = {
            js: undefined,
            user: undefined,
            content: undefined
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.DeleteAccount = this.DeleteAccount.bind(this);
    }

    // Submit the form data, adding the specified user data to the database.
    handleSubmit(event) {
        event.preventDefault();
        let username = this.Name.value;
        let email = this.Email.value;
        let password = this.Password.value;
        if(username.length <= 1 || email.length <= 1 || password.length <= 1)
        {
            alert("Update fields cannot be null.");
            return;
        }
        bcrypt.hash(password, 10, function(err, hash) {
            fetch('http://localhost:4200/api/users/' + this.props.userID, {
                method: 'put',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({
                    "USERNAME": username,
                    "EMAIL": email,
                    "PASSWORD": hash
                })
            }).then(res => {
                if (res.status === 201 || res.status === 204) {
                    alert("Successfully updated account. Please log in again.")
                    this.props.logout();
                    this.props.history.push('/login')
                }
                else alert(res.status)
            });
        });
    }

    GetUserData () {
        fetch('http://localhost:4200/api/seller/' + this.props.userID, {
            method: 'get'
        }).then(res =>
            res.json().then(json => {
                this.setState({ user: json});
            })
        );
    }

    // Retrieve the JSON data of all the user's listings
    GetJsonData () {
        fetch('http://localhost:4200/api/listings/' + this.props.userID, {
            method: 'get'
        }).then(res =>
            res.json().then(json => {
                this.setState({ js: json});
            })
        );
    }

    componentDidMount () {
        document.title = "Dashboard | Fresh Fruit Juice";
        this.GetJsonData();
        this.GetUserData();
    }

    DeleteAccount () {
        fetch('http://localhost:4200/api/seller/' + this.props.userID, {
            method: 'delete',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                "ID": this.props.userID
            })
        }).then(res => {
            if(res.status === 200)
            {
                alert("Deleted account successfully");
                this.props.logout();
                this.props.history.push('/');
            }
        });
    }

    contentClickHandler = (e) => {
        const targetLink = e.target.closest('a');
        if(!targetLink) return;
        const productTarget = "/product/" + targetLink.getAttribute('productid');
        e.preventDefault();
        this.props.history.push(productTarget)
    }

    render() {
        const { js, user } = this.state;
        if (!this.props.isLoginSuccess)
        {
            this.props.history.push('/Login');
        }
        if (js == null || user == null || !this.props.isLoginSuccess) return null;
        var products = this.props.isSeller && js.map(item => 
                <div className="section">
                    <img alt="" className='section-image' src={item.IMG}/>
                    <div className='section-info' onClick={this.contentClickHandler}>
                        <a href="/" productid={item.ID}>
                            <h2 className='section-title' product-id={item.ID}>{item.NAME} | ${item.PRICE}</h2>
                        </a>
                        <p className='section-description'>{item.DESCRIPTION}</p>
                    </div>
                    <div className='clear'/>
                </div>
        )
        return(
            <div className="content">
                <Navbar/>
                { /* If the user is not logged in, or is not an administrator, hide the page content. Otherwise render it. */
                js && user && this.props.isLoginSuccess &&
                <div className="admin-panel">
                    <header>
                        <h1>Dashboard</h1>
                    </header>
                    <div className="admin-input-panel">
                        <h3>Update Account Details</h3>
                        <form onSubmit={this.handleSubmit}>
                            <label>
                                Change Username:<br></br>
                                <input ref={(ref) => {this.Name = ref}} type="text" id="input-name" value={user.USERNAME} name="name"/>
                            </label><br></br>
                            <br></br>
                            <label>
                                Change Email:<br></br>
                                <input ref={(ref) => {this.Email = ref}} type="text" id="input-email" value={user.EMAIL} name="email"/>
                            </label><br></br>
                            <br></br>
                            <h3>Update Password</h3>
                            <label>
                                New Password:<br></br>
                                <input ref={(ref) => {this.Password = ref}} type="password" id="input-newpassword" name="newpassword"/>
                            </label><br></br>
                            <input type="submit" id="input-submit" value="Update Account"/>
                        </form>
                        <button className="delete-account" onClick={this.DeleteAccount}>Delete Account</button>
                        <br></br>
                        <br></br>
                        {
                            js && this.props.isSeller &&
                            <div className="content">
                                <h2>Your Listings</h2>
                                <Link to="/createListing">
                                    <button className="create-listing">Create Listing</button>
                                </Link>
                                <div className="seller-listings">{products}</div>
                            </div>
                        }
                    </div>
                </div>
                }
                {
                !this.props.isLoginSuccess &&
                <div className="admin-panel">
                    <header>
                        <h1>ACCESS DENIED</h1>
                    </header>
                    <h2>You do not have access to this page, please log into an account.</h2>
                </div>
                }
                <Footer/>
            </div>
        )
    }
}

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
        login: (username, password) => dispatch(login(username, password)),
        logout: () => dispatch(logout())
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
  