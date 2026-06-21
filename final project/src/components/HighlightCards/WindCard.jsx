import { FaWind } from "react-icons/fa";

function WindCard({ speed }) {
  const windSpeed = (speed * 3.6).toFixed(1);

  return (
    <div className="highlight-card">
      <p className="card-title">Wind Status</p>

      <h2 className="card-value">
        {windSpeed} <span>km/h</span>
      </h2>

      <div className="wind-direction">
        <FaWind />
        <span>
          {windSpeed < 10
            ? "Light"
            : windSpeed < 25
            ? "Moderate"
            : "Strong"}
        </span>
      </div>
    </div>
  );
}

export default WindCard;