import { useContext, useEffect } from "react";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom"; // DEPARTAMENTO

import AppContext from "../../AppContext";
import Titulo from "../atoms/Titulo";

export default function Departamentos() {
  const { setGlobal } = useContext(AppContext);

  useEffect(() => {
    setGlobal((old) => ({
      ...old,
      pageTitle: (
        <Titulo
          icono={<MeetingRoomIcon fontSize="small" />}
          texto="Departamentos"
        />
      ),
    }));
  }, [setGlobal]);

  return <div className="pagina"></div>;
}
