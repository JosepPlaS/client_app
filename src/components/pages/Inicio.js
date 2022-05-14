import { useContext, useEffect } from "react";
import HomeIcon from "@mui/icons-material/Home";

import AppContext from "../../AppContext";
import Titulo from "../atoms/Titulo";
import BigButtonCustom from "../atoms/BigButtonCustom";
import PersonIcon from "@mui/icons-material/Person";
import logo from "../img/logo-transparent.png";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom"; // DEPARTAMENTO
import AssignmentIcon from "@mui/icons-material/Assignment"; // INCIDENCIA
import LockIcon from "@mui/icons-material/Lock"; // ROLES
import KeyboardAltIcon from "@mui/icons-material/KeyboardAlt"; // TIPOS HARDWARE
import { useNavigate } from "react-router-dom";

export default function Inicio() {
  const { setGlobal } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    setGlobal((old) => ({
      ...old,
      pageTitle: (
        <Titulo icono={<HomeIcon fontSize="small" />} texto="Inicio" />
      ),
    }));
  }, [setGlobal]);

  return (
    <div className="pagina">
      <div className="inicio--container">
        <div>
          <img src={logo} alt="INCIDENCIAS" />
        </div>
        <div className="bigButtons--container">
          <BigButtonCustom
            icon={<AssignmentIcon fontSize="large" />}
            text={"Incidencias"}
            onClick={() => navigate("/incidencias")}
          />
          <BigButtonCustom
            icon={<PersonIcon fontSize="large" />}
            text={"Profesores"}
            onClick={() => navigate("/profesores")}
          />
          <BigButtonCustom
            icon={<MeetingRoomIcon fontSize="large" />}
            text={"Departamentos"}
            onClick={() => navigate("/departamentos")}
          />
          <BigButtonCustom
            icon={<KeyboardAltIcon fontSize="large" />}
            text={"Tipos de hardware"}
            onClick={() => navigate("/tipos_hardware")}
          />
          <BigButtonCustom
            icon={<LockIcon fontSize="large" />}
            text={"Roles y permisos"}
            onClick={() => navigate("/roles")}
          />
        </div>
      </div>
    </div>
  );
}
