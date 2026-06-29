import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import Card from "../ui/Card";
import { clearAllDemoData, clearDemoData } from "../../utils/demoStorage";
import { logoutUser } from "../../utils/authStorage";

export default function DemoResetPanel() {
  const navigate = useNavigate();

  function handleClearDemoData() {
    const confirmed = window.confirm(
      "This will clear bookings, messages, reviews and provider profile changes. Continue?"
    );

    if (!confirmed) return;

    clearDemoData();
    window.location.reload();
  }

  function handleClearEverything() {
    const confirmed = window.confirm(
      "This will clear all demo data, including users and logged-in accounts. Continue?"
    );

    if (!confirmed) return;

    clearAllDemoData();
    logoutUser();
    navigate("/");
  }

  return (
    <Card>
      <h2>Demo Reset Controls</h2>
      <p className="muted-text">
        Use these controls before your presentation if you want to reset the MVP
        into a clean demo state.
      </p>

      <div className="settings-actions">
        <Button variant="secondary" onClick={handleClearDemoData}>
          Clear App Demo Data
        </Button>

        <Button variant="secondary" onClick={handleClearEverything}>
          Clear Everything
        </Button>
      </div>

      <p className="small-note">
        “Clear App Demo Data” keeps user accounts. “Clear Everything” removes
        users and logs you out.
      </p>
    </Card>
  );
}