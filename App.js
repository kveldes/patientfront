import React, { useEffect, useState } from "react";
import "./App.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Login from "./components/Login";

function App() {
  const [jwtToken, setJwtToken] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("jwt")) {
      setJwtToken(sessionStorage.getItem("jwt"));
    }
  }, [sessionStorage.getItem("jwt")]);

  const handleLogout = () => {
    sessionStorage.removeItem("jwt");
    sessionStorage.removeItem("username");
    window.location.reload();
  };

  return (
    <div className="App">
      <AppBar position="static" color="default">
        <Toolbar style={{ justifyContent: "space-between" }}>
          <Typography variant="h6" color="inherit">
            PatientList
          </Typography>
          {jwtToken ? (
            <Typography
              variant="h6"
              color="inherit"
              style={{ cursor: "pointer" }}
              onClick={handleLogout}
            >
              Logout
            </Typography>
          ) : null}
        </Toolbar>
      </AppBar>
      <Login />
    </div>
  );
}

export default App;
