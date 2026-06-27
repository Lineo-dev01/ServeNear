import { Link } from "react-router-dom";
import AppLayout from "../../components/layout/AppLayout";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import ProviderCard from "../../components/ui/ProviderCard";
import { serviceCategories } from "../../data/mockData";
import { getCustomerProviders } from "../../utils/customerProviderData";

export default function CustomerHome() {
  const providers = getCustomerProviders();
  const trustedProviders = providers.filter((provider) => provider.verified);

  return (
    <AppLayout userType="customer">
      <section className="page-header">
        <p className="eyebrow">Welcome to ServeNear</p>
        <h1>Find trusted services near you</h1>
        <p>
          Search for verified plumbers, electricians, builders, cleaners and
          other local service providers in your community.
        </p>
      </section>

      <section className="search-panel">
        <h2>What service do you need?</h2>
        <Link to="/customer/search">
          <Button>Search Services</Button>
        </Link>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Popular Categories</h2>
          <Link to="/customer/search">View all</Link>
        </div>

        <div className="category-grid">
          {serviceCategories.map((category) => (
            <Link
              key={category.id}
              to={`/customer/search?category=${category.name}`}
              className="category-card"
            >
              <span className="category-icon">{category.icon}</span>
              <h3>{category.name}</h3>
              <p>{category.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Trusted Nearby Providers</h2>
          <Link to="/customer/search">See more</Link>
        </div>

        <div className="provider-list">
          {trustedProviders.slice(0, 3).map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </div>
      </section>

      <section className="section">
        <Card>
          <h2>Need urgent help?</h2>
          <p>
            Use search to quickly find nearby providers for plumbing,
            electrical or repair emergencies.
          </p>
          <Link to="/customer/search">
            <Button variant="secondary">Find Help Now</Button>
          </Link>
        </Card>
      </section>
    </AppLayout>
  );
}