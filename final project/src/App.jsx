import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import ChatBot from "./components/ChatBot";
import ContactForm from "./components/ContactForm";
import { getWeather, getWeatherByCoords } from "./services/weatherApi";
import "./styles/Sidebar.css";
import "./styles/dashboard.css";
import "./styles/App.css";
import "./styles/chatbot.css";
import "./styles/contact.css";
function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("Cairo");
  const [isContactOpen, setIsContactOpen] = useState(false);
  // 🌍 get weather by city
  useEffect(() => {
    getWeather(city)
      .then((data) => {
        console.log(data);
        setWeather(data);
      })
      .catch((error) => {
        console.log("City Weather Error:", error);
        setWeather(null);
      });
  }, [city]);
  // 📍 GPS location function
  const getLocationWeather = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const data = await getWeatherByCoords(latitude, longitude);
          setWeather(data);
          setCity(data.name);
        } catch (error) {
          console.log("GPS Weather Error:", error);
        }
      },
      (error) => {
        console.log("Location Error:", error);
      }
    );
  };
  // 🌈 Background based on weather
  const getBackgroundClass = (weatherMain) => {
    switch (weatherMain?.toLowerCase()) {
      case "clear":
        return "bg-clear";
      case "clouds":
        return "bg-clouds";
      case "rain":
      case "drizzle":
        return "bg-rain";
      case "snow":
        return "bg-snow";
      case "mist":
      case "haze":
      case "fog":
        return "bg-mist";
      default:
        return "bg-default";
    }
  };
  // 🛡️ SAFE LOADING (منع الشاشة البيضا)
  if (!weather || !weather.weather || !weather.weather[0]) {
    return (
      <div className="app-bg bg-default">
        <h2 style={{ textAlign: "center", paddingTop: "50px" }}>
          Loading weather...
        </h2>
      </div>
    );
  }
  return (
    <div className={`app-bg ${getBackgroundClass(weather?.weather?.[0]?.main)}`}>
      <div className="container py-4">
        <div className="weather-container">
          {/* Sidebar */}
          <Sidebar
            weather={weather}
            setCity={setCity}
            getLocationWeather={getLocationWeather}
            onOpenContact={() => setIsContactOpen(true)}
          />
          {/* Dashboard */}
          <Dashboard weather={weather} />
        </div>
      </div>
      {/* AI Chat Bot */}
      <ChatBot weather={weather} />
      {/* Contact Us Form */}
      <ContactForm isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
}
export default App;