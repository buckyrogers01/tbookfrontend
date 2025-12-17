import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css"
import LandingPage from "./Pages/LandingPage/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <div className={"navbar"}>
        <span>
          <strong>TRAVO</strong>
        </span>
        <span>Home</span>
        <span>Who We Are</span>
        <span>Experiences</span>
        <span>Contact</span>
        <span className={"right"}>Login</span>
      </div>
      <Routes>
        <Route path={"/"} element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
