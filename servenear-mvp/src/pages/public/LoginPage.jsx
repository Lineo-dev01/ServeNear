import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ServeNearLogo from "../../components/ui/ServeNearLogo";
import { getDashboardPath, loginMockUser } from "../../utils/authStorage";

export default function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    if (!formData.email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!formData.password.trim()) {
      setError("Please enter your password.");
      return;
    }

    try {
      const user = loginMockUser(formData);
      navigate(getDashboardPath(user.role));
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
        <h1>Log In</h1>
        <p>Welcome back to ServeNear.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
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

          {error && <span className="form-error">{error}</span>}

          <button className="btn btn-primary auth-main-button" type="submit">
            Log In
          </button>
        </form>

        <p className="auth-switch-text">
          Don’t have an account? <Link to="/register">Sign up</Link>
        </p>
      </section>
    </div>
  );
}