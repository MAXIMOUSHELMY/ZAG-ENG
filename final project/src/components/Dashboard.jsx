import ForecastCard from "./ForecastCard";
import UVCard from "./HighlightCards/UVCard";
import WindCard from "./HighlightCards/WindCard";
import SunriseCard from "./HighlightCards/SunriseCard";
import HumidityCard from "./HighlightCards/HumidityCard";
import VisibilityCard from "./HighlightCards/VisibilityCard";
import PressureCard from "./HighlightCards/PressureCard";

function Dashboard({ weather }) {
  if (!weather) {
    return <h2>Loading...</h2>;
  }

  const forecast = [
    { day: "Mon", temp: 15 },
    { day: "Tue", temp: 18 },
    { day: "Wed", temp: 12 },
    { day: "Thu", temp: 10 },
    { day: "Fri", temp: 8 },
    { day: "Sat", temp: 14 },
    { day: "Sun", temp: 16 },
  ];

  return (
    <div className="dashboard p-4">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-5">

        <div>
          <button className="btn btn-dark rounded-pill px-4 me-2">
            Today
          </button>

          <button className="btn btn-light rounded-pill px-4">
            Week
          </button>
        </div>

        <img
          src="https://i.pravatar.cc/50"
          alt="profile"
          className="profile-img"
        />
      </div>

      {/* Forecast */}
      <div className="forecast-container">
        {forecast.map((item, index) => (
          <ForecastCard
            key={index}
            day={item.day}
            temp={item.temp}
          />
        ))}
      </div>

      {/* Today's Highlights */}
      <h3 className="mt-5 mb-4 fw-bold">
        Today's Highlights
      </h3>

      <div className="highlights-container">
        <UVCard />
        <WindCard speed={weather.wind.speed} />
        <SunriseCard
          sunrise={weather.sys.sunrise}
          sunset={weather.sys.sunset}
        />
        <HumidityCard humidity={weather.main.humidity} />
        <VisibilityCard visibility={weather.visibility} />
        <PressureCard pressure={weather.main.pressure} />
      </div>

    </div>
  );
}

export default Dashboard;