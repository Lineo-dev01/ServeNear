import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import AppLayout from "../../components/layout/AppLayout";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import StatusBadge from "../../components/ui/StatusBadge";
import { getBookings, updateBookingStatus } from "../../utils/bookingStorage";

const statusFilters = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Accepted", value: "accepted" },
  { label: "Completed", value: "completed" },
  { label: "Declined", value: "declined" },
];

export default function IncomingJobs() {
  const [bookings, setBookings] = useState(getBookings());
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredBookings = useMemo(() => {
    if (selectedStatus === "all") {
      return bookings;
    }

    return bookings.filter((booking) => booking.status === selectedStatus);
  }, [bookings, selectedStatus]);

  function handleStatusUpdate(bookingId, newStatus) {
    const updatedBookings = updateBookingStatus(bookingId, newStatus);
    setBookings(updatedBookings);
  }

  return (
    <AppLayout userType="provider">
      <section className="page-header">
        <p className="eyebrow">Incoming Jobs</p>
        <h1>Manage booking requests</h1>
        <p>
          Accept, decline, or complete customer service requests.
        </p>
      </section>

      <section className="status-filter-row">
        {statusFilters.map((filter) => (
          <button
            key={filter.value}
            type="button"
            className={
              selectedStatus === filter.value
                ? "status-filter active"
                : "status-filter"
            }
            onClick={() => setSelectedStatus(filter.value)}
          >
            {filter.label}
          </button>
        ))}
      </section>

      {filteredBookings.length === 0 ? (
        <div className="empty-state">
          <h2>No jobs found</h2>
          <p>
            There are no {selectedStatus === "all" ? "" : selectedStatus} jobs
            at the moment.
          </p>
          <Link to="/provider/dashboard">
            <Button>Back to Dashboard</Button>
          </Link>
        </div>
      ) : (
        <section className="booking-list">
          {filteredBookings.map((job) => (
            <Card key={job.id} className="booking-card">
              <div className="booking-card-header">
                <div>
                  <p className="provider-category">{job.category}</p>
                  <h2>{job.businessName}</h2>
                  <p>{job.providerName}</p>
                </div>

                <StatusBadge status={job.status} />
              </div>

              <div className="booking-details-grid">
                <div>
                  <strong>Date</strong>
                  <p>{job.bookingDate}</p>
                </div>

                <div>
                  <strong>Time</strong>
                  <p>{job.bookingTime}</p>
                </div>

                <div>
                  <strong>Area</strong>
                  <p>{job.area}</p>
                </div>

                <div>
                  <strong>Price</strong>
                  <p>{job.priceEstimate}</p>
                </div>
              </div>

              <div className="booking-description">
                <strong>Service Address</strong>
                <p>{job.address}</p>

                <strong>Customer Request</strong>
                <p>{job.description}</p>
              </div>

              <div className="booking-actions">
                {job.status === "pending" && (
                  <>
                    <Button
                      onClick={() => handleStatusUpdate(job.id, "accepted")}
                    >
                      Accept Job
                    </Button>

                    <Button
                      variant="secondary"
                      onClick={() => handleStatusUpdate(job.id, "declined")}
                    >
                      Decline Job
                    </Button>
                  </>
                )}

                {job.status === "accepted" && (
                  <Button onClick={() => handleStatusUpdate(job.id, "completed")}>
                    Mark as Completed
                  </Button>
                )}

                {job.status === "completed" && (
                  <Link to="/provider/earnings">
                    <Button variant="secondary">View Earnings</Button>
                  </Link>
                )}

                <Link to={`/provider/messages?bookingId=${job.id}`}>
                  <Button variant="secondary">Message Customer</Button>
                </Link>
              </div>
            </Card>
          ))}
        </section>
      )}
    </AppLayout>
  );
}