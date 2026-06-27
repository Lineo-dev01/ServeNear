import { useState } from "react";

import AppLayout from "../../components/layout/AppLayout";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { getProviderProfile, saveProviderProfile } from "../../utils/providerStorage";

export default function MyServices() {
  const [profile, setProfile] = useState(getProviderProfile());
  const [newService, setNewService] = useState("");
  const [newPortfolioItem, setNewPortfolioItem] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  function handleProfileChange(event) {
    const { name, value } = event.target;

    setProfile((currentProfile) => ({
      ...currentProfile,
      [name]: value,
    }));

    setSuccessMessage("");
  }

  function handleSaveProfile(event) {
    event.preventDefault();
    saveProviderProfile(profile);
    setSuccessMessage("Service profile updated successfully.");
  }

  function handleAddService() {
    if (!newService.trim()) {
      return;
    }

    const updatedProfile = {
      ...profile,
      services: [...profile.services, newService.trim()],
    };

    setProfile(updatedProfile);
    saveProviderProfile(updatedProfile);
    setNewService("");
    setSuccessMessage("Service added successfully.");
  }

  function handleRemoveService(serviceToRemove) {
    const updatedProfile = {
      ...profile,
      services: profile.services.filter((service) => service !== serviceToRemove),
    };

    setProfile(updatedProfile);
    saveProviderProfile(updatedProfile);
    setSuccessMessage("Service removed successfully.");
  }

  function handleAddPortfolioItem() {
    if (!newPortfolioItem.trim()) {
      return;
    }

    const updatedProfile = {
      ...profile,
      portfolio: [...profile.portfolio, newPortfolioItem.trim()],
    };

    setProfile(updatedProfile);
    saveProviderProfile(updatedProfile);
    setNewPortfolioItem("");
    setSuccessMessage("Portfolio item added successfully.");
  }

  function handleRemovePortfolioItem(itemToRemove) {
    const updatedProfile = {
      ...profile,
      portfolio: profile.portfolio.filter((item) => item !== itemToRemove),
    };

    setProfile(updatedProfile);
    saveProviderProfile(updatedProfile);
    setSuccessMessage("Portfolio item removed successfully.");
  }

  return (
    <AppLayout userType="provider">
      <section className="page-header">
        <p className="eyebrow">My Services</p>
        <h1>Manage your service listing</h1>
        <p>
          Update the services, pricing, availability and portfolio details customers see.
        </p>
      </section>

      {successMessage && <div className="success-banner">{successMessage}</div>}

      <section className="section">
        <Card>
          <h2>Service Details</h2>

          <form className="form" onSubmit={handleSaveProfile}>
            <label>
              Business Name
              <input
                type="text"
                name="businessName"
                value={profile.businessName}
                onChange={handleProfileChange}
              />
            </label>

            <label>
              Main Service Category
              <select
                name="category"
                value={profile.category}
                onChange={handleProfileChange}
              >
                <option value="Plumbing">Plumbing</option>
                <option value="Electrical">Electrical</option>
                <option value="Building">Building</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Roofing">Roofing</option>
              </select>
            </label>

            <label>
              Area
              <input
                type="text"
                name="area"
                value={profile.area}
                onChange={handleProfileChange}
              />
            </label>

            <label>
              Price Estimate
              <input
                type="text"
                name="priceEstimate"
                value={profile.priceEstimate}
                onChange={handleProfileChange}
                placeholder="Example: From R350"
              />
            </label>

            <label>
              Availability
              <input
                type="text"
                name="availability"
                value={profile.availability}
                onChange={handleProfileChange}
                placeholder="Example: Monday to Saturday, 08:00 - 17:00"
              />
            </label>

            <label>
              Service Bio
              <textarea
                rows="4"
                name="bio"
                value={profile.bio}
                onChange={handleProfileChange}
              />
            </label>

            <button className="btn btn-primary" type="submit">
              Save Service Details
            </button>
          </form>
        </Card>
      </section>

      <section className="section">
        <Card>
          <h2>Services Offered</h2>
          <p className="muted-text">
            Add the specific services customers can book from you.
          </p>

          <div className="inline-form">
            <input
              type="text"
              placeholder="Example: Leak repairs"
              value={newService}
              onChange={(event) => setNewService(event.target.value)}
            />
            <Button onClick={handleAddService}>Add</Button>
          </div>

          <div className="tag-list">
            {profile.services.map((service) => (
              <span key={service} className="editable-tag">
                {service}
                <button type="button" onClick={() => handleRemoveService(service)}>
                  ×
                </button>
              </span>
            ))}
          </div>
        </Card>
      </section>

      <section className="section">
        <Card>
          <h2>Portfolio</h2>
          <p className="muted-text">
            Add examples of previous work to help customers trust your services.
          </p>

          <div className="inline-form">
            <input
              type="text"
              placeholder="Example: Bathroom pipe repair"
              value={newPortfolioItem}
              onChange={(event) => setNewPortfolioItem(event.target.value)}
            />
            <Button onClick={handleAddPortfolioItem}>Add</Button>
          </div>

          <div className="portfolio-list">
            {profile.portfolio.map((item) => (
              <div key={item} className="portfolio-item editable-portfolio-item">
                <span>{item}</span>
                <button type="button" onClick={() => handleRemovePortfolioItem(item)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </AppLayout>
  );
}