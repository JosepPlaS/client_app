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
import AlertCustom from "../atoms/AlertCustom";
import DialogDepartamento from "../molecules/DialogDepartamento";

export default function Departamentos({ openAlert }) {
  const { setGlobal } = useContext(AppContext);

  const [update, setUpdate] = useState(false);

  const titulos = ["Código: ", "Nombre: ", "Descripcion:"];
  const columnas = ["codigo", "nombre", "descripcion"];
  const [departamentos, setDepartamentos] = useState();
  const [filtro, setFiltro] = useState();

  const [departamentoId, setDepartamentoId] = useState();

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
    deleteDepartamento(id).then((response) => {
      if (response.status === 200) {
        actualizar();
      } else {
        openAlert("No se ha podido eliminar el departamento.", "error");
      }
    });
  }

  return (
    <>
      {departamentos ? (
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
            datos={filtrar(departamentos, filtro)}
            editar={(id) => btEditar(id)}
            eliminar={(id) => btEliminar(id)}
            perm={2}
          />
          <DialogDepartamento
            open={openDialog}
            onClose={handleCloseDialog}
            actualizar={actualizar}
            id={departamentoId}
            openAlert={openAlert}
          />
        </div>
      ) : (
        <Cargando texto="Cargando departamentos." />
      )}
    </>
  );
}
