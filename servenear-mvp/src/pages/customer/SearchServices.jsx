import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AppLayout from "../../components/layout/AppLayout";
import ProviderCard from "../../components/ui/ProviderCard";
import { serviceCategories } from "../../data/mockData";
import { getCustomerProviders } from "../../utils/customerProviderData";

export default function SearchServices() {
  const providers = getCustomerProviders();
  
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category") || "All";

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);
  const [selectedArea, setSelectedArea] = useState("All");

  const areas = ["All", "Evaton", "Sebokeng", "Thabong", "Sharpeville"];

  const filteredProviders = useMemo(() => {
    
    return providers.filter((provider) => {
      const matchesSearch =
        provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || provider.category === selectedCategory;

      const matchesArea = selectedArea === "All" || provider.area === selectedArea;

      return matchesSearch && matchesCategory && matchesArea;
    });
  }, [searchTerm, selectedCategory, selectedArea]);

  return (
    <AppLayout userType="customer">
      <section className="page-header">
        <p className="eyebrow">Explore Services</p>
        <h1>Search local service providers</h1>
        <p>
          Find trusted township providers by service type, location and rating.
        </p>
      </section>

      <section className="filter-panel">
        <label>
          Search
          <input
            type="text"
            placeholder="Search plumbing, cleaning, building..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </label>

        <div className="filter-row">
          <label>
            Category
            <select
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
            >
              <option value="All">All categories</option>
              {serviceCategories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Area
            <select
              value={selectedArea}
              onChange={(event) => setSelectedArea(event.target.value)}
            >
              {areas.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>
            {filteredProviders.length}{" "}
            {filteredProviders.length === 1 ? "provider" : "providers"} found
          </h2>
        </div>

        {filteredProviders.length > 0 ? (
          <div className="provider-list">
            {filteredProviders.map((provider) => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h3>No providers found</h3>
            <p>
              Try changing your search, category or area to find more service
              providers.
            </p>
          </div>
        )}
      </section>
    </AppLayout>
  );
}