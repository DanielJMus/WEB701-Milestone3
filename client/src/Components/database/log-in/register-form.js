import React from 'react'

import { login } from '../../../Actions/action';
import { connect } from 'react-redux';

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
        fetch('http://localhost:4200/api/users', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
             "USERNAME": this.Name.value,
             "EMAIL": this.Email.value,
             "PASSWORD": this.Password.value
            })
        }).then(res => {
            if (res.status === 201) alert("Successfully created account.")
            else alert(res.status)
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
