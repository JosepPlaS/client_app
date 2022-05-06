import { useContext, useEffect } from "react";
import HomeIcon from "@mui/icons-material/Home";

import AppContext from "../../AppContext";
import Titulo from "../atoms/Titulo";

export default function Inicio() {
  const { setGlobal } = useContext(AppContext);

  useEffect(() => {
    setGlobal((old) => ({
      ...old,
      pageTitle: (
        <Titulo icono={<HomeIcon fontSize="small" />} texto="Inicio" />
      ),
    }));
  }, [setGlobal]);

  return <div className="pagina"></div>;
}
