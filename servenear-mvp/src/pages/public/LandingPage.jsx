import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";
import ServeNearLogo from "../../components/ui/ServeNearLogo";

export default function LandingPage() {
  return (
    <div className="welcome-page">
      <div className="welcome-image">
        <div className="welcome-logo-card">
          <ServeNearLogo />
        </div>
      </div>

      <section className="welcome-panel">
        <h1>Find the best solution to your problem</h1>

        <div className="welcome-actions">
          <Link to="/register">
            <Button>Sign Up</Button>
          </Link>

          <Link to="/login">
            <Button>Log In</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}