import { useContext, useEffect, useState } from "react";
import KeyboardAltIcon from "@mui/icons-material/KeyboardAlt"; // TIPOS HARDWARE

import AppContext from "../../AppContext";
import Titulo from "../atoms/Titulo";
import Tabla from "../molecules/Tabla";
import BuscarAnadir, { filtrar } from "../atoms/BuscarAnadir";
import Cargando from "../atoms/Cargando";
import {
  deleteTipoHardware,
  getTiposHardware,
} from "../../services/TipoHardwareAPI";
import AlertCustom from "../atoms/AlertCustom";
import DialogTipoHardware from "../molecules/DialogTipoHardware";

export default function TiposHardware() {
  const { setGlobal } = useContext(AppContext);

  const [update, setUpdate] = useState(false);

  const titulos = ["Nombre: "];
  const columnas = ["nombre"];
  const [tipos_hardware, setTipos_hardware] = useState();
  const [filtro, setFiltro] = useState();

  const [tipoHwId, setTipoHwId] = useState();

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
          icono={<KeyboardAltIcon fontSize="small" />}
          texto="Tipos de Hardware"
        />
      ),
    }));

    getTiposHardware()
      .then((response) => response.json())
      .then((json) => setTipos_hardware(json));
  }, [setGlobal, update]);

  const [openDialog, setOpenDialog] = useState(false);

  const handleCloseDialog = () => {
    setTipoHwId(undefined);
    setOpenDialog(false);
  };

  function actualizar() {
    setUpdate((old) => !old);
  }

  function btCrear() {
    setOpenDialog(true);
  }

  function btEditar(id) {
    setTipoHwId(id);
    setOpenDialog(true);
  }

  function btEliminar(id) {
    deleteTipoHardware(id).then((response) => {
      if (response.status === 200) {
        actualizar();
      } else {
        openAlert("No se ha podido eliminar el tipo de hardware.", "error");
      }
    });
  }

  return (
    <>
      {tipos_hardware ? (
        <div className="pagina">
          <BuscarAnadir filtro={setFiltro} crear={btCrear} />
          <Tabla
            idLabel={"id"}
            titulos={titulos}
            columnas={columnas}
            datos={filtrar(tipos_hardware, filtro).sort((a, b) =>
              a.nombre.localeCompare(b.nombre)
            )}
            editar={(id) => btEditar(id)}
            eliminar={(id) => btEliminar(id)}
            perm={2}
          />
          <AlertCustom
            open={alert}
            setOpen={setAlert}
            severity={alertType}
            text={alertText}
          />
          <DialogTipoHardware
            open={openDialog}
            onClose={handleCloseDialog}
            actualizar={actualizar}
            id={tipoHwId}
          />
        </div>
      ) : (
        <Cargando texto="Cargando tipos de hardware." />
      )}
    </>
  );
}
