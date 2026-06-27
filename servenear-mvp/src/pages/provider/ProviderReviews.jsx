import { Link } from "react-router-dom";

import AppLayout from "../../components/layout/AppLayout";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { getReviews } from "../../utils/reviewStorage";

export default function ProviderReviews() {
  const reviews = getReviews();

  const averageRating =
    reviews.length === 0
      ? 0
      : (
          reviews.reduce((sum, review) => sum + Number(review.rating), 0) /
          reviews.length
        ).toFixed(1);

  return (
    <AppLayout userType="provider">
      <section className="page-header">
        <p className="eyebrow">Provider Reviews</p>
        <h1>Your customer feedback</h1>
        <p>View ratings and comments from completed service bookings.</p>
      </section>

      <section className="stats-grid">
        <Card>
          <p className="stat-label">Average Rating</p>
          <h2>{averageRating}/5</h2>
        </Card>

        <Card>
          <p className="stat-label">Total Reviews</p>
          <h2>{reviews.length}</h2>
        </Card>
      </section>

      {reviews.length === 0 ? (
        <div className="empty-state">
          <h2>No reviews yet</h2>
          <p>Reviews will appear here after completed customer bookings.</p>
          <Link to="/provider/jobs">
            <Button>View Jobs</Button>
          </Link>
        </div>
      ) : (
        <section className="review-list">
          {reviews.map((review) => (
            <Card key={review.id} className="review-card">
              <div className="review-card-header">
                <div>
                  <p className="provider-category">{review.category}</p>
                  <h2>{review.businessName}</h2>
                </div>

                <strong>⭐ {review.rating}/5</strong>
              </div>

              <p>{review.comment}</p>
              <small>{new Date(review.createdAt).toLocaleString()}</small>
            </Card>
          ))}
        </section>
      )}
    </AppLayout>
  );
}