import React, { Component } from 'react';
import '../css/Admin.css';

class AddButton extends Component {
  constructor(props){
   super(props);
   this.apiAdd = this.apiAdd.bind(this);
  }
  /* When clicking on the add button this function will make a request to the REST API.
     it takes information from all the input fields that is saved in the Admin components state
  */
  apiAdd(){
    let car = JSON.stringify(this.props.newCar);
    fetch("/vehicles", {
      method: "POST",
      body: car,
      headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
     }
    }).then(function(response){
    });
  }
  render() {
    return (
      <div>
        <button onClick={this.apiAdd}>ADD</button>
      </div>
    );
  }
}

export default AddButton;
