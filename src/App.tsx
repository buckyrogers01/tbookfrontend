import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import "./App.css";

import TravoLoginPage from "./Pages/LoginPage";
import MainApplication from "./Pages/MainApplication";
import type { JSX } from "react";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("travo_token");
  return token ? children : <Navigate to="/login" replace />;
};

export default function App() {
  const token = localStorage.getItem("travo_token");

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>

          <Route
            path="/login"
            element={token ? <Navigate to="/" replace /> : <TravoLoginPage />}
          />

          <Route
            path="/*"
            element={
              <PrivateRoute>
                <MainApplication />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<Navigate to={token ? "/" : "/login"} />} />

        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
