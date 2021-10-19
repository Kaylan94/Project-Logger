import './App.css';
import Header from './Header';
import React, { Component } from 'react';
import Form from './Form';


export class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null ,
      isLoaded: false ,
      items: [],
    }
  }

  //the method below is called once the page has been loaded, and
  //then send a GET request to /api to received the current project log
  //the response received is then added to the state property 'items'
  componentDidMount() {

    fetch( "/api" )

    .then(res => res.json())
    .then(
      (result) => {
      this .setState({
        isLoaded: true ,
        items: result.webProjects.projects
        }); 
      },
      (error) => {
        this .setState({
          isLoaded: true ,
          error
        }); 
      });
  }

  //the method below take an event as a parameter and then immediately prevents the defaut action
  //the purpose of this method is to send a DELETE request while defining the "body" appropriately
  handleDelete = (e) => {
    e.preventDefault();

    //a prompt is raised to get confirmation from the user and its value assigned to a variable
    let dltConfirm = window.confirm("Are you sure you want to delete this item?");
    //the id object is created, which will be used to define the "body" property
    const id = {["id"]: e.target.value};
    //if the user clicks okay (the dltConfirmation is true)
    if(dltConfirm) {
      
      console.log(`Request to delete ${id}`);

      fetch('/delete', {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(id),
      })
      .then(
          window.location.reload()
      )
    }else {
      alert("Operation aborted");
    }
  }

  //the method below take an event as a parameter and then immediately prevents the defaut action
  //the purpose of this method is to send a PUT request while defining the "body" appropriately
  handleTitleEdit = (e) => {
    e.preventDefault();

    const id = e.target.value;
    
    //a propmt is raised and requests the user to input the new title to be, and
    //its value is assigned to a variable
    let newTitle = window.prompt(`Please enter new title for task - <${id}>`);

    //if the input from the prompt above is not null
    if (newTitle != null) {
      //a javascript object is created and defined using the id for the target value and the title from the prompt input
      const editObj = {["id"]: id, ["title"]: newTitle}

      fetch('/edit-title', {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editObj),
      })
      .then(
          window.location.reload()
        )
    }else {
        alert("Operation aborted");
    }
  }

  //the method below take an event as a parameter and then immediately prevents the defaut action
  //the purpose of this method is to send a PUT request while defining the "body" appropriately
  handleDescriptionEdit = (e) => {
    e.preventDefault();

    const id = e.target.value;
    
    let newDescription = window.prompt(`Please enter new description for task - <${id}>`);

    if (newDescription != null) {

      const editObj = {["id"]: id, ["description"]: newDescription}

      fetch('/edit-description', {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editObj),
      })
      .then(
          window.location.reload()
        )
    }else {
        alert("Operation aborted");
    }
  }

  //the method below take an event as a parameter and then immediately prevents the defaut action
  //the purpose of this method is to send a PUT request while defining the "body" appropriately
  handleUrlEdit = (e) => {
    e.preventDefault();

    const id = e.target.value;
    
    let newUrl = window.prompt(`Please enter new URL for task - <${id}>`);

    if (newUrl != null) {

      const editObj = {["id"]: id, ["url"]: newUrl}

      fetch('/edit-url', {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editObj),
      })
      .then(
          window.location.reload()
        )
    }else {
        alert("Operation aborted");
    }
  }
  
  render() {

    //here the state properties are assigned to const variables respectively 
    const { error, isLoaded, items} = this.state;

    //the below specifies what is returned and to the html page based on the error status and isLoaded property
    //the Header and Form components are imported and inserted here to be rendered with the main App.js
    //a map method is used to render each list item, which is defined both in quantity and content by the itmes[] property
    //four buttons are created here and are given attributes to handle each of the functionalities appropriately
    if (error) {
      return < div > Error: {error.message} </ div > ;
    } else if (!isLoaded) {
      return < div > Loading... </ div > ;
    } else {
    return (
      <div className="App">
        
        <Header />

        <br></br>
          <h2>Add Project Here</h2>
        <br></br>

        <Form />
        
        <br></br>
          <hr></hr>
        <br></br>
          <h2>Your Projects</h2>
        <br></br>

        < ul className="pro-list">
          {items.map(item => (
            < li key= {item.id} >
              <b>ID:</b> {item.id} <b>| TITLE:</b> {item.title} <b>| DESCRIPTION:</b>  {item.description} <b>| URL:</b>  {item.url}
              <div className="btn-group">
                <button className="list-btn" id="list-btn1" value={item.id} onClick={this.handleDelete}>delete</button>  
                <button className="list-btn" id="list-btn2" value={item.id} onClick={this.handleTitleEdit}>edit title</button> 
                <button className="list-btn" id="list-btn3" value={item.id} onClick={this.handleDescriptionEdit}>edit description</button>
                <button className="list-btn" id="list-btn4" value={item.id} onClick={this.handleUrlEdit}>edit url</button>
              </div>
              <br></br>
                <hr></hr>
              <br></br>
            </ li >
          ))}
        </ ul >

      </div>
    );}
  }
}

export default App

