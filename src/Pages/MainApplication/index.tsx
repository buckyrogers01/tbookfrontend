import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import "./dashbaord.css";

type SidebarProps = {
  active: string;
  setActive: (value: string) => void;
};

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("travo_token");
    window.location.replace("/login");
  };

  return (
    <div className="header">
      <div className="logo">🌿 TRAVO ADMIN</div>

      <div className="header-right">
        <input placeholder="Search..." className="search" />

        <div className="admin-container">
          <div className="admin" onClick={() => setOpen(!open)}>
            Admin ▾
          </div>

          {open && (
            <div className="admin-dropdown">
              <div
                className="dropdown-item"
                onClick={() => navigate("/profile")}
              >
                Profile
              </div>

              <div
                className="dropdown-item logout"
                onClick={handleLogout}
              >
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ active, setActive }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    { label: "Dashboard", path: "/" },
    { label: "Users", path: "/users" },
    { label: "Guides", path: "/guides" },
    { label: "Guide Verification", path: "/verification" },
    { label: "Bookings", path: "/bookings" },
    { label: "Payments", path: "/payments" },
    { label: "Reports", path: "/reports" },
    { label: "Settings", path: "/settings" },
    { label: "Admins", path: "/admins" },
  ];

  return (
    <div className="sidebar">
      {menu.map((item) => (
        <div
          key={item.label}
          className={`sidebar-item ${
            location.pathname === item.path ? "active" : ""
          }`}
          onClick={() => {
            setActive(item.label);
            navigate(item.path);
          }}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
};

const MainApplication: React.FC = () => {
  const [active, setActive] = useState<string>("Dashboard");

  return (
    <div className="layout">
      <Header />

      <div className="main">
        <Sidebar active={active} setActive={setActive} />

        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainApplication;