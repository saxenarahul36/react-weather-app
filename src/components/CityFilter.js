import React, { useState } from "react";

import {countryCodes} from "../utility/util"


const CityFilter = ({fetchWeather,loding }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const onSearch = e => {
    fetchWeather(searchQuery);
    setSearchQuery("");
  };
  return (
  <div class="container">
  <div class="row justify-content-md-center city-fliter">
     <select class="form-control" onChange={e => {
              setSearchQuery(e.target.value);
            }}>
           <option value="" selected>Please select city</option>
            {countryCodes.map(country => (
              <option key={country.Code} value={country.Name}>
                {country.Name}
              </option>
            ))}
          </select>
    <button type="button" class="btn btn-primary btn-md"  onClick={e => onSearch(e)}>Search</button>
  </div>
  <div class="row justify-content-md-center city-fliter">
  {loding}
  </div>
  </div>
  );
};

export default CityFilter;
