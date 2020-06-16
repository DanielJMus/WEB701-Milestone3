import React from 'react'

import './dashboard-content.css';

import Navbar from '../../navbar';
import {Footer} from '../../footer';

import { connect } from 'react-redux';
import { login } from '../../../Actions/action';
import { logout } from '../../../Actions/action';

class Dashboard extends React.Component {  

    constructor() {
        super();
        this.state = {
            js: undefined,
            content: undefined
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.DeleteAccount = this.DeleteAccount.bind(this);
    }

    // Submit the form data, adding the specified user data to the database.
    handleSubmit(event) {
        event.preventDefault();
        fetch('http://localhost:4200/api/users/' + this.props.userID, {
            method: 'put',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                "USERNAME": this.Name.value,
                "EMAIL": this.Email.value,
                "PASSWORD": this.Password.value
            })
        }).then(res => {
            if (res.status === 201 || res.status === 204) {
                alert("Successfully updated account. Please log in again.")
                this.props.logout();
                this.props.history.push('/login')
            }
            else alert(res.status)
        });
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
        this.GetJsonData();
    }

    // Format the JSON data of the posts into displayable HTML
    GetSellerListings () {
        var jsonFinal = "";
        for(var i = 0; i < this.state.js.length; i++) {
            jsonFinal +=    "<div class='listing-section'>" +
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

    DeleteAccount () {
        fetch('http://localhost:4200/api/users/' + this.props.userID, {
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

    render() {
        const { js } = this.state;
        return(
            <div className="content">
                <Navbar/>
                { /* If the user is not logged in, or is not an administrator, hide the page content. Otherwise render it. */
                this.props.isLoginSuccess &&
                <div className="admin-panel">
                    <header>
                        <h1>Dashboard</h1>
                    </header>
                    <div className="admin-input-panel">
                        <h3>Update Account Details</h3>
                        <form onSubmit={this.handleSubmit}>
                            <label>
                                Change Username:<br></br>
                                <input ref={(ref) => {this.Name = ref}} type="text" id="input-name" name="name"/>
                            </label><br></br>
                            <br></br>
                            <label>
                                Change Email:<br></br>
                                <input ref={(ref) => {this.Email = ref}} type="text" id="input-email" name="email"/>
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
                                <div className="seller-listings" dangerouslySetInnerHTML={{ __html: this.GetSellerListings() }}></div>
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
  