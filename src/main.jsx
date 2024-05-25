import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import "mdbreact/dist/css/mdb.css";
import "./index.css";

// import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { Provider } from "react-redux";
import App from "./App.jsx";
import { store } from "./app/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
);
