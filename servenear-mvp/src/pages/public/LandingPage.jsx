import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";

export default function LandingPage() {
  return (
    <div className="landing-page">
      <section className="hero">
        <p className="eyebrow">Township services, made simple</p>
        <h1>Find trusted local service providers near you.</h1>
        <p>
          ServeNear connects township customers with verified plumbers,
          electricians, builders, cleaners and other skilled workers.
        </p>

        <div className="hero-actions">
          <Link to="/register">
            <Button>Create Account</Button>
          </Link>
          <Link to="/login">
            <Button variant="secondary">Log In</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}