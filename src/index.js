import React from "react";
import ReactDOM from "react-dom";
import App from "./routes/App";
import reportWebVitals from "./reportWebVitals";

import "./firebase";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
reportWebVitals();
