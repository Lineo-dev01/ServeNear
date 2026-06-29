import AppLayout from "../../components/layout/AppLayout";
import Card from "../../components/ui/Card";
import DemoResetPanel from "../../components/demo/DemoResetPanel";

const qaSections = [
  {
    title: "Customer Journey",
    checks: [
      "Customer can register and log in.",
      "Customer can search for service providers.",
      "Customer can open a provider profile.",
      "Customer can create a booking request.",
      "Customer can message a provider.",
      "Customer can leave a review after a completed booking.",
    ],
  },
  {
    title: "Provider Journey",
    checks: [
      "Provider can register and log in.",
      "Provider can view incoming job requests.",
      "Provider can accept or decline a booking.",
      "Provider can mark a job as completed.",
      "Provider can message a customer.",
      "Provider can update service and profile details.",
    ],
  },
  {
    title: "Admin Journey",
    checks: [
      "Admin can register and log in.",
      "Admin can view registered users.",
      "Admin can view bookings.",
      "Admin can update provider verification status.",
      "Admin routes are protected from customer and provider users.",
    ],
  },
  {
    title: "MVP Quality Checks",
    checks: [
      "Protected pages redirect logged-out users to login.",
      "Users are redirected based on role.",
      "Empty states appear when there is no data.",
      "Forms show validation messages.",
      "Main pages are usable on mobile screen sizes.",
      "Demo data can be reset before presentation.",
    ],
  },
];

export default function AdminQA() {
  return (
    <AppLayout userType="admin">
      <section className="page-header">
        <p className="eyebrow">MVP QA</p>
        <h1>Demo readiness checklist</h1>
        <p>
          Use this checklist to confirm the ServeNear MVP is ready to present.
        </p>
      </section>

      <section className="qa-grid">
        {qaSections.map((section) => (
          <Card key={section.title}>
            <h2>{section.title}</h2>

            <ul className="qa-checklist">
              {section.checks.map((check) => (
                <li key={check}>
                  <span>✓</span>
                  {check}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </section>

      <section className="section">
        <DemoResetPanel />
      </section>
    </AppLayout>
  );
}