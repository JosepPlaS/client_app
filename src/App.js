import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/templates/Navbar";
import Inicio from "./components/pages/Inicio";
import Departamentos from "./components/pages/Departamentos";
import Incidencias from "./components/pages/Incidencias";
import Permisos from "./components/pages/Permisos";
import TiposHardware from "./components/pages/TiposHardware";

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
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Navbar>
        <Routes>
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/incidencias" element={<Incidencias />} />
          <Route path="/departamentos" element={<Departamentos />} />
          <Route path="/tipos_hardware" element={<TiposHardware />} />
          <Route path="/permisos" element={<Permisos />} />
        </Routes>
      </Navbar>
    </ThemeProvider>
  );
}
