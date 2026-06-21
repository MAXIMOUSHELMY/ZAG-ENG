import { FaCloudSun } from "react-icons/fa";

function ForecastCard({ day, temp }) {
  return (
    <div className="forecast-card">

      <h6>{day}</h6>

      <FaCloudSun className="forecast-icon" />

      <h5>{temp}°</h5>

    </div>
  );
}

export default ForecastCard;