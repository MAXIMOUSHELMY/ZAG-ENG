import { FaSun } from "react-icons/fa";

function SunriseCard({ sunrise, sunset }) {
  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="highlight-card">
      <p className="card-title">Sunrise & Sunset</p>

      <div className="sun-item">
        <FaSun className="sun-icon" />
        <div>
          <h5>{formatTime(sunrise)}</h5>
          <small>Sunrise</small>
        </div>
      </div>

      <div className="sun-item mt-3">
        <FaSun className="sun-icon sunset" />
        <div>
          <h5>{formatTime(sunset)}</h5>
          <small>Sunset</small>
        </div>
      </div>
    </div>
  );
}

export default SunriseCard;