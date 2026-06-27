import { Link, useParams, useSearchParams } from "react-router-dom";

import AppLayout from "../../components/layout/AppLayout";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { getCustomerProviderById } from "../../utils/customerProviderData";
import {
  getAverageRating,
  getReviewsForProvider,
} from "../../utils/reviewStorage";

export default function ProviderProfile() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const provider = getCustomerProviderById(id);
  const reviewSubmitted = searchParams.get("reviewed") === "true";

  if (!provider) {
    return (
      <AppLayout userType="customer">
        <div className="empty-state">
          <h1>Provider not found</h1>
          <p>This provider does not exist or may no longer be available.</p>
          <Link to="/customer/search">
            <Button>Back to Search</Button>
          </Link>
        </div>
      </AppLayout>
    );
  }

  const reviews = getReviewsForProvider(provider.id);
  const averageRating = getAverageRating(provider.id, provider.rating);
  const totalReviews = provider.reviewCount + reviews.length;

  return (
    <AppLayout userType="customer">
      {reviewSubmitted && (
        <div className="success-banner">
          Review submitted successfully. Thank you for your feedback.
        </div>
      )}

      <section className="profile-header-card">
        <div>
          <p className="provider-category">{provider.category}</p>
          <h1>{provider.businessName}</h1>
          <p>{provider.name}</p>
        </div>

        {provider.verified ? (
          <span className="verified-badge">Verified Provider</span>
        ) : (
          <span className="unverified-badge">Not Verified Yet</span>
        )}
      </section>

      <section className="section">
        <Card>
          <h2>About this provider</h2>
          <p>{provider.description}</p>

          <div className="provider-meta profile-meta">
            <span>⭐ {averageRating} rating</span>
            <span>{totalReviews} reviews</span>
            <span>📍 {provider.area}</span>
            <span>{provider.distance}</span>
          </div>
        </Card>
      </section>

      <section className="section">
        <Card>
          <h2>Pricing & Availability</h2>
          <p>{provider.priceEstimate}</p>
          {provider.availability && <p>{provider.availability}</p>}
        </Card>
      </section>

      <section className="section">
        <Card>
          <h2>Work Portfolio</h2>
          <div className="portfolio-list">
            {provider.portfolio.map((item) => (
              <div key={item} className="portfolio-item">
                {item}
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="section">
        <Card>
          <h2>Reviews</h2>

          {reviews.length === 0 ? (
            <p>
              Customers rate this provider {provider.rating}/5 based on{" "}
              {provider.reviewCount} previous reviews.
            </p>
          ) : (
            <div className="review-list">
              {reviews.map((review) => (
                <div key={review.id} className="review-card">
                  <div className="review-card-header">
                    <strong>⭐ {review.rating}/5</strong>
                    <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p>{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </Card>
      </section>

      <section className="sticky-action">
        <Link to={`/customer/book/${provider.id}`}>
          <Button>Book Now</Button>
        </Link>
        <Link to="/customer/messages">
          <Button variant="secondary">Send Message</Button>
        </Link>
      </section>
    </AppLayout>
  );
}