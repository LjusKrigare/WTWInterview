import React, { Component } from 'react';
import './Weather.css';
import Forecast from "./Forecast"
import { Route, Switch } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import backimg from '../images/stormy_background.jpeg';
export class Weather extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
        cities: [],
        weather: [],
        location: "",
        ulr: ""
    }
}

componentWillMount() {
  localStorage.getItem('city') && this.setState({
      favourites: JSON.parse(localStorage.getItem('city'))
  })
}

getWeather(woeid) {
  fetch(`http://localhost:8080/city/${ woeid }`)
      .then((res) => res.json())
      .then((res) => {
          this.setState({
              weather: res.data.consolidated_weather,
              location: res.data.title + " " + res.data.parent.title
          })
      })
      .catch((err) => alert("Error :" + err))
}

searchCity(city) {
  if (city.trim() === '') {
      this.setState({ cities: [] })
      return;
  }
  this.setState({ url: city })
  this.showCity(city);
}

showCity(url) {
  fetch(`http://localhost:8080/weather/${url}`)
      .then(res => res.json())
      .then(json => this.setState({ cities: json.data }));
}

render() {
  let { location } = this.state;
  let weather = this.state.weather.slice(0, 5);

  return (
      <div>
          <Switch>
              <TransitionGroup>
              <Route exact path="/" render={ ()=> 
                  <CSSTransition 
                  in={true}
                  appear={true}
                  timeout={300}
                  classNames='search-animation'
                  >
                  <div className="search">
                     
                      <div>
                          <input 
                              className="search-input"
                              type="text"
                              placeholder="Search for a city"
                              onChange={(e) => this.searchCity( e.target.value )}
                          />
                      </div> 
                      <div className = "cities">
                          <ul className="cities-list">
                              { this.renderCity() }
                          </ul>

                      </div> 
                      
                  </div>
                  </CSSTransition>
              }/>
             
              <Route path = { "/city/:id" } render = { () =>
                  <CSSTransition 
                      in={true}
                      appear={true}
                      timeout={1000}
                      classNames='city-animation'
                  >
                      <Forecast
                          title={location}
                          weather={weather}
                      />
                  </CSSTransition>
              }/> 
               </TransitionGroup>
          </Switch> 
      </div>
  )
}

}