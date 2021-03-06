import { useContext, useEffect, useState } from "react";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom"; // DEPARTAMENTO

import AppContext from "../../AppContext";
import Titulo from "../atoms/Titulo";
import Tabla from "../molecules/Tabla";
import BuscarAnadir, { filtrar } from "../atoms/BuscarAnadir";
import Cargando from "../atoms/Cargando";
import {
  deleteDepartamento,
  getDepartamentos,
} from "../../services/DepartamentoAPI";
import DialogDepartamento from "../molecules/DialogDepartamento";
import TituloPagina from "../atoms/TituloPagina";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "../molecules/ConfirmDialog";

export default function Departamentos({ openAlert }) {
  const navigate = useNavigate();
  const { setGlobal } = useContext(AppContext);
  const [permiso, setPermiso] = useState(0);

  const [update, setUpdate] = useState(false);

  const titulos = ["Código: ", "Nombre: ", "Localización:"];
  const columnas = ["codigo", "nombre", "localizacion"];
  const [departamentos, setDepartamentos] = useState();
  const [filtro, setFiltro] = useState();

  const [departamentoId, setDepartamentoId] = useState();

  function comprobarPermisos() {
    let user = JSON.parse(sessionStorage.getItem("incidenciasUser"));
    if (user) {
      user.rol.nombre === "Administrador" ? setPermiso(2) : setPermiso(0);
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
          icono={<MeetingRoomIcon fontSize="small" />}
          texto="Departamentos"
        />
      ),
    }));

    comprobarPermisos();

    getDepartamentos()
      .then((response) => response.json())
      .then((json) => json && setDepartamentos(json.reverse()));
  }, [setGlobal, update]);

  const [openDialog, setOpenDialog] = useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  function actualizar() {
    setUpdate((old) => !old);
  }

  function btCrear() {
    setDepartamentoId(undefined);
    setOpenDialog(true);
  }

  function btEditar(id) {
    setDepartamentoId(id);
    setOpenDialog(true);
  }

  function btEliminar(id) {
    deleteDepartamento(id)
      .then((response) => {
        if (response.status === 200) {
          openAlert("Se ha eliminado el departamento.", "success");
          actualizar();
        } else {
          return response.json();
        }
      })
      .then((json) => {
        if (json) {
          json.message
            ? openAlert(json.message, "error")
            : openAlert("No se ha podido eliminar el departamento.", "error");
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
        icon={<MeetingRoomIcon fontSize="large" />}
        text={"Lista de departamentos:"}
      />
      {departamentos ? (
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
            datos={filtrar(departamentos, filtro)}
            editar={(id) => btEditar(id)}
            eliminar={(id) => {
              setDepartamentoId(id);
              setOpenConfirmar(true);
            }}
            perm={permiso}
          />
          <DialogDepartamento
            open={openDialog}
            onClose={handleCloseDialog}
            actualizar={actualizar}
            id={departamentoId}
            openAlert={openAlert}
          />
          <ConfirmDialog
            aceptar={btEliminar}
            open={openConfirmar}
            onClose={handleCloseConfirmar}
            title={"Eliminar departamento"}
            id={departamentoId}
            text={"¿Seguro que deseas eliminar el departamento?"}
          />
        </>
      ) : (
        <Cargando texto="Cargando departamentos." />
      )}
    </div>
  );
}
