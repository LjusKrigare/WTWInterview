import React from "react";

const URL_ICON = "https://www.metaweather.com/static/img/weather";

const Forecast = (props) => {
    let { weather } = props;
    let date = new Date();

    return (
        <div className="forecast">
            <h1 className="title"> { props.title } </h1>
            <p className="forecast-day-date"> { date.toDateString() } </p>
            <hr />

            <div className="forecast-flex">

                {weather.map((_, i) =>
                    <div className="forecast-days">
                        <ul className="forecast-day" key={i}>

                            <li className="forecast-day-weather forecast-day-header">
                                { i === 0 ? "Today" : i === 1 ? "Tomorrow" : weather[i].applicable_date }
                            </li>

                            <li className="forecast-day-weather forecast-day-with-clouds">
                                <img 
                                    src={ `${URL_ICON}/png/${weather[i].weather_state_abbr}.png` }
                                    alt="icon"
                                />
                                <p> {weather[i].weather_state_name} </p>
                            </li>

                            <li className="forecast-day-weather"> 
                                Max: { Math.round(weather[i].max_temp) } °C 
                            </li>

                            <li className="forecast-day-weather"> 
                                Min: { Math.round(weather[i].min_temp) } °C 
                            </li>

                            <li className="forecast-day-weather">
                                Wind speed: {Math.round(weather[i].wind_speed)} mph
                             </li>

                        </ul>
                    </div>
            )}
            </div>
            
        </div>
    )
};
export default Forecast;
