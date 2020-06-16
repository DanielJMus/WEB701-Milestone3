import React from 'react'
import './register-content.css';

export class Delete extends React.Component {
    
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Submit the form data, deleting the specified user data from the database.
    handleSubmit(event) {
        event.preventDefault();
        fetch('http://localhost:4200/api/users/' + this.ID.value, {
            method: 'delete',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
             "ID": this.ID.value,
            })
        }).then(res => {
            if (res.status === 201) alert("Successfully deleted account.")
            else alert(res.status)
        });
    }
     
    render() {
        return(
            <div className="register-container">
                <header>
                    <h1>Delete Account</h1>
                </header>
                <div className='register-form'>
                    <form onSubmit={this.handleSubmit}>
                    <label>
                        ID:
                        <input ref={(ref) => {this.ID = ref}} type="number" id="input-id" name="id"/>
                    </label><br></br>
                    <input type="submit" id="input-submit"/>
                    </form>
                </div>
            </div>
        )
    }
}