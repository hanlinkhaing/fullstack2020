import React from "react";

const Weather = ({ weather }) => {
  return (
    <div>
      <div>
        <h4>Weather in {weather.location.name}</h4>
        <p>temperature: {weather.current.temperature} Celcius</p>
        <img
          src={weather.current.weather_icons[0]}
          alt={"#"}
          style={{ width: "50px", height: "50px" }}
        />
        <p>
          wind: {weather.current.wind_speed} mph direction{" "}
          {weather.current.wind_dir}
        </p>
      </div>
    </div>
  );
};

export default Weather;
