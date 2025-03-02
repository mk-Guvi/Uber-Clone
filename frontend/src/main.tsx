import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import UserContext from "./contexts/UserContext.tsx";
import CaptainContext from "./contexts/CapatainContext.tsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <CaptainContext>
        <UserContext>
          <App />
          <ToastContainer />
        </UserContext>
      </CaptainContext>
    </BrowserRouter>
  </StrictMode>
);
