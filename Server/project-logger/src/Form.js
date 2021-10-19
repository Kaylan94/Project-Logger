import React, { Component } from "react";

//create a form element
//post function to send request to server
class Form extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        title: '',
        description: '',
        url: ''
      }

    }

    //the method below is used to sync the state properties with the target values from the respective inputs
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    //the method below handles the form submission
    //firstly, the default action is prevented using the event argument
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);

        //the fetch method below specifies the path and method to add a new project record
        //the body property is given the state object as a value (converted to JSON using stringyfy)
        fetch('/add', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
            })
            .then(
                window.location.reload()
            )
        };

    render() {

        //the state properties are assigned to constant variables
        const { title, description, url } = this.state;


        //a form with 3 input fields is created and return here
        //each input is given attributes specific to their function and
        //to call on the appropriate methods according to correlating events
        return (
            <div className="form-container">
                <form id="projectForm" name="add-project" onSubmit={this.handleSubmit}>
                    <div>
                        <label for="project-title">Project title: </label>
                        <input type="text" id="project-title" name="title" value={title} onChange={this.handleChange} />
                    </div>
                    <div>
                        <label for="project-description">Description: </label>
                        <input type="text" id="project-description" name="description" value={description} onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label for="project-url">Project URL: </label>
                        <input type="text" id="project-url" name="url" value={url} onChange={this.handleChange}/>
                    </div>
                    <input type="submit" value="Submit!" className="list-btn" id="btn-submit"/>
                </form>
            </div>
            );
        };
    }

export default Form;
