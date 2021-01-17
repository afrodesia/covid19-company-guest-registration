import React, {Component} from 'react';

class Error extends Component {
  errorMessage = "";

  constructor(props){
    super(props);
    if(this.props && this.props.errorMessage){
      this.errorMessage = this.props.errorMessage;
    }
  }

  render(){
    return(
      <div class="mt-5">
        <div class="alert alert-danger" role="alert">
          <h4 class="alert-heading">Whoops, something went wrong.</h4>
          <p>Please try to reload the page.</p>
          <hr/>
          <p class="mb-0">
            {this.errorMessage}
          </p>
        </div>
      </div>
    )
  }
}

export default Error;
