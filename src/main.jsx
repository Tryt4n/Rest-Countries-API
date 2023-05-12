import React from "react";
import ReactDOM from "react-dom/client";
import { DataProvider } from "./context/DataContext";
import App from "./layout/App/App";
import "./style.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <DataProvider>
    <App />
  </DataProvider>
  // </React.StrictMode>
);
