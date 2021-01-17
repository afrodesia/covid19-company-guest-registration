import React, {Component} from 'react';
import parse from 'html-react-parser';

class RichText extends Component {

  render(){
    var text = this.props.text;
    if(text === undefined){
      text = "";
    }
    return(
      <div class={this.props.class}>
        {parse(text)}
      </div>
    )
  }
}

export default RichText;
