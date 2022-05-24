import { useContext, useEffect, useState } from "react";
import AssignmentIcon from "@mui/icons-material/Assignment"; // INCIDENCIA
import SettingsIcon from "@mui/icons-material/Settings";
import EditIcon from "@mui/icons-material/Edit";
import ContactsIcon from "@mui/icons-material/Contacts";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import ReceiptIcon from "@mui/icons-material/Receipt";
import RouterIcon from "@mui/icons-material/Router";
import DesktopMacIcon from "@mui/icons-material/DesktopMac";
import TerminalIcon from "@mui/icons-material/Terminal";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import AppContext from "../../AppContext";
import Titulo from "../atoms/Titulo";
import TituloPagina from "../atoms/TituloPagina";
import BigButtonCustom from "../atoms/BigButtonCustom";
import { useNavigate, useParams } from "react-router-dom";
import DialogIncidencia from "../molecules/DialogIncidencia";
import DialogFinalizar from "../molecules/DialogFinalizar";
import DialogObservaciones from "../molecules/DialogObservaciones";
import {
  formatIncidencia,
  getIncidencia,
  putResponsable,
  putWorkingOn,
} from "../../services/IncidenciaAPI";
import CardIncidenciaDetalle from "../molecules/CardDetalleIncidencia";
import Cargando from "../atoms/Cargando";
import InfoIcon from "@mui/icons-material/Info";
import DialogSeleccionarResponsable from "../molecules/DialogSeleccionarResponsable";
import DialogSeleccionarEstado from "../molecules/DialogSeleccionarEstado";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import moment from "moment";

