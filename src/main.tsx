import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import axios from "axios";
axios.defaults.baseURL = "https://nith-results-default-rtdb.firebaseio.com/";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
