import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import GuestRegistrationForm from './GuestRegistrationForm.js';
import Checkout from './Checkout.js';
import NavBar from './NavBar.js';
import Cookies from 'universal-cookie';
import Config from '../Config.js';
import RichText from './RichText.js';
import Error from './Error.js';

import { generateUUID } from '../classes/UUID.js';

import '../css/main.css';

/**
* The main class. Handles the routing.
*/
class Main extends Component {

    clientId = null;

    constructor(props){
      super(props);

      var cookies = new Cookies();
      this.clientId = cookies.get('GuestRegistrationFormClientId');
    }

    getBaseUrl(){
      var host = window.location.protocol + "//" + window.location.hostname;
      return host;
    }

    getServiceUrl(){
      var host = this.getBaseUrl() + "/cockpit";
      return host;
    }

    getClientId() {
      if(this.clientId !== "" && this.clientId !== undefined){
        return this.clientId;
      }

      return generateUUID();
    }

    /**
    * When the component is mounted, call the service to get the company information
    */
    componentDidMount(){
      this.getCompanyInformation();
    }

  getCompanyInformation() {
    var url = this.getServiceUrl() + "/api/singletons/get/Company";
    fetch(url, {
      method: 'get',
      headers: {'Content-Type': 'application/json', 'Cockpit-Token': Config.webServiceToken}
    })
      .then(res => res.json())
      .then((data) => this.handleCompanyResponse(data))
      .catch((error) => this.handleCompanyResponseError(error));
  }

    handleCompanyResponse(data){
      this.setState({company: data});
    }

    handleCompanyResponseError(error){
      console.log(error);
      this.setState({error: error});
    }

    render(){
      if(this.state && this.state.error){
        return(
          <Error
            errorMessage="{this.state.error.message}" />
        )
      }
      if(this.state && this.state.company){
        return(
          <div>
              <NavBar company={this.state.company} webServiceUrl={this.getBaseUrl()}/>
              <div class="content">
                <Router>
                  <Route exact path="/">
                    {this.clientId ?
                      <Redirect to="/checkout" /> :
                      <GuestRegistrationForm
                        webServiceUrl={this.getServiceUrl()}
                        clientId={this.getClientId()}
                        company={this.state.company}/>}
                  </Route>
                  <Route exact path="/gdpr">
                    {this.state.company.gdprText && 
                      <RichText
                        text={this.state.company.gdprText} />
                    }
                    {!this.state.company.gdprText && 
                      <p>No GDPR set yet</p>
                    }
                  </Route>
                  <Route exact path="/checkout">
                    <Checkout
                      webServiceUrl={this.getServiceUrl()}
                      clientId={this.clientId}/>
                  </Route>
                </Router>
              </div>
            </div>
          );
      }
      return <div class="loader"></div>;
    }
}

export default Main;
