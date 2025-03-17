import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GlobalProvider } from "./contexts/GlobalContext.jsx";
import { DataProvider } from "./contexts/DataContext.jsx";
import { AuthContextProvider } from "./contexts/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <GlobalProvider>
    <AuthContextProvider>
      <DataProvider>
        {/* <StrictMode> */}
          <App />
        {/* </StrictMode> */}
      </DataProvider>
    </AuthContextProvider>
  </GlobalProvider>
);
