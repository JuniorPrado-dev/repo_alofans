import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./App.css";
import { ThemeProvider } from './contexts/ThemeContext'; // Importe o ThemeProvider



ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider > {/* Envolva a aplicação com o ThemeProvider */}
      <App />
    </ThemeProvider>
  </React.StrictMode>
);