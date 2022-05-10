import { useContext, useEffect, useState } from "react";
import LockIcon from "@mui/icons-material/Lock"; // ROLES

import AppContext from "../../AppContext";
import Titulo from "../atoms/Titulo";
import { getRoles, getRols } from "../../services/RolAPI";

export default function Roles() {
  const { setGlobal } = useContext(AppContext);

  const [update, setUpdate] = useState(false);

  const titulos = ["Código: ", "Nombre: ", "Descripcion:"];
  const columnas = ["codigo", "nombre", "descripcion"];
  const [departamentos, setDepartamentos] = useState();
  const [filtro, setFiltro] = useState();

  const [departamentoId, setDepartamentoId] = useState();

  const [alert, setAlert] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [alertType, setAlertType] = useState("success");

  function openAlert(text, type) {
    if (alert) {
      setAlert(true);
    } else {
      setAlert(false);
      setAlert(true);
    }
    setAlertText(text);
    setAlertType(type);
  }

  useEffect(() => {
    setGlobal((old) => ({
      ...old,
      pageTitle: (
        <Titulo
          icono={<LockIcon fontSize="small" />}
          texto="Roles y permisos"
        />
      ),
    }));

    getRoles()
      .then((response) => response.json())
      .then((json) => json && setDepartamentos(json));
  }, [setGlobal, update]);

  return <div className="pagina"></div>;
}
