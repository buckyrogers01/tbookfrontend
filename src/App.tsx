import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import type { JSX } from "react";
import TravoLoginPage from "./Pages/LoginPage";
import MainApplication from "./Pages/MainApplication";
import Dashboard from "./Pages/Dashboard";
import Users from "./Pages/Users";
import Profile from "./Pages/Profile";
import Guides from "./Pages/Guides";
import Verification from "./Pages/Verification";
import Bookings from "./Pages/Bookings";
import Payments from "./Pages/Payments";
import Reports from "./Pages/Reports";
import Settings from "./Pages/Settings";
import Admins from "./Pages/Admins";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("travo_token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>

          {/* Login */}
          <Route path="/login" element={<TravoLoginPage />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <MainApplication />
              </PrivateRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="profile" element={<Profile />} />
            <Route path="guides" element={<Guides />} />
            <Route path="verification" element={<Verification />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="payments" element={<Payments />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
            <Route path="admins" element={<Admins />} />
          </Route>

          {/* fallback */}
          <Route path="*" element={<p>404 not found</p>} />

        </Routes>
      </BrowserRouter>
    </Provider>
  );
}