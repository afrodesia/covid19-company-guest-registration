import React, { Component } from 'react';

import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';

import CountUp from './CountUp.js';

import Config from '../Config.js';

/**
* Component for the Checkout page of the guest registration. Displays the count up timer and the checkout button
* @props: webServiceUrl The URL of the web web service
* @props: clienId The unique client id which will be stored to identify the client
*/
class Checkout extends Component {
    webServiceUrl = "";
    clientId = "";
    cookies;

    constructor(props){
      super(props);

      if(this.props.webServiceUrl && this.props.webServiceUrl !== ""){
        this.webServiceUrl = this.props.webServiceUrl;
      }

      this.cookies = new Cookies();

      //If the client if is passed in the props, take it, otherwise get it from the cookie
      if(this.props.clientId && this.props.clientId !== ""){
        this.clientId = this.props.clientId;
      }else{
        var cookieClientId = this.cookies.get('GuestRegistrationFormClientId');
        if(cookieClientId !== undefined && cookieClientId!== null && cookieClientId !== ""){
          this.clientId = cookieClientId;
        }
      }

      this.handleCheckout = this.handleCheckout.bind(this);
    }

    handleCheckout() {
      var url = this.webServiceUrl + "/api/collections/save/Guest";
      var guest = this.state.guest;
      let checkout = new Date();
      //Format yyyy-mm-dd
      guest.checkOut = checkout.toLocaleDateString("en-CA");
      //Format h:m
      guest.checkOutTime = checkout.getHours() + ":" + checkout.getMinutes() + ":" + checkout.getSeconds();
      fetch(url, {
        method: 'post',
        headers: {'Content-Type': 'application/json', 'Cockpit-Token': Config.webServiceToken},
        body: JSON.stringify({data: guest})
      })
      .then((data) => this.handleCheckoutResponse(data))
      .catch(console.log)
    }

    /**
    * Handling the succesfull checkout service response. Remove the cookie and redirect.
    */
    handleCheckoutResponse(data){
      this.cookies.remove('GuestRegistrationFormClientId');
      localStorage.clear();
      this.setState({ redirect: true });
    }

    /**
    * When the component mounts, call the web service to get the guest information.
    * @TODO: Proper error handling
    */
    componentDidMount(){
      var url = this.webServiceUrl + "/api/collections/get/Guest?token=" + Config.webServiceToken;
      fetch(url, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          filter: {clientId: this.clientId},
        })
      })
      .then(res => res.json())
      .then((data) => this.handleResponse(data))
      .catch(console.log)
    }

    /**
    * Handling of the succesfull get guest data request. Set the guest data and add it to the local storage.
    * @TODO: Is the local storage really necessary? Check for better solutions.
    */
    handleResponse(data){
      if(data.entries){
        this.setState(
          { guest: data.entries[0] },
          () => {
            localStorage.setItem('guest', JSON.stringify(data.entries[0]));
          }
        )
      }
    }

    render(){
      if(this.state && this.state.redirect && this.state.redirect === true){
        return <Redirect to="/?checkout=true" />;
      }

      let ls = localStorage.getItem('guest');
      let guest = null;
      if(this.state && this.state.guest){
            guest = this.state.guest;
      }else if(ls !== null && ls !== undefined && ls !== ""){
        guest = JSON.parse(ls);
      }

      if(guest !== null){
        return(
          <div>
            <div class="row">
              <div class="col">
                Hello {guest.firstName} {guest.lastName}
              </div>
            </div>
            <div class="row">
              <div class="col">
                You are succesfully checked in.
              </div>
            </div>
            <div class="row">
              <div class="col">
                <CountUp
                  start={guest.checkIn} />
              </div>
            </div>
            <div class="row">
              <div class="col">
                Please do not forget to checkout before you are leaving the office.
              </div>
            </div>
            <div class="row">
              <div class="col">
                <button type="submit" className="btn btn-primary mr-2" onClick={this.handleCheckout}>Check Out</button>
              </div>
            </div>
          </div>
          );
      }
      return <div class="loader"></div>;
    }
}

export default Checkout;
