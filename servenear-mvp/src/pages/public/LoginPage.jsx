import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
    <div className="auth-page">
      <h1>Log in</h1>
      <p>Access your ServeNear account.</p>

      <form className="form" onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>

        <label>
          Password
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>

        {error && <span className="form-error">{error}</span>}

        <button className="btn btn-primary" type="submit">
          Log In
        </button>
      </form>

      <p>
        New to ServeNear? <Link to="/register">Create an account</Link>
      </p>
    </div>
  );
}