import { useContext, useEffect } from "react";
import AssignmentIcon from "@mui/icons-material/Assignment"; // INCIDENCIA
import DesktopMacIcon from "@mui/icons-material/DesktopMac";
import TerminalIcon from "@mui/icons-material/Terminal";
import RouterIcon from "@mui/icons-material/Router";
import SsidChartIcon from "@mui/icons-material/SsidChart";

import AppContext from "../../AppContext";
import Titulo from "../atoms/Titulo";
import TituloPagina from "../atoms/TituloPagina";
import BigButtonCustom from "../atoms/BigButtonCustom";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";

export default function MenuIncidencias({ openAlert }) {
  const { setGlobal } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    setGlobal((old) => ({
      ...old,
      pageTitle: (
        <Titulo
          icono={<AssignmentIcon fontSize="small" />}
          texto="Incidencias"
        />
      ),
    }));
  }, [setGlobal]);

  return (
    <div className="pagina">
      <TituloPagina
        icon={<AssignmentIcon fontSize="large" />}
        text={"Menu incidencias:"}
      />
      <div className="bigButtons--container">
        <BigButtonCustom
          icon={<PersonIcon fontSize="large" />}
          text="Mis incidencias"
          onClick={() => navigate("propias")}
        />
        <BigButtonCustom
          icon={<SsidChartIcon fontSize="large" />}
          text="Ver registros"
          onClick={() => navigate("registro")}
          disabled={true}
        />
      </div>
      <TituloPagina
        icon={<AssignmentIcon fontSize="large" />}
        text={"Tipos de incidencias:"}
      />
      <div className="bigButtons--container">
        <BigButtonCustom
          icon={<AssignmentIcon fontSize="large" />}
          text={"Todas"}
          onClick={() => navigate("/incidencias/" + 0)}
        />
        <BigButtonCustom
          icon={<DesktopMacIcon fontSize="large" />}
          text={"Hardware"}
          onClick={() => navigate("/incidencias/" + 1)}
        />
        <BigButtonCustom
          icon={<TerminalIcon fontSize="large" />}
          text={"Software"}
          onClick={() => navigate("/incidencias/" + 2)}
        />
        <BigButtonCustom
          icon={<RouterIcon fontSize="large" />}
          text={"Internet"}
          onClick={() => navigate("/incidencias/" + 3)}
        />
      </div>
    </div>
  );
}
