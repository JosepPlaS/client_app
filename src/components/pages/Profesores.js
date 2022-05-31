import { useContext, useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";

import AppContext from "../../AppContext";
import Titulo from "../atoms/Titulo";
import BuscarAnadir, { filtrar } from "../atoms/BuscarAnadir";
import Tabla from "../molecules/Tabla";
import Cargando from "../atoms/Cargando";
import { deleteProfesor, getProfesores } from "../../services/ProfesorAPI";
import DialogProfesor from "../molecules/DialogProfesor";
import TituloPagina from "../atoms/TituloPagina";
import { useNavigate } from "react-router-dom";
import BigButtonCustom from "../atoms/BigButtonCustom";
import ConfirmDialog from "../molecules/ConfirmDialog";

export default function Profesores({ openAlert }) {
  const navigate = useNavigate();
  const { setGlobal } = useContext(AppContext);

  const [permiso, setPermiso] = useState(0);
  const [userActualId, setUserActualId] = useState();

  const [update, setUpdate] = useState(false);

  const titulos = ["Nombre: ", "Departamento: ", "Rol: "];
  const columnas = ["nombreCompleto", "departamentoNombre", "rolNombre"];
  const [profesores, setProfesores] = useState();
  const [filtro, setFiltro] = useState();

  const [profesorId, setProfesorId] = useState();

  function comprobarPermisos() {
    let user = JSON.parse(sessionStorage.getItem("incidenciasUser"));
    if (user) {
      setUserActualId(user.id);
      user.rol.nombre === "Administrador" ? setPermiso(2) : setPermiso(0);
    } else {
      navigate("");
      window.location.reload();
    }
  }

  function formatProfesor(profesores) {
    let newProfesores = [];
    profesores.map((profesor, index) => {
      profesor.nombreCompleto =
        profesor.nombre + " " + profesor.apellido1 + " " + profesor.apellido2;
      profesor.departamentoNombre =
        (profesor.departamento && profesor.departamento.nombre) ||
        "No seleccionado";
      profesor.rolNombre = profesor.rol.nombre;
      newProfesores.push(profesor);

      return undefined;
    });
    return newProfesores;
  }

  useEffect(() => {
    comprobarPermisos();
    setGlobal((old) => ({
      ...old,
      pageTitle: (
        <Titulo icono={<PersonIcon fontSize="small" />} texto="Profesores" />
      ),
    }));
    getProfesores()
      .then((response) => response.json())
      .then((json) => setProfesores(formatProfesor(json)));
  }, [setGlobal, update]);

  const [openDialog, setOpenDialog] = useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  function actualizar() {
    setUpdate((old) => !old);
  }

  function btCrear() {
    setProfesorId(undefined);
    setOpenDialog(true);
  }

  function btEditar(id) {
    setProfesorId(id);
    setOpenDialog(true);
  }

  function btEliminar(id) {
    deleteProfesor(id)
      .then((response) => {
        if (response.status === 200) {
          openAlert("Se ha eliminado el profesor.", "success");
          actualizar();
        } else {
          return response.json();
        }
      })
      .then((json) => {
        if (json) {
          json.message
            ? openAlert(json.message, "error")
            : openAlert("No se ha podido eliminar el profesor.", "error");
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
      {permiso !== 0 ? (
        <>
          {" "}
          <TituloPagina
            icon={<PersonIcon fontSize="large" />}
            text={"Lista de profesores:"}
          />
          {profesores ? (
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
                datos={filtrar(profesores, filtro)}
                editar={(id) => btEditar(id)}
                eliminar={(id) => {
                  setProfesorId(id);
                  setOpenConfirmar(true);
                }}
                perm={permiso}
                profesor={true}
              />
            </>
          ) : (
            <Cargando texto="Cargando profesores." />
          )}
        </>
      ) : (
        <div className="bigButtons--container">
          <BigButtonCustom
            icon={<PersonIcon fontSize="large" />}
            text="Editar perfil"
            onClick={() => btEditar(userActualId)}
          />
        </div>
      )}

      <DialogProfesor
        open={openDialog}
        onClose={handleCloseDialog}
        actualizar={actualizar}
        id={profesorId}
        openAlert={openAlert}
        disabled={permiso === 0}
      />
      <ConfirmDialog
        aceptar={btEliminar}
        open={openConfirmar}
        onClose={handleCloseConfirmar}
        title={"Eliminar profesor"}
        id={profesorId}
        text={"¿Seguro que deseas eliminar al profesor?"}
      />
    </div>
  );
}
