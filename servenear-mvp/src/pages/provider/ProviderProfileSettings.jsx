import { useState } from "react";

import AppLayout from "../../components/layout/AppLayout";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import {
  getProviderProfile,
  saveProviderProfile,
  resetProviderProfile,
} from "../../utils/providerStorage";

export default function ProviderProfileSettings() {
  const [profile, setProfile] = useState(getProviderProfile());
  const [successMessage, setSuccessMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setProfile((currentProfile) => ({
      ...currentProfile,
      [name]: value,
    }));

    setSuccessMessage("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    saveProviderProfile(profile);
    setSuccessMessage("Profile settings updated successfully.");
  }

  function handleSaveVerification() {
    saveProviderProfile(profile);
    setSuccessMessage("Verification status updated successfully.");
  }

  function handleResetProfile() {
    const defaultProfile = resetProviderProfile();
    setProfile(defaultProfile);
    setSuccessMessage("Profile has been reset to the demo default.");
  }

  return (
    <AppLayout userType="provider">
      <section className="page-header">
        <p className="eyebrow">Profile & Settings</p>
        <h1>Manage your provider account</h1>
        <p>
          Update your personal details, public business profile and verification information.
        </p>
      </section>

      {successMessage && <div className="success-banner">{successMessage}</div>}

      <section className="section">
        <Card>
          <h2>Public Provider Profile</h2>

          <form className="form" onSubmit={handleSubmit}>
            <label>
              Full Name
              <input
                type="text"
                name="fullName"
                value={profile.fullName}
                onChange={handleChange}
              />
            </label>

            <label>
              Business Name
              <input
                type="text"
                name="businessName"
                value={profile.businessName}
                onChange={handleChange}
              />
            </label>

            <label>
              Phone Number
              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
              />
            </label>

            <label>
              Area
              <input
                type="text"
                name="area"
                value={profile.area}
                onChange={handleChange}
              />
            </label>

            <label>
              Bio
              <textarea
                rows="4"
                name="bio"
                value={profile.bio}
                onChange={handleChange}
              />
            </label>

            <button className="btn btn-primary" type="submit">
              Save Profile
            </button>
          </form>
        </Card>
      </section>

      <section className="section">
        <Card>
          <h2>Verification Status</h2>

          <div className="verification-panel">
            <div>
              <p className="muted-text">Current status</p>
              <span className={`verification-status ${profile.verificationStatus}`}>
                {profile.verificationStatus}
              </span>
            </div>

            <p>
              For the MVP, provider verification is shown as a status only. In the full version,
              providers would upload certificates or ID documents for review.
            </p>
          </div>

          <label>
            Demo Verification Status
            <select
              name="verificationStatus"
              value={profile.verificationStatus}
              onChange={handleChange}
            >
              <option value="unverified">Unverified</option>
              <option value="pending">Pending</option>
              <option value="verified">Verified</option>
            </select>
          </label>

          <div className="settings-actions">
            <Button onClick={() => saveProviderProfile(profile)}>
              Save Verification Status
            </Button>

            <Button variant="secondary" onClick={handleResetProfile}>
              Reset Demo Profile
            </Button>
          </div>
        </Card>
      </section>
    </AppLayout>
  );
}