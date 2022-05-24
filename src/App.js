import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/templates/Navbar";
import Inicio from "./components/pages/Inicio";
import Departamentos from "./components/pages/Departamentos";
import MenuIncidencias from "./components/pages/MenuIncidencias";
import Roles from "./components/pages/Roles";
import TiposHardware from "./components/pages/TiposHardware";
import Login from "./components/pages/Login";
import { useState, useEffect } from "react";
import Profesores from "./components/pages/Profesores";
import AlertCustom from "./components/atoms/AlertCustom";
import Incidencias from "./components/pages/Incidencias";
import FormIncidencia from "./components/pages/FormIncidencia";

const theme = createTheme({
  palette: {
    common: {
      black: "#000",
      white: "#fff",
    },
    primary: {
      main: "#f5cdcd",
      light: "#FBE4E4",
      dark: "#FD8686",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#e51b23",
    },
    error: {
      main: "#dc1b1b",
    },
    warning: {
      main: "#FDF55E",
    },
    info: {
      main: "#00348e",
    },
    success: {
      main: "#179A54",
    },
    white: {
      main: "#FFFFFF",
    },
    text: {
      main: "#757575",
    },
  },
});

export default function App() {
  const [user, setUser] = useState(false);

  useEffect(() => {
    sessionStorage.getItem("incidenciasUser") ? setUser(true) : setUser(false);
  }, [user]);

  const [alert, setAlert] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [alertType, setAlertType] = useState("success");

  const openAlert = (text, type) => {
    if (alert) {
      setAlert(true);
    } else {
      setAlert(false);
      setAlert(true);
    }
    setAlertText(text);
    setAlertType(type);
  };

  return (
    <ThemeProvider theme={theme}>
      {user ? (
        <Navbar>
          <Routes>
            <Route path="" element={<Inicio />} />
            <Route
              path="/incidencias"
              element={<MenuIncidencias openAlert={openAlert} />}
            />
            <Route
              path="/incidencias/todas"
              element={<Incidencias openAlert={openAlert} />}
            />
            <Route path="/incidencia/:id" element={<FormIncidencia />} />
            <Route
              path="/profesores"
              element={<Profesores openAlert={openAlert} />}
            />
            <Route
              path="/departamentos"
              element={<Departamentos openAlert={openAlert} />}
            />
            <Route
              path="/tipos_hardware"
              element={<TiposHardware openAlert={openAlert} />}
            />
            <Route path="/roles" element={<Roles openAlert={openAlert} />} />
          </Routes>
        </Navbar>
      ) : (
        <Login openAlert={openAlert} />
      )}
      <AlertCustom
        open={alert}
        setOpen={setAlert}
        severity={alertType}
        text={alertText}
      />
    </ThemeProvider>
  );
}
