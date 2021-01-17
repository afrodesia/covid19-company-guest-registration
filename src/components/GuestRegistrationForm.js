import React, {Component} from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { Redirect, Link } from 'react-router-dom';

import { generateUUID } from '../classes/UUID.js';

import Cookies from 'universal-cookie';

import Config from '../Config.js';

import '../css/form.css';

/**
* Component for the Guest Registration form, the entry point to the application.
* Contains a form with all the Guest information to be captured
* @props: webServiceUrl The URL of the web web service
* @props: clienId The unique client id which will be stored to identify the client
* @props: company The company which is behind the guest registration
*/
class GuestRegistrationForm extends Component {
    webServiceUrl = "";
    clientId = "";
    cookies;
    company = null;

    constructor(props){
      super(props);

      if(this.props.webServiceUrl && this.props.webServiceUrl !== ""){
        this.webServiceUrl = this.props.webServiceUrl;
      }

      this.cookies = new Cookies();

      let params = new URLSearchParams(window.location.search);

      //If there is a redirect from the checkout page (?checkout=true), then generate a new client id otherwise take the one from the props
      if(params.get("checkout") === "true"){
        this.clientId = generateUUID();
      }else if(this.props.clientId && this.props.clientId !== ""){
        this.clientId = this.props.clientId;
      }

      if(this.props.company && this.props.company !== undefined){
        this.company = this.props.company;
      }
    }

    /**
    * Handle the success response of submitting the data.
    * Set a cookie with the client ID and redirect to /checkout
    */
    handleResponse(data){
      let expires = new Date()
      //Set cookie validity to 8 hours
      expires.setTime(expires.getTime() + (8*60*60));
      this.cookies.set('GuestRegistrationFormClientId', this.clientId, { path: '/' }, expires);
      this.setState({ redirect: true });
    }

    render() {
        if(this.state && this.state.redirect && this.state.redirect === true){
          return <Redirect to="/checkout" />;
        }
        return (
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    gdpr: false,
                    optIn: false,
                    clientId: this.clientId
                }}
                validationSchema={Yup.object().shape({
                    firstName: Yup.string()
                        .required('First Name is required'),
                    lastName: Yup.string()
                        .required('Last Name is required'),
                    email: Yup.string()
                        .email('Please provide a valid E-Mail address'),
                    phone: Yup.string()
                        .required('Phone number is required'),
                    gdpr: Yup.boolean()
                      .oneOf([true], "Please confirm that you have read the GDPR statement")
                })}
                onSubmit={async values => {
                  var url = this.webServiceUrl + "/api/collections/save/Guest?token=" + Config.webServiceToken;
                  let checkIn = new Date();
                  //Format yyyy-mm-dd
                  values.checkIn = checkIn.toLocaleDateString("en-CA");
                  //Format h:m:s
                  values.checkInTime = checkIn.getHours() + ":" + checkIn.getMinutes() + ":" + checkIn.getSeconds();
                  fetch(url, {
                    method: 'post',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({data: values})
                  })
                  .then(res => res.json())
                  .then((data) => this.handleResponse(data))
                  .catch(console.log)
                }}
                render={({ errors, status, touched }) => (
                    <Form>
                      <div class="form">
                        <div class="row">
                          <div class="col-lg-6">
                            <div className="form-group">
                                <label htmlFor="firstName">First Name*</label>
                                <Field name="firstName" type="text" className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')} />
                                <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                            </div>
                            </div>
                          <div class="col-lg-6">
                            <div className="form-group">
                                <label htmlFor="lastName">Last Name*</label>
                                <Field name="lastName" type="text" className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />
                                <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-lg-6">
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                <ErrorMessage name="email" component="div" className="invalid-feedback" />
                            </div>
                          </div>
                          <div class="col-lg-6">
                            <div className="form-group">
                                <label htmlFor="phone">Phone number*</label>
                                <Field name="phone" type="tel" className={'form-control' + (errors.phone && touched.phone ? ' is-invalid' : '')} />
                                <ErrorMessage name="phone" component="div" className="invalid-feedback" />
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col">
                            <div className="form-group form-check">
                                <Field type="checkbox" name="gdpr" className={'form-check-input ' + (errors.gdpr && touched.gdpr ? ' is-invalid' : '')} />
                                <label htmlFor="gdpr" className="form-check-label">
                                  I have read and understood the GDPR data handling policy which can be found <Link to="/gdpr" target="_new">here</Link>
                                </label>
                                <ErrorMessage name="gdpr" component="div" className="invalid-feedback" />
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col">
                            <div className="form-group">
                                <Field type="hidden" name="clientId" />
                                <button type="reset" className="btn btn-secondary">Reset</button>&nbsp;
                                <button type="submit" className="btn btn-primary mr-2">Check In</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Form>
                )}
            />
        )
    }
}

export default GuestRegistrationForm;
