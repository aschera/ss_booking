import React, { Component } from 'react';
import '../css/App.css';
import moment from 'moment';
import Calendar_in_booking from './calendar_in_booking';
//import './scripts.js';

var nogood;
var result;

class Booking extends Component {
	constructor(props){
    super(props);
        this.state = {
            startDate: moment(),
            endDate: moment(),
            car: ''
        };
        this.showVehicleInfo = this.showVehicleInfo.bind(this);
        this.bookedCar = this.showVehicleInfo.bind(this);
		this.apiBook = this.apiBook.bind(this);	
		this.modalopen = this.modalopen.bind(this);	
		this.modalclose = this.modalclose.bind(this);	
    }

 
    showVehicleInfo(){

  		nogood = this.props.bookingid;
        const _this = this;

				fetch('/vehicles')
						.then(function(response) {
								return response.json();
						}).then(function(data) {
						for (var i = 0; i < data.length; i++) {
								 if(nogood === data[i]._id){

 
										//a div with all the selected car info
										var selectedCarInfo = document.createElement('div');
										selectedCarInfo.style.textAlign = 'left';
										selectedCarInfo.style.marginLeft = '30px';
										selectedCarInfo.id = data[i]._id;
										selectedCarInfo.className = 'boxUnderCarImage';

										// a div with the car brand and model
										var carBrand_Model = document.createElement('h3');
										carBrand_Model.innerHTML = data[i].brand + ', ' + data[i].model;

										// a div with the licence
										var licence = document.createElement('div');
										licence.innerHTML = 'Driving licence: ' + data[i].requiredDrivingLicense;

										// a div with the gear box
										var gearBox = document.createElement('div');
										gearBox.innerHTML = 'Gear box: ' + data[i].gearbox;

										// a div with price per day
										var price = document.createElement('div');
										price.innerHTML = 'Price/day: ' + data[i].dagshyra;



										// append all our created elements on selectedCarInfo
										selectedCarInfo.appendChild(carBrand_Model);
										selectedCarInfo.appendChild(licence);
										selectedCarInfo.appendChild(gearBox);
										selectedCarInfo.appendChild(price);

										document.getElementById("selectedCar").appendChild(selectedCarInfo);
						}


		}// end for loop
		}) // end get*/
		} // end showvehicleinfo

		modalopen(){
			var modal = document.getElementById('myModal');
			modal.style.display = "block";
			this.apiBook();
		}
		modalclose(){
			var modal = document.getElementById('myModal');
			modal.style.display = "none";	
		}

    apiBook(){
    	// _this hold the React this. We need it here because fetch has also a 'this.'
        const _this = this;
        // id of the car that we are about to book.
		let theid = this.props.bookingid;
        // here we add the date for from and to to an object to be sent to mongoDB
		var dates = {
				from: this.props.from,
				to: this.props.to
			}   
       // mongoDB can only handle strings.
        var stringDates = JSON.stringify(dates);
        // Here we put the dates into the vehicle we are booking 
	    fetch("/vehicles/book/"+theid, {
	      method: "PUT",
		  body: stringDates,
	      headers: {
	       'Accept': 'application/json',
	       'Content-Type': 'application/json'
	     }
	    }).then(function(response){
	    });
		}

    render() {

			return(
    		<div id="booking" className= "individualContainer">
                <div>{this.props.bookingid}</div>
                <h1>Your booking information</h1>
                <div>{this.showVehicleInfo()}</div>
                <div id="selectedCar"></div>
                <h4>Selected dates:</h4>
                <p>Pick-up date: {this.props.from}, Drop-off date: {this.props.to}</p>
                <Calendar_in_booking />
                <button id="myBtn" type="submit" onClick={() => { this.modalopen() }}>Confirm</button>
				<div id="myModal" class="modal">
				  <div class="modal-content">
				    <span class="close" type="submit" onClick={() => { this.modalclose() }}>&times;</span>
				    <p>'Some text in the Modal..'</p>
				  </div>
				</div>
    		</div>
    		);
    }

  }

  export default Booking;
