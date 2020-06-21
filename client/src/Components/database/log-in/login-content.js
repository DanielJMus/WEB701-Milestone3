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
        if (this.props.isLoginSuccess)
        {
            if(this.props.match.params.source != null) {
                var source = "/" + this.props.match.params.source.replace("_", "/");
                return <Redirect push to={source} />;
            } else {
                return <Redirect push to={"/"}/>
            }
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
                            Email:
                            <input type="email" id="input-email" name="email" onChange={e => this.setState({email: e.target.value})}/>
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
        let {email, password} = this.state;
        this.props.login(email, password);
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
        login: (email, password) => dispatch(login(email, password))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);