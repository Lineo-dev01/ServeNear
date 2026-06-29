import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ServeNearLogo from "../../components/ui/ServeNearLogo";
import { getDashboardPath, registerMockUser } from "../../utils/authStorage";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "customer",
  });

  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!formData.fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!formData.email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const newUser = registerMockUser({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      navigate(getDashboardPath(newUser.role));
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="auth-screen">
      <header className="auth-blue-header">
        <Link to="/" className="auth-back-link">
          ←
        </Link>

        <ServeNearLogo size="medium" />
      </header>

      <section className="auth-panel">
        <h1>Sign Up</h1>
        <p>Create your ServeNear account.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="Full name"
            value={formData.fullName}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="customer">Customer</option>
            <option value="provider">Service Provider</option>
            <option value="admin">Admin Demo User</option>
          </select>

          {error && <span className="form-error">{error}</span>}

          <button className="btn btn-primary auth-main-button" type="submit">
            Sign Up
          </button>
        </form>

        <p className="auth-switch-text">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </section>
    </div>
  );
}