import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/utils.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";
import { OtherUsersProvider } from "./context/OtherUsersContext";
import { RandomProvider } from "./context/RandomFriend";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <RandomProvider>
          <UserProvider>
            <OtherUsersProvider>
              <App />
            </OtherUsersProvider>
          </UserProvider>
        </RandomProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
