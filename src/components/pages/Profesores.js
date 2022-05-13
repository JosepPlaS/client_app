import { useContext, useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";

import AppContext from "../../AppContext";
import Titulo from "../atoms/Titulo";
import BuscarAnadir, { filtrar } from "../atoms/BuscarAnadir";
import Tabla from "../molecules/Tabla";
import AlertCustom from "../atoms/AlertCustom";
import Cargando from "../atoms/Cargando";
import { deleteProfesor, getProfesores } from "../../services/ProfesorAPI";

export default function Profesores({ openAlert }) {
  const { setGlobal } = useContext(AppContext);

  const [permiso, setPermiso] = useState(0);

  const [update, setUpdate] = useState(false);

  const titulos = ["Nombre: ", "Dni: ", "Email: "];
  const columnas = ["nombreCompleto", "dni", "email"];
  const [profesores, setProfesores] = useState();
  const [filtro, setFiltro] = useState();

  const [profesorId, setProfesorId] = useState();

  function comprobarPermisos() {
    let user = JSON.parse(sessionStorage.getItem("incidenciasUser"));
    console.log(user);
    if (user) {
      user.rol.nombre === "Administrador" ? setPermiso(2) : setPermiso(0);
    } else {
      window.location.replace("");
    }
  }

  function formatProfesor(profesores) {
    let newProfesores = [];
    profesores.map((profesor, index) => {
      if (profesor.email !== "root") {
        profesor.nombreCompleto =
          profesor.nombre + " " + profesor.apellido1 + " " + profesor.apellido2;
        newProfesores.push(profesor);
      }
    });
    return newProfesores;
  }

  useEffect(() => {
    setGlobal((old) => ({
      ...old,
      pageTitle: (
        <Titulo icono={<PersonIcon fontSize="small" />} texto="Profesores" />
      ),
    }));
    getProfesores()
      .then((response) => response.json())
      .then((json) => setProfesores(formatProfesor(json)));
    comprobarPermisos();
  }, [setGlobal]);

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
    deleteProfesor(id).then((response) => {
      if (response.status === 200) {
        actualizar();
      } else {
        openAlert("No se ha podido eliminar el profesor.", "error");
      }
    });
  }

  return (
    <>
      {profesores ? (
        <div className="pagina">
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
            eliminar={(id) => btEliminar(id)}
            perm={permiso}
            profesor={true}
          />
          {/*<DialogProfesor
            open={openDialog}
            onClose={handleCloseDialog}
            actualizar={actualizar}
            id={profesorId}
      />*/}
        </div>
      ) : (
        <Cargando texto="Cargando profesores." />
      )}
    </>
  );
}
