import React from 'react';
import './login-content.css';
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { login } from '../../../Actions/action'

import Navbar from '../../navbar';
import {Footer} from '../../footer';

class Login extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = { }
    }

    render() {
        // If the user is already logged in, or has just logged in, redirect them to the home page.
        if (this.props.isLoginSuccess) {
            return <Redirect push to="/" />;
        }

        return(
            <div className="content">
                <Navbar/>
                <div className="login-content">
                    <header>
                        <h1>Log In</h1>
                    </header>
                    <div className='login-form'>
                        <form onSubmit={this.onSubmit}>
                        <label>
                            Username:
                            <input type="username" id="input-email" name="username" onChange={e => this.setState({username: e.target.value})}/>
                        </label><br></br>
                        <label>
                            Password:
                            <input type="password" id="input-password" name="password" onChange={e => this.setState({password: e.target.value})}/>
                        </label><br></br>
                        <input type="submit" id="input-submit" value="Login"/>
                        </form>
                    </div>
                    <p>Don't have an account? <Link to="/register">Register now!</Link></p>
                </div>
                <Footer/>
            </div>
        )
    }

    onSubmit = (e) => {
        e.preventDefault();
        let {username, password} = this.state;
        this.props.login(username, password);
    }
}

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
        login: (username, password) => dispatch(login(username, password))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);