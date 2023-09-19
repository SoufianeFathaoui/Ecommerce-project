import React from "react";
import ReactDOM from "react-dom/client";
import {   HelmetProvider } from "react-helmet-async";
import {ThemeProvider} from './context/themeContext';
import "./index.css";
import App from './App';
import './i18n';
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>
);
