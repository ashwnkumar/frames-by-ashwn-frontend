import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GlobalProvider } from "./contexts/GlobalContext.jsx";

createRoot(document.getElementById("root")).render(
  <GlobalProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </GlobalProvider>
);
