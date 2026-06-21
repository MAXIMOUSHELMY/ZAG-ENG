import { FaEye } from "react-icons/fa";

function VisibilityCard({ visibility }) {
  const visibilityKm = (visibility / 1000).toFixed(1);

  return (
    <div className="highlight-card">
      <p className="card-title">Visibility</p>

      <h2 className="card-value">
        {visibilityKm} <span>km</span>
      </h2>

      <div className="wind-direction">
        <FaEye />
        <span>
          {visibilityKm >= 10
            ? "Excellent"
            : visibilityKm >= 5
            ? "Good"
            : "Poor"}
        </span>
      </div>
    </div>
  );
}

export default VisibilityCard;