export default function FormIncidencia({ openAlert }) {
  const { setGlobal } = useContext(AppContext);
  const params = useParams();
  const [update, setUpdate] = useState(false);

  const navigate = useNavigate();
  const [userActual, setUserActual] = useState();
  const [permiso, setPermiso] = useState(0);

  const [incidencia, setIncidencia] = useState();

  const [openDialog, setOpenDialog] = useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const [openDialogSelRes, setOpenDialogSelRes] = useState(false);

  const handleCloseDialogSelRes = () => {
    setOpenDialogSelRes(false);
  };

  const [openDialogSelEst, setOpenDialogSelEst] = useState(false);

  const handleCloseDialogSelEst = () => {
    setOpenDialogSelEst(false);
  };

  const [openDialogObs, setOpenDialogObs] = useState(false);

  const handleCloseDialogObs = () => {
    setOpenDialogObs(false);
  };

  const [openDialogEnd, setOpenDialogEnd] = useState(false);

  const handleCloseDialogEnd = () => {
    setOpenDialogEnd(false);
  };

  function formatIncidenciaCus(incidencia) {
    let newIncidencia = formatIncidencia(incidencia);

    setGlobal((old) => ({
      ...old,
      pageTitle: (
        <Titulo
          icono={
            newIncidencia.tipo_incidencia === 0 ? (
              <AssignmentIcon />
            ) : incidencia.tipo_incidencia === 1 ? (
              <DesktopMacIcon />
            ) : incidencia.tipo_incidencia === 2 ? (
              <TerminalIcon />
            ) : incidencia.tipo_incidencia === 3 ? (
              <RouterIcon />
            ) : (
              <QuestionMarkIcon />
            )
          }
          texto={"Incidencia: " + newIncidencia.codigo}
        />
      ),
    }));

    return newIncidencia;
  }

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
      window.location.replace("");
    }
  }

  useEffect(() => {
    comprobarPermisos();
    getIncidencia(params.id)
      .then((response) => response.json())
      .then((json) => {
        json && setIncidencia(formatIncidenciaCus(json));
      });
  }, [setGlobal, update]);

  function actualizar() {
    setUpdate((old) => !old);
  }

  function cambiarResponsable(responsable) {
    setIncidencia((old) => {
      const user = JSON.parse(sessionStorage.getItem("incidenciasUser"));
      let tmp = old;
      tmp.responsable = responsable;
      tmp.historial +=
        "{UwU}" +
        moment(Date.now()).format("DD-MM-YY") +
        " Responsable " +
        (responsable ? responsable.email : "SAI") +
        " asignado por: " +
        user.email;
      return tmp;
    });
    putResponsable(params.id, incidencia)
      .then((response) => {
        if (response.status === 200) {
          actualizar();
        } else {
          return response.json();
        }
      })
      .then((json) => json && console.log(json.message));
  }

  function cambiarEstado() {}

  function workingOn() {
    setIncidencia((old) => {
      const user = JSON.parse(sessionStorage.getItem("incidenciasUser"));
      let tmp = old;
      tmp.historial +=
        "{UwU}" +
        moment(Date.now()).format("DD-MM-YY") +
        " Responsable " +
        user.email +
        " ha empezado a trabajar en el problema.";
      return tmp;
    });
    putWorkingOn(params.id, incidencia)
      .then((response) => {
        if (response.status === 200) {
          actualizar();
        } else {
          return response.json();
        }
      })
      .then((json) => json && console.log(json.message));
  }

  return (
    <div className="pagina">
      {incidencia ? (
        <>
          <TituloPagina
            icon={<InfoIcon fontSize="large" />}
            text={"Datos de la incidencia:"}
          />
          {incidencia ? (
            <div className="card--container">
              <CardIncidenciaDetalle incidencia={incidencia} />
            </div>
          ) : (
            <Cargando />
          )}
          <TituloPagina
            icon={<SettingsIcon fontSize="large" />}
            text={"Opciones:"}
          />
          <div className="bigButtons--container">
            {(incidencia.responsable
              ? userActual.dni === incidencia.responsable.dni
              : false) && incidencia.estado.codigo === "Comunicada" ? (
              <BigButtonCustom
                icon={<PlayArrowIcon fontSize="large" />}
                text={"Trabajando en ello"}
                onClick={() => workingOn()}
                disabled={
                  permiso < 2 &&
                  (incidencia.responsable
                    ? userActual.dni !== incidencia.responsable.dni
                    : true)
                }
              />
            ) : (
              <BigButtonCustom
                icon={<PlayArrowIcon fontSize="large" />}
                text={"Finalizar"}
                onClick={() => setOpenDialogEnd(true)}
                disabled={
                  permiso < 2 &&
                  (incidencia.responsable
                    ? userActual.dni !== incidencia.responsable.dni
                    : true)
                }
              />
            )}
            <BigButtonCustom
              icon={<FormatListBulletedIcon fontSize="large" />}
              text={"Observaciones"}
              onClick={() => setOpenDialogObs(true)}
              disabled={
                permiso < 2 &&
                (incidencia.responsable
                  ? userActual.dni !== incidencia.responsable.dni
                  : true)
              }
            />

            <BigButtonCustom
              icon={<ReceiptIcon fontSize="large" />}
              text={"generar justificante"}
              onClick={() => navigate("internet")}
              disabled={permiso < 1}
            />
          </div>
          <TituloPagina
            icon={<SettingsIcon fontSize="large" />}
            text={"Opciones Administrador:"}
          />
          <div className="bigButtons--container">
            <BigButtonCustom
              icon={<EditIcon fontSize="large" />}
              text={"Modificar incidencia"}
              onClick={() => setOpenDialog(true)}
              disabled={
                permiso < 2 && userActual.dni !== incidencia.reportador.dni
              }
            />
            <BigButtonCustom
              icon={<ContactsIcon fontSize="large" />}
              text={"Seleccionar responsable"}
              onClick={() => setOpenDialogSelRes(true)}
              disabled={permiso < 2}
            />
            <BigButtonCustom
              icon={<AutorenewIcon fontSize="large" />}
              text={"Cambiar estado"}
              onClick={() => setOpenDialogSelEst(true)}
              disabled={permiso < 2}
            />
          </div>
          <DialogIncidencia
            open={openDialog}
            onClose={handleCloseDialog}
            actualizar={actualizar}
            id={params.id}
            incidencia={incidencia}
          />
          <DialogObservaciones
            open={openDialogObs}
            onClose={handleCloseDialogObs}
            actualizar={actualizar}
            id={params.id}
            incidencia={incidencia}
          />
          <DialogFinalizar
            open={openDialogEnd}
            onClose={handleCloseDialogEnd}
            actualizar={actualizar}
            id={params.id}
            incidencia={incidencia}
          />
          <DialogSeleccionarResponsable
            open={openDialogSelRes}
            onClose={handleCloseDialogSelRes}
            actualizar={cambiarResponsable}
            responsableActual={incidencia.responsable}
          />
          <DialogSeleccionarEstado
            open={openDialogSelEst}
            onClose={handleCloseDialogSelEst}
            actualizar={cambiarEstado}
            responsableActual={incidencia.estado}
          />
        </>
      ) : (
        <>
          <TituloPagina
            icon={<SettingsIcon fontSize="large" />}
            text={"Cargando incidencia:"}
          />
          <Cargando />
        </>
      )}
    </div>
  );
}
