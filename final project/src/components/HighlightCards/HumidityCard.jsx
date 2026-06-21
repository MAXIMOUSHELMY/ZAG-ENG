function HumidityCard({ humidity }) {
  return (
    <div className="highlight-card">
      <p className="card-title">Humidity</p>

      <h2 className="card-value">
        {humidity}<span>%</span>
      </h2>

      <div className="humidity-bar">
        <div
          className="humidity-fill"
          style={{ width: `${humidity}%` }}
        ></div>
      </div>

      <p className="humidity-status">
        {humidity < 40
          ? "Low"
          : humidity <= 70
          ? "Good"
          : "High"}
      </p>
    </div>
  );
}

export default HumidityCard;