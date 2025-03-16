import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GlobalProvider } from "./contexts/GlobalContext.jsx";
import { DataProvider } from "./contexts/DataContext.jsx";

createRoot(document.getElementById("root")).render(
  <GlobalProvider>
    <DataProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </DataProvider>
  </GlobalProvider>
);
