import React, { Component } from "react";
import { celcius, getDay } from "../utility/util"

  const ForecastDay = (props) => {
  // Filters the data by list of 5 day forecast.  
  const groupByDays = data => {
    return (data.reduce((list, item) => {
      const forecastDate = item.dt_txt.substr(0,10);
      list[forecastDate] = list[forecastDate] || [];
      list[forecastDate].push(item);
      return list;
    }, {}));
  };


  // Fetches the icon using the icon code available in the forecast data.
  const getIcon = data => `https://openweathermap.org/img/w/${data[0].weather[0].icon}.png`;
  // Gets the Minimum, Maximum and Avg Humidity temperatures of the day.
  const getInfo = (data, min=[], max=[], humidity=[]) => {
    data.map(item => {
      max.push(item.main.temp_max);
      min.push(item.main.temp_min);
      humidity.push(item.main.humidity);
    });

    const minMax = {
      min: Math.round(Math.min(...min)),
      max: Math.round(Math.max(...max)),
    };

    // Gets the day's average humdity
    const avgHumdity = Math.round(humidity.reduce((curr, next) => curr + next) / humidity.length);

    return (
      <div className="weather-info">
        <div className="min-max">
          <strong>{`${celcius(minMax.max)}°C`}</strong> / {`${celcius(minMax.min)}°C`}
        </div>
        <div className="more-info">
          {`Avg. Humidity: ${avgHumdity}%`}
        </div>
      </div>
    );
  };



    const { forecasts,selectForecasts } = props;
    const tiles = Object.values(groupByDays(forecasts));
    const ForecastDay = tiles.length > 5 ? tiles.slice(0, 5) : tiles;

    return (
      <div className="forecast-tiles row">
        {ForecastDay.map((item, i) => (
          <div class="col-sm" 
            className={`forecast-tile tile-${i}`}
            key={i}
            onClick={() => {selectForecasts(item)}}
          >
            <div className="primary-info">
              <div className="icon">
                <img alt="" src={getIcon(item)} />
                {getDay(item)}
              </div>
              {getInfo(item)}
            </div>
          </div>
        ))}
      </div>
    );
  
}

export default ForecastDay;
