import React, { Component } from 'react';
import './Weather.css';
import Forecast from "./Forecast"
import { Link } from "react-router-dom";

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

renderCity() {
    let { cities } = this.state;

    return cities.map((_, i) => {
        return (
            <li className="cities-list-item" key={i}>
                <span 
                    className="cities-list-item-span"
                    onClick={()=>this.getWeather( cities[i].woeid) }>
                    <Link 
                        to={`/city/${i}`}>{cities[i].title}
                    </Link>
                </span>
            </li>
        )
    })
}

render() {
  let { location } = this.state;
  let weather = this.state.weather.slice(0, 5);

  return (
      <div>
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
    
                      <Forecast
                          title={location}
                          weather={weather}
                      />
      </div>
  )
}

}