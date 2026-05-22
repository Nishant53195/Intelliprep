import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "../styles/global.css";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Explicit container element for Google Translate to mount into on localhost */}
    <div id="google_translate_element" className="translate-container-patch"></div>
    
    <App />

    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
      }}
    />
  </React.StrictMode>
);