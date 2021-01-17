import React, {Component} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import NavbarText from 'react-bootstrap/Nav';

class NavBar extends Component {

  company = null;
  webServiceUrl = "";

  constructor(props){
    super(props);

    if(this.props.company && this.props.company !== ""){
      this.company = this.props.company;
    }

    if(this.props.webServiceUrl && this.props.webServiceUrl !== ""){
      this.webServiceUrl = this.props.webServiceUrl;
    }
  }

  render(){

    return (
      <Navbar bg="dark" variant="dark" expand="lg">
        {this.company && this.company.logo && <Navbar.Brand href="/"><img src={this.webServiceUrl + this.company.logo.path} loading="lazy" alt={this.company.name} height="20px"/></Navbar.Brand>}
        <NavbarText><span class="navbar-brand mb-0 h1">Guest Registration</span></NavbarText>
      </Navbar>
    )
  }
}
export default NavBar;
