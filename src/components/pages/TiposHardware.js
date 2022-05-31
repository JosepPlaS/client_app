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
import DialogTipoHardware from "../molecules/DialogTipoHardware";
import TituloPagina from "../atoms/TituloPagina";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "../molecules/ConfirmDialog";
export default function TiposHardware({ openAlert }) {
  const navigate = useNavigate();
  const { setGlobal } = useContext(AppContext);

  const [permiso, setPermiso] = useState(0);
  const [update, setUpdate] = useState(false);

  const titulos = ["Nombre: "];
  const columnas = ["nombre"];
  const [tipos_hardware, setTipos_hardware] = useState();
  const [filtro, setFiltro] = useState();

  const [tipoHwId, setTipoHwId] = useState();

  function comprobarPermisos() {
    let user = JSON.parse(sessionStorage.getItem("incidenciasUser"));
    if (user) {
      user.rol.permisos.map((perm) => perm.codigo === "ALTH" && setPermiso(2));
    } else {
      navigate("");
      window.location.reload();
    }
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
      .then(
        (json) => json && setTipos_hardware(json.sort((a, b) => b.id - a.id))
      );

    comprobarPermisos();
  }, [setGlobal, update]);

  const [openDialog, setOpenDialog] = useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  function actualizar() {
    setUpdate((old) => !old);
  }

  function btCrear() {
    setTipoHwId(undefined);
    setOpenDialog(true);
  }

  function btEditar(id) {
    setTipoHwId(id);
    setOpenDialog(true);
  }

  function btEliminar(id) {
    deleteTipoHardware(id)
      .then((response) => {
        if (response.status === 200) {
          actualizar();
          openAlert("Se ha eliminado el tipo de hardware.", "success");
        } else {
          return response.json();
        }
      })
      .then((json) => {
        if (json) {
          json.message
            ? openAlert(json.message, "error")
            : openAlert(
                "No se ha podido eliminar el tipo de hardware.",
                "error"
              );
        }
      });
  }

  // CONFIRM DIALOG:
  const [openConfirmar, setOpenConfirmar] = useState(false);

  const handleCloseConfirmar = () => {
    setOpenConfirmar(false);
  };

  return (
    <div className="pagina">
      <TituloPagina
        icon={<KeyboardAltIcon fontSize="large" />}
        text={"Lista de tipos de hardware:"}
      />
      {tipos_hardware ? (
        <>
          <BuscarAnadir
            filtro={setFiltro}
            crear={btCrear}
            actualizar={actualizar}
            disableCrear={permiso < 1}
          />
          <Tabla
            idLabel={"id"}
            titulos={titulos}
            columnas={columnas}
            datos={filtrar(tipos_hardware, filtro)}
            editar={(id) => btEditar(id)}
            eliminar={(id) => {
              setTipoHwId(id);
              setOpenConfirmar(true);
            }}
            perm={permiso}
          />
          <DialogTipoHardware
            open={openDialog}
            onClose={handleCloseDialog}
            actualizar={actualizar}
            id={tipoHwId}
            openAlert={openAlert}
          />
          <ConfirmDialog
            aceptar={btEliminar}
            open={openConfirmar}
            onClose={handleCloseConfirmar}
            title={"Eliminar tipo de hardware"}
            id={tipoHwId}
            text={"¿Seguro que deseas eliminar el tipo de hardware?"}
          />
        </>
      ) : (
        <Cargando texto="Cargando tipos de hardware." />
      )}
    </div>
  );
}
