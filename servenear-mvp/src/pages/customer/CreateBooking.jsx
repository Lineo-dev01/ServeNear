import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import AppLayout from "../../components/layout/AppLayout";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { getCustomerProviderById } from "../../utils/customerProviderData";
import { saveBooking } from "../../utils/bookingStorage";

export default function CreateBooking() {
  const { providerId } = useParams();
  const navigate = useNavigate();

  const provider = getCustomerProviderById(providerId);

  const today = useMemo(() => new Date().toISOString().split("T")[0], []);

  const [formData, setFormData] = useState({
    serviceType: provider?.category || "",
    bookingDate: "",
    bookingTime: "",
    address: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  if (!provider) {
    return (
      <AppLayout userType="customer">
        <div className="empty-state">
          <h1>Provider not found</h1>
          <p>This provider does not exist or may no longer be available.</p>
          <Link to="/customer/search">
            <Button>Back to Search</Button>
          </Link>
        </div>
      </AppLayout>
    );
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: "",
    }));
  }

  function validateForm() {
    const newErrors = {};

    if (!formData.bookingDate) {
      newErrors.bookingDate = "Please choose a booking date.";
    }

    if (!formData.bookingTime) {
      newErrors.bookingTime = "Please choose a booking time.";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Please enter the service address.";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Please describe what you need help with.";
    }

    return newErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newBooking = {
      id: crypto.randomUUID(),
      providerId: provider.id,
      providerName: provider.name,
      businessName: provider.businessName,
      category: provider.category,
      area: provider.area,
      priceEstimate: provider.priceEstimate,
      status: "pending",
      createdAt: new Date().toISOString(),
      ...formData,
    };

    saveBooking(newBooking);
    navigate("/customer/bookings?created=true");
  }

  return (
    <AppLayout userType="customer">
      <section className="page-header">
        <p className="eyebrow">Create Booking</p>
        <h1>Book {provider.businessName}</h1>
        <p>
          Complete the details below to send a booking request to this provider.
        </p>
      </section>

      <section className="section">
        <Card>
          <div className="booking-provider-summary">
            <div>
              <p className="provider-category">{provider.category}</p>
              <h2>{provider.businessName}</h2>
              <p>{provider.name}</p>
            </div>

            {provider.verified ? (
              <span className="verified-badge">Verified</span>
            ) : (
              <span className="unverified-badge">Not verified</span>
            )}
          </div>

          <div className="provider-meta profile-meta">
            <span>⭐ {provider.rating} rating</span>
            <span>📍 {provider.area}</span>
            <span>{provider.priceEstimate}</span>
          </div>
        </Card>
      </section>

      <section className="section">
        <Card>
          <h2>Booking Details</h2>

          <form className="form" onSubmit={handleSubmit}>
            <label>
              Service Type
              <input
                type="text"
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                disabled
              />
            </label>

            <label>
              Date
              <input
                type="date"
                name="bookingDate"
                min={today}
                value={formData.bookingDate}
                onChange={handleChange}
              />
              {errors.bookingDate && (
                <span className="form-error">{errors.bookingDate}</span>
              )}
            </label>

            <label>
              Time
              <input
                type="time"
                name="bookingTime"
                value={formData.bookingTime}
                onChange={handleChange}
              />
              {errors.bookingTime && (
                <span className="form-error">{errors.bookingTime}</span>
              )}
            </label>

            <label>
              Service Address
              <input
                type="text"
                name="address"
                placeholder="Example: Evaton, Zone 3"
                value={formData.address}
                onChange={handleChange}
              />
              {errors.address && (
                <span className="form-error">{errors.address}</span>
              )}
            </label>

            <label>
              Describe the problem
              <textarea
                name="description"
                rows="4"
                placeholder="Example: The kitchen tap is leaking and needs repair."
                value={formData.description}
                onChange={handleChange}
              />
              {errors.description && (
                <span className="form-error">{errors.description}</span>
              )}
            </label>

            <button className="btn btn-primary" type="submit">
              Send Booking Request
            </button>
          </form>
        </Card>
      </section>
    </AppLayout>
  );
}