import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import UserContext from "./contexts/UserContext.tsx";
import CaptainContext from "./contexts/CapatainContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <CaptainContext>
        <UserContext>
          <App />
        </UserContext>
      </CaptainContext>
    </BrowserRouter>
  </StrictMode>
);
