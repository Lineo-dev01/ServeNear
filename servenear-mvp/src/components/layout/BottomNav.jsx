import { NavLink } from "react-router-dom";

export default function BottomNav({ userType = "customer" }) {
  const customerLinks = [
    { label: "Home", path: "/customer/home" },
    { label: "Search", path: "/customer/search" },
    { label: "Bookings", path: "/customer/bookings" },
    { label: "Messages", path: "/customer/messages" },
  ];

  const providerLinks = [
    { label: "Home", path: "/provider/dashboard" },
    { label: "Jobs", path: "/provider/jobs" },
    { label: "Services", path: "/provider/services" },
    { label: "Messages", path: "/provider/messages" },
  ];

  const adminLinks = [
    { label: "Home", path: "/admin/dashboard" },
    { label: "Users", path: "/admin/users" },
    { label: "Bookings", path: "/admin/bookings" },
    { label: "Verify", path: "/admin/verification" },
  ];

  let links = customerLinks;

  if (userType === "provider") {
    links = providerLinks;
  }

  if (userType === "admin") {
    links = adminLinks;
  }

  return (
    <nav className="bottom-nav">
      {links.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          className={({ isActive }) =>
            isActive ? "bottom-nav-link active" : "bottom-nav-link"
          }
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
}