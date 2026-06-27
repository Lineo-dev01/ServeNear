import { Link } from "react-router-dom";
import Card from "./Card";
import Button from "./Button";

export default function ProviderCard({ provider }) {
  return (
    <Card className="provider-card">
      <div className="provider-card-header">
        <div>
          <p className="provider-category">{provider.category}</p>
          <h3>{provider.businessName}</h3>
          <p className="provider-name">{provider.name}</p>
        </div>

        {provider.verified ? (
          <span className="verified-badge">Verified</span>
        ) : (
          <span className="unverified-badge">Not verified</span>
        )}
      </div>

      <p className="provider-description">{provider.description}</p>

      <div className="provider-meta">
        <span>⭐ {provider.rating} ({provider.reviewCount})</span>
        <span>📍 {provider.area}</span>
        <span>{provider.distance}</span>
      </div>

      <div className="provider-card-footer">
        <strong>{provider.priceEstimate}</strong>

        <Link to={`/customer/providers/${provider.id}`}>
          <Button>View Profile</Button>
        </Link>
      </div>
    </Card>
  );
}