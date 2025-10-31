import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        richColors
        expand
        toastOptions={{ className: "glass-panel border border-border" }}
      />
    </BrowserRouter>
  </React.StrictMode>,
);
