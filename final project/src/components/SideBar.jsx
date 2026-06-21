import { useState } from "react";
import { FaSearch, FaCloudSun } from "react-icons/fa";
import { searchCities } from "../services/weatherApi";
import {
  FaSun,
  FaCloud,
  FaCloudRain,
  FaSmog,
  FaSnowflake
} from "react-icons/fa";

function Sidebar({ weather, setCity, getLocationWeather, onOpenContact }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  let timeout;

  const getTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getDay = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString([], {
      weekday: "long",
    });
  };

  const getWeatherIcon = (weatherMain) => {
    switch (weatherMain?.toLowerCase()) {
      case "clear":
        return <FaSun color="gold" />;
      case "clouds":
        return <FaCloud color="gray" />;
      case "rain":
      case "drizzle":
        return <FaCloudRain color="blue" />;
      case "snow":
        return <FaSnowflake color="lightblue" />;
      case "mist":
      case "haze":
      case "fog":
        return <FaSmog color="lightgray" />;
      default:
        return <FaCloudSun />;
    }
  };

  const handleSearch = (value) => {
    setQuery(value);

    clearTimeout(timeout);

    if (!value) {
      setSuggestions([]);
      return;
    }

    setLoading(true);

    timeout = setTimeout(async () => {
      try {
        const data = await searchCities(value);
        setSuggestions(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }, 400);
  };

  const selectCity = (city) => {
    setCity(city.name); // 🔥 مهم: بدون , country
    setQuery("");
    setSuggestions([]);
  };

  return (
    <div className="sidebar p-4">

      {/* 🔍 Search Box */}
      <div className="search-box">
        <FaSearch className="search-icon" />

        <input
          type="text"
          placeholder="Search for places..."
          className="search-input"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
        />

        {loading && (
          <div className="suggestions">
            <div className="suggestion-item">Loading...</div>
          </div>
        )}

        {suggestions.length > 0 && (
          <div className="suggestions">
            {suggestions.map((city, index) => (
              <div
                key={index}
                className="suggestion-item"
                onClick={() => selectCity(city)}
              >
                📍 {city.name}, {city.country}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 📍 Location Button (OUTSIDE SEARCH) */}
      <button
        onClick={getLocationWeather}
        className="location-btn"
      >
        📍 Use My Location
      </button>

      {/* ✉️ Contact Us Button */}
      <button
        onClick={onOpenContact}
        className="contact-btn"
      >
        ✉️ تواصل معنا
      </button>

      {/* 🌤 Weather */}
      <div className="text-center mt-5">

        <div className="weather-icon">
          {getWeatherIcon(weather.weather[0].main)}
        </div>

        <h1 className="temp">
          {Math.round(weather.main.temp)}°
        </h1>

        <h5 className="day">
          {getDay(weather.dt)}{" "}
          <span className="time">
            {getTime(weather.dt)}
          </span>
        </h5>

        <p className="weather-status">
          {weather.weather[0].description}
        </p>

      </div>

      <hr className="my-4" />

      <div className="weather-details">

        <p className="mb-3">
          🌧 Rain{" "}
          <span className="text-secondary">
            {weather.clouds.all}%
          </span>
        </p>

        <div className="city-card">
          <img
            src="https://picsum.photos/300/200"
            alt="city"
            className="city-image"
          />

          <div className="overlay">
            <h5>
              {weather.name}, {weather.sys.country}
            </h5>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Sidebar;