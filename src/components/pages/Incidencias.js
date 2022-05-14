import { useContext, useEffect } from "react";
import AssignmentIcon from "@mui/icons-material/Assignment"; // INCIDENCIA

import AppContext from "../../AppContext";
import Titulo from "../atoms/Titulo";
import TituloPagina from "../atoms/TituloPagina";

export default function Incidencias({ openAlert }) {
  const { setGlobal } = useContext(AppContext);

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
        text={"Tipos de incidencias:"}
      />
    </div>
  );
}
