import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/templates/Navbar";
import Inicio from "./components/pages/Inicio";
import Departamentos from "./components/pages/Departamentos";
import Incidencias from "./components/pages/Incidencias";
import Permisos from "./components/pages/Permisos";
import TiposHardware from "./components/pages/TiposHardware";
import Login from "./components/pages/Login";
import { useState, useEffect } from "react";

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
  }, user);

  return (
    <ThemeProvider theme={theme}>
      {user ? (
        <Navbar>
          <Routes>
            <Route path="" element={<Inicio />} />
            <Route path="/incidencias" element={<Incidencias />} />
            <Route path="/departamentos" element={<Departamentos />} />
            <Route path="/tipos_hardware" element={<TiposHardware />} />
            <Route path="/permisos" element={<Permisos />} />
          </Routes>
        </Navbar>
      ) : (
        <Login />
      )}
    </ThemeProvider>
  );
}
