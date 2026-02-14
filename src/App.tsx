import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import "./App.css";

import TravoLoginPage from "./Pages/LoginPage";
import Dashboard from "./Pages/Dashboard";
import type { JSX } from "react";

// simple protected route
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("travo_token");
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {/* login */}
          <Route path="/login" element={<TravoLoginPage />} />

          {/* protected routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          {/* default redirect */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
