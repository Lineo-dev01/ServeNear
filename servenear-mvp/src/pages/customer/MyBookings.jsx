import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import AppLayout from "../../components/layout/AppLayout";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import StatusBadge from "../../components/ui/StatusBadge";
import { getBookings } from "../../utils/bookingStorage";
import { getReviewForBooking } from "../../utils/reviewStorage";

export default function MyBookings() {
  const [searchParams] = useSearchParams();
  const [bookings, setBookings] = useState([]);

  const bookingCreated = searchParams.get("created") === "true";

  useEffect(() => {
    setBookings(getBookings());
  }, []);

  return (
    <AppLayout userType="customer">
      <section className="page-header">
        <p className="eyebrow">My Bookings</p>
        <h1>Your service requests</h1>
        <p>View your upcoming and previous service bookings.</p>
      </section>

      {bookingCreated && (
        <div className="success-banner">
          Booking request sent successfully. The provider can now review it.
        </div>
      )}

      {bookings.length === 0 ? (
        <div className="empty-state">
          <h2>No bookings yet</h2>
          <p>
            Once you book a provider, your booking requests will appear here.
          </p>
          <Link to="/customer/search">
            <Button>Find a Provider</Button>
          </Link>
        </div>
      ) : (
        <section className="booking-list">
          {bookings.map((booking) => {
            const existingReview = getReviewForBooking(booking.id);

            return (
              <Card key={booking.id} className="booking-card">
                <div className="booking-card-header">
                  <div>
                    <p className="provider-category">{booking.category}</p>
                    <h2>{booking.businessName}</h2>
                    <p>{booking.providerName}</p>
                  </div>

                  <StatusBadge status={booking.status} />
                </div>

                <div className="booking-details-grid">
                  <div>
                    <strong>Date</strong>
                    <p>{booking.bookingDate}</p>
                  </div>

                  <div>
                    <strong>Time</strong>
                    <p>{booking.bookingTime}</p>
                  </div>

                  <div>
                    <strong>Area</strong>
                    <p>{booking.area}</p>
                  </div>

                  <div>
                    <strong>Price</strong>
                    <p>{booking.priceEstimate}</p>
                  </div>
                </div>

                <div className="booking-description">
                  <strong>Service Address</strong>
                  <p>{booking.address}</p>

                  <strong>Description</strong>
                  <p>{booking.description}</p>
                </div>

                <div className="booking-actions">
                  <Link to={`/customer/messages?bookingId=${booking.id}`}>
                    <Button variant="secondary">Message Provider</Button>
                  </Link>

                  <Link to={`/customer/providers/${booking.providerId}`}>
                    <Button>View Provider</Button>
                  </Link>

                  {booking.status === "completed" && !existingReview && (
                    <Link to={`/customer/reviews/${booking.id}`}>
                      <Button variant="secondary">Leave Review</Button>
                    </Link>
                  )}

                  {booking.status === "completed" && existingReview && (
                    <span className="review-submitted-label">
                      Review submitted
                    </span>
                  )}
                </div>
              </Card>
            );
          })}
        </section>
      )}
    </AppLayout>
  );
}