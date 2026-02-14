import { useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import "./dashbaord.css";
import Dashboard from "../Dashboard";
import Users from "../Users";
import Guides from "../Guides";
import Verification from "../Verification";
import Bookings from "../Bookings";
import Payments from "../Payments";
import Reports from "../Reports";
import Settings from "../Settings";
import Admins from "../Admins";

type SidebarProps = {
  active: string;
  setActive: (value: string) => void;
};

const Header: React.FC = () => {
  return (
    <div className="header">
      <div className="logo">🌿 TRAVO ADMIN</div>

      <div className="header-right">
        <input placeholder="Search..." className="search" />
        <div className="admin">Admin</div>
      </div>
    </div>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ active, setActive }) => {
  const navigate = useNavigate();

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
          className={`sidebar-item ${active === item.label ? "active" : ""}`}
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
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/guides" element={<Guides />} />
            <Route path="/verification" element={<Verification />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/admins" element={<Admins />} />

            {/* fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default MainApplication;