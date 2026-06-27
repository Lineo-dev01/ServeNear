import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import AppLayout from "../../components/layout/AppLayout";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import StatusBadge from "../../components/ui/StatusBadge";
import { getBookings } from "../../utils/bookingStorage";
import { getReviewForBooking, saveReview } from "../../utils/reviewStorage";

export default function LeaveReview() {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const booking = getBookings().find((item) => item.id === bookingId);
  const existingReview = getReviewForBooking(bookingId);

  const [rating, setRating] = useState("5");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  if (!booking) {
    return (
      <AppLayout userType="customer">
        <div className="empty-state">
          <h1>Booking not found</h1>
          <p>This booking does not exist or may have been removed.</p>
          <Link to="/customer/bookings">
            <Button>Back to Bookings</Button>
          </Link>
        </div>
      </AppLayout>
    );
  }

  if (booking.status !== "completed") {
    return (
      <AppLayout userType="customer">
        <div className="empty-state">
          <h1>Review not available yet</h1>
          <p>You can only leave a review after the booking is completed.</p>
          <Link to="/customer/bookings">
            <Button>Back to Bookings</Button>
          </Link>
        </div>
      </AppLayout>
    );
  }

  if (existingReview) {
    return (
      <AppLayout userType="customer">
        <section className="page-header">
          <p className="eyebrow">Review Submitted</p>
          <h1>You already reviewed this provider</h1>
          <p>Your review helps other customers choose trusted providers.</p>
        </section>

        <Card>
          <h2>{booking.businessName}</h2>
          <p>Rating: {existingReview.rating}/5</p>
          <p>{existingReview.comment}</p>

          <Link to={`/customer/providers/${booking.providerId}`}>
            <Button>View Provider</Button>
          </Link>
        </Card>
      </AppLayout>
    );
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!rating) {
      setError("Please select a rating.");
      return;
    }

    if (!comment.trim()) {
      setError("Please write a short review.");
      return;
    }

    const review = {
      id: crypto.randomUUID(),
      bookingId: booking.id,
      providerId: booking.providerId,
      providerName: booking.providerName,
      businessName: booking.businessName,
      category: booking.category,
      rating: Number(rating),
      comment: comment.trim(),
      createdAt: new Date().toISOString(),
    };

    saveReview(review);
    navigate(`/customer/providers/${booking.providerId}?reviewed=true`);
  }

  return (
    <AppLayout userType="customer">
      <section className="page-header">
        <p className="eyebrow">Leave Review</p>
        <h1>Review {booking.businessName}</h1>
        <p>
          Share your experience so other customers can choose trusted providers.
        </p>
      </section>

      <section className="section">
        <Card>
          <div className="booking-card-header">
            <div>
              <p className="provider-category">{booking.category}</p>
              <h2>{booking.businessName}</h2>
              <p>{booking.providerName}</p>
            </div>

            <StatusBadge status={booking.status} />
          </div>
        </Card>
      </section>

      <section className="section">
        <Card>
          <h2>Your Review</h2>

          <form className="form" onSubmit={handleSubmit}>
            <label>
              Rating
              <select
                value={rating}
                onChange={(event) => setRating(event.target.value)}
              >
                <option value="5">5 — Excellent</option>
                <option value="4">4 — Good</option>
                <option value="3">3 — Okay</option>
                <option value="2">2 — Poor</option>
                <option value="1">1 — Very Poor</option>
              </select>
            </label>

            <label>
              Comment
              <textarea
                rows="4"
                placeholder="Example: The provider arrived on time and fixed the problem well."
                value={comment}
                onChange={(event) => setComment(event.target.value)}
              />
            </label>

            {error && <span className="form-error">{error}</span>}

            <button className="btn btn-primary" type="submit">
              Submit Review
            </button>
          </form>
        </Card>
      </section>
    </AppLayout>
  );
}