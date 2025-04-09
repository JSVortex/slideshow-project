import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "./index.css";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";

// Import all of Bootstrap's JS
import * as _bootstrap from "bootstrap";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
