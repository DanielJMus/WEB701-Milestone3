import React from 'react'

export class ModelPost extends React.Component {
    
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Submit the form data, adding the new model data to the database.
    handleSubmit(event) {
        event.preventDefault();
        fetch('http://localhost:4200/api/models', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
             "Title": this.Title.value,
             "Description": this.Description.value,
             "URL": this.URL.value,
             "ImageUrl": this.ImageURL.value
            })
        }).then(res => {
            if (res.status === 201) alert("Successfully created model entry.")
            else alert(res.status)
        });
    }
     
    render() {
        return(
            <div className="content">
                <header>
                    <h1>Add Model Entry</h1>
                </header>
                <div className='register-form'>
                    <form onSubmit={this.handleSubmit}>
                    <label>
                        Title:
                        <input ref={(ref) => {this.Title = ref}} type="text" id="input-title" name="title"/>
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
                        <input ref={(ref) => {this.ImageURL = ref}} type="text" id="input-url" name="image-url"/>
                    </label><br></br>
                    <input type="submit" id="input-submit"/>
                    </form>
                </div>
            </div>
        )
    }
}