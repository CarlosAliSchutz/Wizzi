import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { HomeScreen } from "./ui/screens/home/home.screen";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HomeScreen />
  </React.StrictMode>
);

reportWebVitals();
