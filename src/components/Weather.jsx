import React, { useEffect, useRef, useState } from "react";
import "./Weather.css";
import { FaSearch } from "react-icons/fa";

import clear from "../assests/clear.webp";
import cloudy from "../assests/cloudyy.png";
import dizzle from "../assests/dizzle.webp";
import humidity from "../assests/humidity.png";
import rain from "../assests/rain.jpg";
import snow from "../assests/snow.avif";
import wind from "../assests/wind.png";

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);

  // Icon mapping (Fix for: allIcons is not defined)
  const allIcons = {
    "01d": clear,
    "01n": clear,
    "02d": cloudy,
    "02n": cloudy,
    "03d": cloudy,
    "03n": cloudy,
    "04d": cloudy,
    "04n": cloudy,
    "09d": rain,
    "09n": rain,
    "10d": rain,
    "10n": rain,
    "11d": dizzle,
    "11n": dizzle,
    "13d": snow,
    "13n": snow,
    "50d": cloudy,
    "50n": cloudy,
  };

  // Search API function
  const search = async (city) => {
    if (!city || city.trim() === "") {
      alert("Enter city name");
      return;
    }

    try {
      const API_ID =
        process.env.REACT_APP_OPENWEATHERMAP_API_KEY ||
        "42d11141c15f0d4be9da5ba2a9231f3f";

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_ID}`;

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      const icon = allIcons[data.weather[0].icon] || clear;

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      setWeatherData(false);
      console.log(error);
    }
  };

  return (
    <div className="weather-container">
      <div className="search-box">
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter city name"
        />
        <button onClick={() => search(inputRef.current.value)}>
          <FaSearch />
        </button>
      </div>

      {weatherData ? (
        <div className="weather-info">
          <img src={weatherData.icon} alt="weather icon" className="icon" />

          <h2>{weatherData.temperature}°C</h2>
          <h3>{weatherData.location}</h3>

          <div className="details">
            <div className="col">
              <img src={humidity} alt="" />
              <p>{weatherData.humidity}%</p>
              <span>Humidity</span>
            </div>

            <div className="col">
              <img src={wind} alt="" />
              <p>{weatherData.windSpeed} km/h</p>
              <span>Wind Speed</span>
            </div>
          </div>
        </div>
      ) : (
        <p className="no-data">Search for a city...</p>
      )}
    </div>
  );
};

export default Weather;
