import ReactDOM from "react-dom/client";
import { DataProvider } from "./context/DataContext";
import App from "./layout/App/App";
import "./style.scss";

import "./i18n";

ReactDOM.createRoot(document.getElementById("root")).render(
  <DataProvider>
    <App />
  </DataProvider>
);
