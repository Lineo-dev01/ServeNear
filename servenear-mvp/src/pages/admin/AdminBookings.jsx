import AppLayout from "../../components/layout/AppLayout";
import Card from "../../components/ui/Card";
import StatusBadge from "../../components/ui/StatusBadge";
import { getBookings } from "../../utils/bookingStorage";

export default function AdminBookings() {
  const bookings = getBookings();

  return (
    <AppLayout userType="admin">
      <section className="page-header">
        <p className="eyebrow">Admin Bookings</p>
        <h1>All bookings</h1>
        <p>View all customer service requests created in the MVP.</p>
      </section>

      {bookings.length === 0 ? (
        <div className="empty-state">
          <h2>No bookings yet</h2>
          <p>Customer bookings will appear here once they are created.</p>
        </div>
      ) : (
        <section className="booking-list">
          {bookings.map((booking) => (
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

                <strong>Customer Request</strong>
                <p>{booking.description}</p>
              </div>
            </Card>
          ))}
        </section>
      )}
    </AppLayout>
  );
}