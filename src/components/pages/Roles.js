import { useContext, useEffect, useState } from "react";
import LockIcon from "@mui/icons-material/Lock"; // ROLES

import AppContext from "../../AppContext";
import Titulo from "../atoms/Titulo";
import { decoPermiso, deleteRol, getRoles } from "../../services/RolAPI";
import BuscarAnadir, { filtrar } from "../atoms/BuscarAnadir";
import Tabla from "../molecules/Tabla";
import Cargando from "../atoms/Cargando";
import DialogRol from "../molecules/DialogRol";
import { useNavigate } from "react-router-dom";
import TituloPagina from "../atoms/TituloPagina";

export default function Roles({ openAlert }) {
  const navigate = useNavigate();
  const { setGlobal } = useContext(AppContext);
  const [permiso, setPermiso] = useState(0);

  const [update, setUpdate] = useState(false);

  const titulos = ["Nombre: ", "Roles: "];
  const columnas = ["nombre", "descPermisos"];
  const [roles, setRoles] = useState();
  const [filtro, setFiltro] = useState();

  const [rolId, setRolId] = useState();

  function comprobarPermisos() {
    let user = JSON.parse(sessionStorage.getItem("incidenciasUser"));
    if (user) {
      user.rol.permisos.map((perm) => perm.codigo === "ALRO" && setPermiso(2));
    } else {
      navigate("");
      window.location.reload();
    }
  }

  function formatRoles(json) {
    let tmpRoles = [...json];
    tmpRoles.map((rol) => {
      let tmp = "";
      rol.permisos.map((permiso, index) => {
        switch (index) {
          case 0:
            tmp +=
              decoPermiso(permiso.codigo).charAt(0).toUpperCase() +
              decoPermiso(permiso.codigo).slice(1) +
              (rol.permisos.length === 1
                ? "."
                : rol.permisos.length === 2
                ? " y "
                : ", ");
            break;
          case rol.permisos.length - 2:
            tmp += decoPermiso(permiso.codigo) + " y ";
            break;
          case rol.permisos.length - 1:
            tmp += decoPermiso(permiso.codigo) + ".";
            break;
          default:
            tmp += decoPermiso(permiso.codigo) + ", ";
        }
        return undefined;
      });
      rol.descPermisos = tmp;
      return undefined;
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
      .then(
        (json) =>
          json &&
          setRoles(
            formatRoles(
              json.sort((a, b) => {
                if (a.permisos.length !== b.permisos.length) {
                  return b.permisos.length - a.permisos.length;
                } else {
                  return b.nombre + a.nombre;
                }
              })
            )
          )
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
    setRolId(undefined);
    setOpenDialog(true);
  }

  function btEditar(id) {
    setRolId(id);
    setOpenDialog(true);
  }

  function btEliminar(id) {
    deleteRol(id)
      .then((response) => {
        if (response.status === 200) {
          actualizar();
        } else {
          return response.json();
        }
      })
      .then((json) => {
        if (json) {
          json.message
            ? openAlert(json.message, "error")
            : openAlert("No se ha podido eliminar el rol.", "error");
        }
      });
  }

  return (
    <div className="pagina">
      <TituloPagina
        icon={<LockIcon fontSize="large" />}
        text={"Lista de roles:"}
      />
      {roles ? (
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
            datos={filtrar(roles, filtro)}
            editar={(id) => btEditar(id)}
            eliminar={(id) => btEliminar(id)}
            perm={permiso}
            rol={true}
          />
          <DialogRol
            open={openDialog}
            onClose={handleCloseDialog}
            actualizar={actualizar}
            id={rolId}
            openAlert={openAlert}
          />
        </>
      ) : (
        <Cargando texto="Cargando roles." />
      )}
    </div>
  );
}
