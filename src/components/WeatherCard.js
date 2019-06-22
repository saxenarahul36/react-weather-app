import React, { Component } from "react";
import "../css/WeatherCard.css";
import "../css/weather-icons.min.css";
import { celcius } from "../utility/util"

  const WeatherCard = (props) => {
    const { city, weather, country, temp,day, time } = props.weatherData;
    const temperature = celcius(temp);;  
    return (
      <div class="WeatherCard container">
        <div class="row city">
          <div className="city-name">{`${city} ${country}`}</div>
          <div>{`${day} ${time}`}</div>
          <div>{weather[0].main}</div>
        </div>
      <div class="row">
        <div class="col-sm">
        <div className="WeatherCard-icon-container">
          <i className={`wi wi-owm-${weather[0].id} WeatherCard-icon`} />
        </div>
        </div>
        <div class="col-sm ">
        <h1 className="WeatherCard-degrees">{temperature}</h1>
        <div className="weather-symbol-div">
        <a href="#">&#8451;</a>
        <span className="weather-symbol"></span>
        <a href="#">&#8457;</a>
        </div>
        </div>
      </div>
    </div>
    );
  }


export default WeatherCard;
