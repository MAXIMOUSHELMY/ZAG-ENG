import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// 🌡️ Get weather by city name
export const getWeather = async (city) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric",
      },
    });

    return data;
  } catch (error) {
    const message =
      error?.response?.data?.message || error.message || "Unknown error";

    console.error("🌦 Weather API Error:", message);
    throw new Error(message);
  }
};

// 📍 Get weather by coordinates (GPS)
export const getWeatherByCoords = async (lat, lon) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/weather`, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: "metric",
      },
    });

    return data;
  } catch (error) {
    const message =
      error?.response?.data?.message || error.message || "Unknown error";

    console.error("📍 Weather GPS Error:", message);
    throw new Error(message);
  }
};

// 🔍 City search (autocomplete)
export const searchCities = async (query) => {
  try {
    const { data } = await axios.get(
      "https://api.openweathermap.org/geo/1.0/direct",
      {
        params: {
          q: query,
          limit: 5,
          appid: API_KEY,
        },
      }
    );

    return data;
  } catch (error) {
    console.error("🔍 Search Error:", error);
    return [];
  }
};