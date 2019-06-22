import React, { useState } from "react";
import "./css/App.css";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";
import CityFilter from  "./components/CityFilter";
import ForecastDay from  "./components/ForecastDay";
import {API_KEY} from "./config";
import { formateAmandPm, getDay, getMinMaxTemratureInfo, daysOfWeek } from "./utility/util"

const App = () => {
  const [weather, setWeather] = useState(false);
  const [forecast, setForecast] = useState(false);
  const [searchDone, apidone] = useState(false);
  const [logdingMsg, setlodingMsg] = useState('');

  const selectForecasts = data =>{
    const temrature  = getMinMaxTemratureInfo(data);
    const day = getDay(data);
    const weatherObj = {
      weather: data[0].weather,
      city: weather.city,
      country: weather.country,
      temp: temrature.minMax.max,
      day,
      time : weather.time
    };
    setWeather(weatherObj);
    console.log(data+'......................')
  }
    // get weather from a search
    const fetchWeather = async (city) => {
      setlodingMsg('Please wait................');
      try {
       
        // const API_KEY = '605068c077df37dcf4cc81dd1e4698b4'
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}`;
        const { data } = await axios.get(url
        );
        
        const date =  new Date(data.dt * 1000)
        const day  = daysOfWeek[date.getDay()];
        const time  = formateAmandPm(date)
        const weatherObj = {
          weather: data.weather,
          city: data.name,
          country: data.sys.country,
          temp: data.main.temp,
          day,
          time
        };
        setWeather(weatherObj)
        apidone(true);
        fetchWeatherforecast(city)

      } catch (e) {
        setlodingMsg("")
        console.log(e);
      }
    };
    
    const fetchWeatherforecast = async (city) => {
      setlodingMsg("")
      try {
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${API_KEY}`;
        const { data } = await axios.get(url
        );
        setForecast(data);
      } catch (e) {
        console.log(e);
        setlodingMsg("")
      }
    };
    const { list } = forecast;
    
    return (
      
      <div  className="App container">
        <CityFilter fetchWeather={fetchWeather}
        loding={logdingMsg} />
        {searchDone && (
          <WeatherCard
            weatherData={weather}
          />
        )}
        {list && 
        (<ForecastDay 
          forecasts={list} 
          selectForecasts={selectForecasts}
        />)}
            
      </div>
    );
}
export default App;

