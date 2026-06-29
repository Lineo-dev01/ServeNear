import { Link } from "react-router-dom";

import AppLayout from "../../components/layout/AppLayout";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { getUsers } from "../../utils/authStorage";
import { getBookings } from "../../utils/bookingStorage";
import { getReviews } from "../../utils/reviewStorage";
import { getProviderProfile } from "../../utils/providerStorage";

export default function AdminDashboard() {
  const users = getUsers();
  const bookings = getBookings();
  const reviews = getReviews();
  const providerProfile = getProviderProfile();

  const customers = users.filter((user) => user.role === "customer");
  const providers = users.filter((user) => user.role === "provider");
  const admins = users.filter((user) => user.role === "admin");

  const pendingBookings = bookings.filter(
    (booking) => booking.status === "pending"
  );

  return (
    <AppLayout userType="admin">
      <section className="page-header">
        <p className="eyebrow">Admin Dashboard</p>
        <h1>Manage ServeNear MVP</h1>
        <p>
          View platform activity, users, bookings and provider verification.
        </p>
      </section>

      <section className="stats-grid">
        <Card>
          <p className="stat-label">Customers</p>
          <h2>{customers.length}</h2>
        </Card>

        <Card>
          <p className="stat-label">Providers</p>
          <h2>{providers.length}</h2>
        </Card>

        <Card>
          <p className="stat-label">Admins</p>
          <h2>{admins.length}</h2>
        </Card>

        <Card>
          <p className="stat-label">Bookings</p>
          <h2>{bookings.length}</h2>
        </Card>

        <Card>
          <p className="stat-label">Pending Jobs</p>
          <h2>{pendingBookings.length}</h2>
        </Card>

        <Card>
          <p className="stat-label">Reviews</p>
          <h2>{reviews.length}</h2>
        </Card>
      </section>

      <section className="section">
        <div className="admin-overview-card">
          <div>
            <p className="provider-category">Current Demo Provider</p>
            <h2>{providerProfile.businessName}</h2>
            <p>{providerProfile.bio}</p>

            <div className="provider-dashboard-meta">
              <span>📍 {providerProfile.area}</span>
              <span>💰 {providerProfile.priceEstimate}</span>
              <span>🕒 {providerProfile.availability}</span>
            </div>
          </div>

          <span
            className={`verification-status ${providerProfile.verificationStatus}`}
          >
            {providerProfile.verificationStatus}
          </span>
        </div>
      </section>

      <section className="dashboard-action-grid">
        <Card>
          <h2>Manage Users</h2>
          <p>View all registered demo users and their roles.</p>
          <Link to="/admin/users">
            <Button>View Users</Button>
          </Link>
        </Card>

        <Card>
          <h2>View Bookings</h2>
          <p>Check all customer booking activity in the MVP.</p>
          <Link to="/admin/bookings">
            <Button variant="secondary">View Bookings</Button>
          </Link>
        </Card>

        <Card>
          <h2>Provider Verification</h2>
          <p>Approve or update the demo provider verification status.</p>
          <Link to="/admin/verification">
            <Button variant="secondary">Manage Verification</Button>
          </Link>
        </Card>

        <Card>
          <h2>MVP QA Checklist</h2>
          <p>Check the demo flows, role protection and reset demo data.</p>

          <Link to="/admin/qa">
            <Button variant="secondary">Open QA Checklist</Button>
          </Link>
        </Card>
      </section>
    </AppLayout>
  );
}