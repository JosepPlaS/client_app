import { useContext, useEffect, useState } from "react";
import LockIcon from "@mui/icons-material/Lock"; // ROLES

import AppContext from "../../AppContext";
import Titulo from "../atoms/Titulo";
import { decoPermiso, deleteRol, getRoles } from "../../services/RolAPI";
import BuscarAnadir, { filtrar } from "../atoms/BuscarAnadir";
import Tabla from "../molecules/Tabla";
import AlertCustom from "../atoms/AlertCustom";
import Cargando from "../atoms/Cargando";

export default function Roles() {
  const { setGlobal } = useContext(AppContext);

  const [update, setUpdate] = useState(false);

  const titulos = ["Nombre: ", "Roles: "];
  const columnas = ["nombre", "descPermisos"];
  const [roles, setRoles] = useState();
  const [filtro, setFiltro] = useState();

  const [rolId, setRolId] = useState();

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

  function formatRoles(json) {
    let tmpRoles = [...json];
    tmpRoles.map((rol) => {
      let tmp = "";
      rol.permisos.map((permiso, index) => {
        switch (index) {
          case rol.permisos.length - 2:
            tmp += decoPermiso(permiso.codigo) + " y ";
            break;
          case rol.permisos.length - 1:
            tmp += decoPermiso(permiso.codigo) + ".";
            break;
          default:
            tmp += decoPermiso(permiso.codigo) + ", ";
        }
      });
      rol.descPermisos = tmp;
    });
    return tmpRoles;
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
      .then((json) => json && setRoles(formatRoles(json.reverse())));
  }, [setGlobal, update]);

  const [openDialog, setOpenDialog] = useState(false);

  const handleCloseDialog = () => {
    setRolId(undefined);
    setOpenDialog(false);
  };

  function actualizar() {
    setUpdate((old) => !old);
  }

  function btCrear() {
    setOpenDialog(true);
  }

  function btEditar(id) {
    setRolId(id);
    setOpenDialog(true);
  }

  function btEliminar(id) {
    deleteRol(id).then((response) => {
      if (response.status === 200) {
        actualizar();
      } else {
        openAlert("No se ha podido eliminar el rol.", "error");
      }
    });
  }

  return (
    <>
      {roles ? (
        <div className="pagina">
          <BuscarAnadir
            filtro={setFiltro}
            crear={btCrear}
            actualizar={actualizar}
          />
          <Tabla
            idLabel={"id"}
            titulos={titulos}
            columnas={columnas}
            datos={filtrar(roles, filtro)}
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
          {/*<DialogRol
            open={openDialog}
            onClose={handleCloseDialog}
            actualizar={actualizar}
            id={RolId}
      />*/}
        </div>
      ) : (
        <Cargando texto="Cargando roles." />
      )}
    </>
  );
}
