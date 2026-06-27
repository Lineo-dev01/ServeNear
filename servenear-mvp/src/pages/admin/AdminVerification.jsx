import { useState } from "react";

import AppLayout from "../../components/layout/AppLayout";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import {
  getProviderProfile,
  saveProviderProfile,
} from "../../utils/providerStorage";

export default function AdminVerification() {
  const [profile, setProfile] = useState(getProviderProfile());
  const [successMessage, setSuccessMessage] = useState("");

  function handleStatusChange(event) {
    setProfile((currentProfile) => ({
      ...currentProfile,
      verificationStatus: event.target.value,
    }));

    setSuccessMessage("");
  }

  function handleSaveVerification() {
    saveProviderProfile(profile);
    setSuccessMessage("Provider verification status updated successfully.");
  }

  return (
    <AppLayout userType="admin">
      <section className="page-header">
        <p className="eyebrow">Provider Verification</p>
        <h1>Manage provider verification</h1>
        <p>
          Review and update the demo provider verification status for the MVP.
        </p>
      </section>

      {successMessage && <div className="success-banner">{successMessage}</div>}

      <section className="section">
        <Card>
          <div className="verification-admin-header">
            <div>
              <p className="provider-category">{profile.category}</p>
              <h2>{profile.businessName}</h2>
              <p>{profile.fullName}</p>
            </div>

            <span className={`verification-status ${profile.verificationStatus}`}>
              {profile.verificationStatus}
            </span>
          </div>

          <div className="provider-meta profile-meta">
            <span>📍 {profile.area}</span>
            <span>📞 {profile.phone}</span>
            <span>💰 {profile.priceEstimate}</span>
          </div>

          <div className="verification-note">
            <strong>MVP note:</strong>
            <p>
              In the full product, this page would allow admins to review ID
              documents, trade certificates and profile reports. For this MVP,
              verification is represented by a simple status.
            </p>
          </div>

          <label>
            Verification Status
            <select
              value={profile.verificationStatus}
              onChange={handleStatusChange}
            >
              <option value="unverified">Unverified</option>
              <option value="pending">Pending</option>
              <option value="verified">Verified</option>
            </select>
          </label>

          <div className="settings-actions">
            <Button onClick={handleSaveVerification}>Save Status</Button>
          </div>
        </Card>
      </section>
    </AppLayout>
  );
}