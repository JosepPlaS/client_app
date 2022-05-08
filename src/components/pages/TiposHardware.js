import { useContext, useEffect, useState } from "react";
import KeyboardAltIcon from "@mui/icons-material/KeyboardAlt"; // TIPOS HARDWARE

import AppContext from "../../AppContext";
import Titulo from "../atoms/Titulo";
import Tabla from "../molecules/Tabla";
import BuscarAnadir, { filtrar } from "../atoms/BuscarAnadir";
import Cargando from "../atoms/Cargando";
import { getTiposHardware } from "../../services/TipoHardwareAPI";

export default function TiposHardware() {
  const { setGlobal } = useContext(AppContext);

  const titulos = ["Nombre: "];
  const columnas = ["nombre"];
  const [tipos_hardware, setTipos_hardware] = useState();

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

  function filtrar(datos, filtro) {
    if (!filtro) return datos;
    return datos.filter((dato) =>
      Object.keys(dato).some(
        (key) =>
          typeof dato[key] === "string" &&
          dato[key].toLowerCase().includes(filtro.toLowerCase())
      )
    );
  }

  function crear() {
    console.log("crear");
  }

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
        </div>
      ) : (
        <Cargando texto="Cargando tipos de hardware." />
      )}
    </>
  );
}
