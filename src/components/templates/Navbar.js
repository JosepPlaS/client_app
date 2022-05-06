import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Button, IconButton, Toolbar } from "@mui/material";

// MIS COMPONENTES
import "./Navbar.css";
import AppContext from "../../AppContext";

// ICONOS
import icon from "../img/logo.png";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // ATRAS
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom"; // DEPARTAMENTO
import AssignmentIcon from "@mui/icons-material/Assignment"; // INCIDENCIA
import LockIcon from "@mui/icons-material/Lock"; // ROLES
import KeyboardAltIcon from "@mui/icons-material/KeyboardAlt"; // TIPOS HARDWARE
import LogoutIcon from "@mui/icons-material/Logout"; // LOGOUT

export default function Navbar({ children }) {
  const { global } = useContext(AppContext);
  const navigate = useNavigate();
  return (
    <>
      <AppBar>
        <Toolbar disableGutters>
          <div className="principal">
            <Button onClick={() => navigate("/inicio")}>
              <img className="boton_logo" src={icon} alt="INCIDENCIAS" />
            </Button>
            <IconButton onClick={() => navigate(-1)}>
              <ArrowBackIcon />
            </IconButton>
          </div>
          <div className="iconos">
            <IconButton onClick={() => navigate("/incidencias")}>
              <AssignmentIcon />
            </IconButton>
            <IconButton onClick={() => navigate("/departamentos")}>
              <MeetingRoomIcon />
            </IconButton>
            <IconButton onClick={() => navigate("/tipos_hardware")}>
              <KeyboardAltIcon />
            </IconButton>
            <IconButton onClick={() => navigate("/permisos")}>
              <LockIcon />
            </IconButton>
          </div>
          <div className="logout">
            <IconButton>
              <LogoutIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <div className="contenido">
        <div className="titulo">{global.pageTitle}</div>
        {children}
      </div>
    </>
  );
}
