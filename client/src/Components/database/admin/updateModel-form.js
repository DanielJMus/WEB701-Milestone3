import React from 'react'

export class ModelUpdate extends React.Component {
    
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Submit the form data, updating the specified model data in the database.
    handleSubmit(event) {
        event.preventDefault();
        fetch('http://localhost:4200/api/models/' + this.ID.value, {
            method: 'put',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
             "ID": this.ID.value,
             "Title": this.Title.value,
             "Description": this.Description.value,
             "URL": this.URL.value,
             "ImageURL": this.ImageURL.value
            })
        }).then(res => {
            if (res.status === 201) alert("Successfully updated model.")
            else alert(res.status)
        });
    }
    
    render() {
        return(
            <div className="content">
                <header>
                    <h1>Update Model Entry</h1>
                </header>
                <div className='register-form'>
                    <form onSubmit={this.handleSubmit}>
                    <label>
                        ID:
                        <input ref={(ref) => {this.ID = ref}} type="number" id="input-id" name="id"/>
                    </label><br></br>
                    <label>
                        Title:
                        <input ref={(ref) => {this.Title = ref}} type="text" id="input-tilte" name="title"/>
                    </label><br></br>
                    <label>
                        Description:
                        <input ref={(ref) => {this.Description = ref}} type="text" id="input-description" name="description"/>
                    </label><br></br>
                    <label>
                        URL:
                        <input ref={(ref) => {this.URL = ref}} type="text" id="input-url" name="url"/>
                    </label><br></br>
                    <label>
                        Image URL:
                        <input ref={(ref) => {this.ImageURL = ref}} type="text" id="input-url" name="imageurl"/>
                    </label><br></br>
                    <input type="submit" id="input-submit"/>
                    </form>
                </div>
            </div>
        )
    }
}