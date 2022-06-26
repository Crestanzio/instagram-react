import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./Assets/Style/index.css";
import FirebaseContext from "./Context/firebase";
import { firebase, FieldValue } from "./Services/firebase.config";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <FirebaseContext.Provider value={{ firebase, FieldValue }}>
      <App />
    </FirebaseContext.Provider>
  </React.StrictMode>
);