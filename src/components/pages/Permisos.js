import { useContext, useEffect } from "react";
import LockIcon from "@mui/icons-material/Lock"; // ROLES

import AppContext from "../../AppContext";
import Titulo from "../atoms/Titulo";

export default function Permisos() {
  const { setGlobal } = useContext(AppContext);

  useEffect(() => {
    setGlobal((old) => ({
      ...old,
      pageTitle: (
        <Titulo icono={<LockIcon fontSize="small" />} texto="Permisos" />
      ),
    }));
  }, [setGlobal]);

  return <div className="pagina"></div>;
}
