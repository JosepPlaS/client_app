import { useContext, useEffect, useState } from "react";
import KeyboardAltIcon from "@mui/icons-material/KeyboardAlt"; // TIPOS HARDWARE

import AppContext from "../../AppContext";
import Titulo from "../atoms/Titulo";
import Tabla from "../molecules/Tabla";
import BuscarAnadir, { filtrar } from "../atoms/BuscarAnadir";
import Cargando from "../atoms/Cargando";
import { getTiposHardware } from "../../services/TipoHardwareAPI";
import AlertCustom from "../atoms/AlertCustom";
import DialogTipoHardware from "../molecules/DialogTipoHardware";

export default function TiposHardware() {
  const { setGlobal } = useContext(AppContext);

  const titulos = ["Nombre: "];
  const columnas = ["nombre"];
  const [tipos_hardware, setTipos_hardware] = useState();

  const [alert, setAlert] = useState(false);
  const [alertText, setAlertText] = useState("");

  const [filtro, setFiltro] = useState();

  useEffect(() => {
    setGlobal(
      (old) => ({
        ...old,
        pageTitle: (
          <Titulo
            icono={<KeyboardAltIcon fontSize="small" />}
            texto="Tipos de Hardware"
          />
        ),
      }),
      []
    );

    getTiposHardware()
      .then((response) => response.json())
      .then((json) => setTipos_hardware(json));
  }, [setGlobal]);

  function crear() {}

  function editar(id) {
    console.log("Editar - " + id);
  }

  function eliminar(id) {
    console.log("Eliminar - " + id);
  }

  return (
    <>
      {tipos_hardware ? (
        <div className="pagina">
          <BuscarAnadir filtro={setFiltro} crear={crear} />
          <Tabla
            idLabel={"id"}
            titulos={titulos}
            columnas={columnas}
            datos={filtrar(tipos_hardware, filtro)}
            editar={(id) => editar(id)}
            eliminar={(id) => eliminar(id)}
            perm={2}
          />
          <AlertCustom
            open={alert}
            setOpen={setAlert}
            severity="error"
            text={alertText}
          />
        </div>
      ) : (
        <Cargando texto="Cargando tipos de hardware." />
      )}
    </>
  );
}
