import React, { useState, useEffect } from "react";
import axios from "axios";
import Weather from "./Weather";

const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const CountryDetail = ({ country }) => {
  const [weather, setWeather] = useState();

  const hook = () => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${WEATHER_API_KEY}&query=${country.name}`
      )
      .then((res) => {
        setWeather(res.data);
      });
  };

  useEffect(hook, []);

  return (
    <div>
      <h2>{country.name}</h2>
      <p>{country.capital}</p>
      <p>{country.population}</p>
      <h4>Languages</h4>
      <ul>
        {country.languages.map((lang) => (
          <li key={lang.name}>{lang.name}</li>
        ))}
      </ul>
      <img
        src={country.flag}
        alt={"#"}
        style={{ width: "100px", height: "100px" }}
      />
      {weather ? <Weather weather={weather} /> : <></>}
    </div>
  );
};

export default CountryDetail;
