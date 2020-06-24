import React from 'react'

import { login } from '../../../Actions/action';
import { connect } from 'react-redux';

const bcrypt = require('bcryptjs');

class RegisterForm extends React.Component {
    
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount ()
    {
        document.title = "Register | Fresh Fruit Juice";
    }

    // Submit the form data, adding the specified user data to the database.
    handleSubmit(event) {
        event.preventDefault();
        let username = this.Name.value;
        let email = this.Email.value;
        bcrypt.hash(this.Password.value, 10, function(err, hash) {
            console.log(hash);
            fetch('http://localhost:4200/api/users', {
                method: 'post',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({
                 "USERNAME": username,
                 "EMAIL": email,
                 "PASSWORD": hash
                })
            }).then(res => {
                if (res.status === 201) alert("Successfully created account.")
                res.json().then(json => {
                    var errno = json["error"]["errno"];
                    if (errno === 1062)
                    {
                        alert("Sorry, this email is already registered");
                    } else {
                        alert(errno);
                    }
                })
            });
        });
    }
     
    render() {
        return(
            <div className="content">
                <header>
                    <h1>Register Account</h1>
                </header>
                <div className='register-form'>
                    <form onSubmit={this.handleSubmit}>
                    <label>
                        Name:
                        <input ref={(ref) => {this.Name = ref}} type="text" id="input-name" name="name"/>
                    </label><br></br>
                    <label>
                        Email:
                        <input ref={(ref) => {this.Email = ref}} type="email" id="input-email" name="email"/>
                    </label><br></br>
                    <label>
                        Password:
                        <input ref={(ref) => {this.Password = ref}} type="password" id="input-password" name="password"/>
                    </label><br></br>
                    <input type="submit" id="input-submit"/>
                    </form>
                </div>
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
        isAdministrator: state.isAdministrator
    };
}
  
const mapDispatchToProps = (dispatch) => {
    return {
        login: (username, password) => dispatch(login(username, password))
    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
