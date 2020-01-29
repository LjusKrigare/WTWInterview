import React, { Component } from 'react';
import './Weather.css';
import backimg from '../images/stormy_background.jpeg';
export class Weather extends Component {
  state = {
    image:"",
    location:"",
    temp:"",
    humidity:"",
    wind:"",
    climate:"",
    error:""
  };
  handleClick = async(e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    if(city){
      const api_call = await fetch(`https://www.metaweather.com/api/location/search/?query=${city}`, { mode: 'no-cors'});
      const data = await api_call.json();

      const specific_city = await fetch('https://www.metaweather.com/api/location/' + data );
      const display_data = await specific_city.json();
      this.setState({
        image:"",
        location:"",
        temp:"",
        humidity:"",
        wind:"",
        climate:"",
        error:""
      });
    }
    else {
      this.setState({
        image:"",
        location:"",
        temp:"",
        humidity:"",
        wind:"",
        climate:"",
        error:"Please enter city and country details correctly"
      });
    }
}
  render() {
    return (
      <div className="container" id="c1">
        <center>
       { /* <img src={backimg} width="100%"/><br></br> */ }
        <div className="card" id="c2"><form onSubmit={this.handleClick}>
        <h3>Todays Weather</h3><br></br>
            <div className="row">
              <div className="col-md-4"><label>Search</label></div>
              <div className="col-md-8"><input type="text" name="city" className="form-control"/><br></br></div>
              <div className="col-md-10"></div>
              <div className="col-md-2"><button className="btn btn-info">Get Weather</button><br></br><br></br></div>
            </div>
          </form>
          {this.state.error!=''?<div class="alert alert-primary" role="alert">{this.state.error}</div>:''}
          </div>
          {this.state.temp!=''?
          <div id="bck"><div className="row">
            <div className="col-md-4"><center><img src={this.state.image} width="100px" height="100px"/><br></br><h4><b>{this.state.climate}</b></h4><h4><b>{this.state.location}</b></h4></center></div>
            <div className="col-md-4"><center><h3 id="h1">Temperature: {this.state.temp}<br></br>Humidity: {this.state.humidity}<br></br>Wind mph: {this.state.wind}</h3></center></div>
            <div className="col-md-4"></div>
          </div></div>:''}
          <br></br>
          <br></br>
          </center>
      </div>
    );
  }
}