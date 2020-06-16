import React from 'react'

export class PhotoshopPost extends React.Component {
    
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Submit the form data, adding the new photoshop data to the database.
    handleSubmit(event) {
        event.preventDefault();
        fetch('http://localhost:4200/api/photoshops', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
             "Title": this.Title.value,
             "Description": this.Description.value,
             "ImageUrl": this.URL.value,
            })
        }).then(res => {
            if (res.status === 201) alert("Successfully created photoshop entry.")
            else alert(res.status)
        });
    }
     
    render() {
        return(
            <div className="content">
                <header>
                    <h1>Add Photoshop Image</h1>
                </header>
                <div className='register-form'>
                    <form onSubmit={this.handleSubmit}>
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
                    <input type="submit" id="input-submit"/>
                    </form>
                </div>
            </div>
        )
    }
}