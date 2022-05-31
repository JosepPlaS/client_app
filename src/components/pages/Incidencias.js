import AssignmentIcon from "@mui/icons-material/Assignment"; // INCIDENCIA
import { useContext, useEffect, useState } from "react";

import AppContext from "../../AppContext";
import Titulo from "../atoms/Titulo";
import BuscarAnadir, { filtrar } from "../atoms/BuscarAnadir";
import Cargando from "../atoms/Cargando";
import {
  deleteIncidencia,
  formatIncidencias,
  getIncidenciasTipo,
} from "../../services/IncidenciaAPI";
import TituloPagina from "../atoms/TituloPagina";
import CardIncidencia from "../molecules/CardIncidencia";
import DialogIncidencia from "../molecules/DialogIncidencia";
import { useNavigate, useParams } from "react-router-dom";

export default function Incidencias({ openAlert }) {
  const params = useParams();
  const { setGlobal } = useContext(AppContext);
  const navigate = useNavigate();

  const [permiso, setPermiso] = useState(0);
  const [update, setUpdate] = useState(false);

  const [incidencias, setIncidencias] = useState();
  const [filtro, setFiltro] = useState();

  const [userActual, setUserActual] = useState();

  function comprobarPermisos() {
    let user = JSON.parse(sessionStorage.getItem("incidenciasUser"));
    if (user) {
      setUserActual(user);
      user.rol.permisos.map((perm) =>
        perm.codigo === "MOIN"
          ? setPermiso(2)
          : perm.codigo === "ADIN" && permiso === 0
          ? setPermiso(1)
          : undefined
      );
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
          icono={<AssignmentIcon fontSize="small" />}
          texto="Incidencias"
        />
      ),
    }));

    getIncidenciasTipo(params.tipo_incidencia)
      .then((response) => response.json())
      .then(
        (json) =>
          json &&
          setIncidencias(formatIncidencias(json.sort((a, b) => b.id - a.id)))
      );

    comprobarPermisos();
  }, [setGlobal, update]);

  function actualizar() {
    setUpdate((old) => !old);
  }

  function btCrear() {
    setOpenDialog(true);
  }

  function btEditar(id) {
    navigate("/incidencia/" + id);
  }

  function btEliminar(id) {
    deleteIncidencia(id)
      .then((response) => {
        if (response.status === 200) {
          actualizar();
          openAlert("Se ha eliminado la incidencia.", "success");
        } else {
          return response.json();
        }
      })
      .then((json) => {
        if (json) {
          json.message
            ? openAlert(json.message, "error")
            : openAlert("No se ha podido eliminar la incidencia.", "error");
        }
      });
  }

  const [openDialog, setOpenDialog] = useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div className="pagina">
      <TituloPagina
        icon={<AssignmentIcon fontSize="large" />}
        text={"Lista de incidencias:"}
      />
      {incidencias ? (
        <>
          <BuscarAnadir
            filtro={setFiltro}
            crear={btCrear}
            actualizar={actualizar}
            disableCrear={permiso < 1}
          />
          {filtrar(incidencias, filtro).length > 0 ? (
            <div className="card--container">
              {filtrar(incidencias, filtro).map((incidencia) => (
                <CardIncidencia
                  key={incidencia.id}
                  icon={<AssignmentIcon fontSize="small" />}
                  incidencia={incidencia}
                  editar={btEditar}
                  eliminar={btEliminar}
                  user={userActual && userActual.dni}
                  disabled={permiso <= 1}
                />
              ))}
            </div>
          ) : (
            <div className="sin_datos">No existen datos.</div>
          )}
          <DialogIncidencia
            open={openDialog}
            onClose={handleCloseDialog}
            actualizar={actualizar}
            openAlert={openAlert}
          />
        </>
      ) : (
        <Cargando texto="Cargando incidencias." />
      )}
    </div>
  );
}
