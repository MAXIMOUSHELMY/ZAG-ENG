import { FaCompressArrowsAlt } from "react-icons/fa";

function PressureCard({ pressure }) {
  return (
    <div className="highlight-card">
      <p className="card-title">Pressure</p>

      <h2 className="card-value">
        {pressure} <span>hPa</span>
      </h2>

      <div className="wind-direction">
        <FaCompressArrowsAlt />
        <span>
          {pressure < 1000
            ? "Low"
            : pressure <= 1020
            ? "Normal"
            : "High"}
        </span>
      </div>
    </div>
  );
}

export default PressureCard;