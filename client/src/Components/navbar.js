import React from 'react';
import { Link } from "react-router-dom";
import '../App.css';

import { connect } from 'react-redux';
import { login } from '../Actions/action';
import { logout } from '../Actions/action';

class Navbar extends React.Component {
    logout = (e) => {
        e.preventDefault();
        this.props.logout();
    }

    render () {
        return (
            <div className="nav-bar">
                <h1 className="nav-title">FRESH FRUIT JUICE</h1>
                <nav>
                    <ul>
                        <li className="nav-item"><Link to="/">Home</Link></li> 
                        <li className="nav-item"><Link to="/browse">Browse</Link></li> 
                        <li className="nav-item"><Link to="/about">About</Link></li> 
                        <li className="nav-item"><Link to="/contact">Contact</Link></li> 
                        {/* Display login button if user is not logged in */}
                        {
                            !this.props.isLoginSuccess &&
                            <li className="nav-item"><Link to="/login">Login</Link></li>
                        }
                        {/* Display admin panel button if the current user is an admin */}
                        {
                            this.props.isLoginSuccess &&
                            <li className="nav-item"><Link to="/dashboard">Dashboard</Link></li>
                        }
                        {/* Display logout button if the user is logged in */}
                        {
                            this.props.isLoginSuccess &&
                            <li className="nav-item"><a href="/" onClick={this.logout}>Logout</a></li>
                        }
                    </ul>
                </nav>
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
        isSeller: state.isSeller
    };
  }
  
const mapDispatchToProps = (dispatch) => {
    return {
        login: (username, password) => dispatch(login(username, password)),
        logout: () => dispatch(logout())
    };
}
  
  export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
  