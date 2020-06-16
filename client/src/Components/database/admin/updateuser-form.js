import React from 'react'
import './register-content.css';

export class Update extends React.Component {
    
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Submit the form data, updating the specified user data in the database.
    handleSubmit(event) {
        event.preventDefault();
        fetch('http://localhost:4200/api/users/' + this.ID.value, {
            method: 'put',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
             "ID": this.ID.value,
             "FirstName": this.FirstName.value,
             "LastName": this.LastName.value,
             "Email": this.Email.value,
             "Password": this.Password.value,
             "Admin": this.Admin.checked,
            })
        }).then(res => {
            if (res.status === 201) alert("Successfully updated account.")
            else alert(res.status)
        });
    }
     
    render() {
        return(
            <div className="register-container">
                <header>
                    <h1>Update Account</h1>
                </header>
                <div className='register-form'>
                    <form onSubmit={this.handleSubmit}>
                    <label>
                        ID:
                        <input ref={(ref) => {this.ID = ref}} type="number" id="input-firstname" name="firstname"/>
                    </label><br></br>
                    <label>
                        First Name:
                        <input ref={(ref) => {this.FirstName = ref}} type="text" id="input-firstname" name="firstname"/>
                    </label><br></br>
                    <label>
                        Last Name:
                        <input ref={(ref) => {this.LastName = ref}} type="text" id="input-lastname" name="lastname"/>
                    </label><br></br>
                    <label>
                        Email:
                        <input ref={(ref) => {this.Email = ref}} type="email" id="input-email" name="email"/>
                    </label><br></br>
                    <label>
                        Password:
                        <input ref={(ref) => {this.Password = ref}} type="password" id="input-password" name="password"/>
                    </label><br></br>
                    <label>
                        Admin:
                        <input ref={(ref) => {this.Admin = ref}} type="checkbox" id="input-admin" name="admin"/>
                    </label><br></br>
                    <input type="submit" id="input-submit"/>
                    </form>
                </div>
            </div>
        )
    }
}