import { useContext, useEffect } from "react";
import KeyboardAltIcon from "@mui/icons-material/KeyboardAlt"; // TIPOS HARDWARE

import AppContext from "../../AppContext";
import Titulo from "../atoms/Titulo";

export default function TiposHardware() {
  const { setGlobal } = useContext(AppContext);

  useEffect(() => {
    setGlobal((old) => ({
      ...old,
      pageTitle: (
        <Titulo
          icono={<KeyboardAltIcon fontSize="small" />}
          texto="Tipos de Hardware"
        />
      ),
    }));
  }, [setGlobal]);

  return <div className="pagina"></div>;
}
