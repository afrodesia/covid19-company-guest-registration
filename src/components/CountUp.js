import React, { Component } from 'react';

class CountUp extends Component {

  start = 0;
  intervalSet = false;

  ss = 0;
  mm = 0;
  hh = 0;

  constructor(props){
    super(props);

    if(this.props.start && this.props.start !== null){
      this.start = this.props.start;
    }

    this.handleCountup = this.handleCountup.bind(this);
  }

  handleCountup(){
    let ls = localStorage.getItem('guest');
    let guest = JSON.parse(ls);
    if(guest === undefined || guest === null){
      return;
    }

    let dateSplit = guest.checkIn.split("-");
    let timeSplit = guest.checkInTime.split(":");
    let checkIn = new Date(dateSplit[0], dateSplit[1]-1, dateSplit[2], timeSplit[0], timeSplit[1], timeSplit[2]);

    let seconds = Math.floor((Date.now() - checkIn) / 1000);
    this.ss = Math.floor(seconds%60);
    seconds = Math.floor(seconds/60);
    this.mm = Math.floor(seconds%60);
    this.hh = Math.floor(seconds/60);

    this.setState({ reload: true });
  }

  componentWillUnmount(){
    clearInterval(this.handleCountup);
  }

  componentDidMount(){
    if(!this.intervalSet){
      setInterval(this.handleCountup, 1000);
      this.intervalSet = true;
    }
  }

  render(){
    return(
      <div class="countup">
        <span class="badge badge-secondary">{this.hh}</span> Hours &nbsp;
        <span class="badge badge-secondary">{this.mm}</span> Minutes &nbsp;
        <span class="badge badge-secondary">{this.ss}</span> Seconds &nbsp;
      </div>
    )
  }
}

export default CountUp;
