import { Link } from "react-router-dom";

import AppLayout from "../../components/layout/AppLayout";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import StatusBadge from "../../components/ui/StatusBadge";
import { getBookings } from "../../utils/bookingStorage";
import { getReviews } from "../../utils/reviewStorage";
import { getProviderProfile } from "../../utils/providerStorage";

export default function ProviderDashboard() {
  const bookings = getBookings();
  const reviews = getReviews();
  const profile = getProviderProfile();

  const pendingJobs = bookings.filter((booking) => booking.status === "pending");
  const acceptedJobs = bookings.filter(
    (booking) => booking.status === "accepted"
  );
  const completedJobs = bookings.filter(
    (booking) => booking.status === "completed"
  );

  const recentJobs = bookings.slice(0, 3);

  return (
    <AppLayout userType="provider">
      <section className="page-header">
        <p className="eyebrow">Provider Dashboard</p>
        <h1>Welcome, {profile.fullName}</h1>
        <p>
          Manage your jobs, services, profile and customer feedback in one place.
        </p>
      </section>

      <section className="provider-summary-card">
        <div>
          <p className="provider-category">{profile.category}</p>
          <h2>{profile.businessName}</h2>
          <p>{profile.bio}</p>

          <div className="provider-dashboard-meta">
            <span>📍 {profile.area}</span>
            <span>💰 {profile.priceEstimate}</span>
            <span>🕒 {profile.availability}</span>
          </div>
        </div>

        <span className={`verification-status ${profile.verificationStatus}`}>
          {profile.verificationStatus}
        </span>
      </section>

      <section className="stats-grid">
        <Card>
          <p className="stat-label">Pending Jobs</p>
          <h2>{pendingJobs.length}</h2>
        </Card>

        <Card>
          <p className="stat-label">Accepted Jobs</p>
          <h2>{acceptedJobs.length}</h2>
        </Card>

        <Card>
          <p className="stat-label">Completed Jobs</p>
          <h2>{completedJobs.length}</h2>
        </Card>

        <Card>
          <p className="stat-label">Reviews</p>
          <h2>{reviews.length}</h2>
        </Card>
      </section>

      <section className="dashboard-action-grid">
        <Card>
          <h2>Job Requests</h2>
          <p>Review customer booking requests and update the job status.</p>

          <Link to="/provider/jobs">
            <Button>View Jobs</Button>
          </Link>
        </Card>

        <Card>
          <h2>My Services</h2>
          <p>Update your services, pricing, availability and portfolio.</p>

          <Link to="/provider/services">
            <Button variant="secondary">Manage Services</Button>
          </Link>
        </Card>

        <Card>
          <h2>Customer Reviews</h2>
          <p>View ratings and feedback from customers after completed jobs.</p>

          <Link to="/provider/reviews">
            <Button variant="secondary">View Reviews</Button>
          </Link>
        </Card>

        <Card>
          <h2>Profile Settings</h2>
          <p>Update your provider profile and verification status.</p>

          <Link to="/provider/profile">
            <Button variant="secondary">Edit Profile</Button>
          </Link>
        </Card>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Recent Requests</h2>
          <Link to="/provider/jobs">View all</Link>
        </div>

        {recentJobs.length === 0 ? (
          <div className="empty-state">
            <h3>No job requests yet</h3>
            <p>
              Customer booking requests will appear here once they are created.
            </p>
          </div>
        ) : (
          <div className="booking-list">
            {recentJobs.map((job) => (
              <Card key={job.id} className="booking-card">
                <div className="booking-card-header">
                  <div>
                    <p className="provider-category">{job.category}</p>
                    <h2>{job.businessName}</h2>
                    <p>{job.address}</p>
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
              </Card>
            ))}
          </div>
        )}
      </section>
    </AppLayout>
  );
}