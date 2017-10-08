import React, { Component } from 'react';
import '../css/App.css';
import DateSorting from './dateSorting';


class VehicleList extends Component {
	constructor(props){
    super(props);
    }



    render() {
    	return(
    		<div>
                <h1>Vehicles List</h1>
                <div><DateSorting /></div>
                <ul id="vehicles" className= "vehiclesContainer"></ul>
                <div>{this.props.apiRequest()}</div>
            </div>	
    		);
    }
  
  }

  export default VehicleList;

