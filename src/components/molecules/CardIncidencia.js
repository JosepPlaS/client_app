import AssignmentIcon from "@mui/icons-material/Assignment"; // INCIDENCIA
import DesktopMacIcon from "@mui/icons-material/DesktopMac";
import TerminalIcon from "@mui/icons-material/Terminal";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import HomeIcon from "@mui/icons-material/Home";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import RouterIcon from "@mui/icons-material/Router";
import PersonIcon from "@mui/icons-material/Person";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import "./Card.css";
import ButtonCustomCard from "../atoms/ButtonCustomCard";

export default function CardIncidencia({
  incidencia,
  editar,
  eliminar,
  user,
  disabled,
}) {
  return (
    <div className="card">
      <div className="card--title">
        <div className="card--title--label">
          {incidencia.tipo_incidencia === 0 ? (
            <AssignmentIcon />
          ) : incidencia.tipo_incidencia === 1 ? (
            <DesktopMacIcon />
          ) : incidencia.tipo_incidencia === 2 ? (
            <TerminalIcon />
          ) : incidencia.tipo_incidencia === 3 ? (
            <RouterIcon />
          ) : (
            <QuestionMarkIcon />
          )}
          <div>Incidencia:</div>
        </div>
        {incidencia.codigo}
      </div>
      <hr />
      <div className="card--line">
        <div className="card--label">
          <AutorenewIcon fontSize="small" />
          <div>Estado:</div>
        </div>
        <div className="card--data">{incidencia.estadoCodigo}</div>
      </div>
      <div className="card--line">
        <div className="card--label">
          <HomeIcon fontSize="small" />
          <div>Aula:</div>
        </div>
        {incidencia.aula}
      </div>
      <div className="card--line">
        <div className="card--label">
          <CalendarMonthIcon fontSize="small" />
          <div>Fecha:</div>
        </div>
        <div className="card--data">{incidencia.fecha}</div>
      </div>

      <div className="card--line">
        <div className="card--label">
          <PersonPinIcon fontSize="small" />
          <div>Reportador:</div>
        </div>
        <div className="card--data">{incidencia.reportadorNombre}</div>
      </div>
      <div className="card--line">
        <div className="card--label">
          <PersonIcon fontSize="small" />
          <div> Responsable:</div>
        </div>
        <div className="card--data">
          {incidencia.responsableNombre || "No asignado"}
        </div>
      </div>
      <hr />
      <div className="card--buttons">
        <ButtonCustomCard
          icon={<RemoveRedEyeOutlinedIcon fontSize="small" />}
          label="Detalle"
          onClick={() => editar(incidencia.id)}
          // disabled={
          //   user === incidencia.reportador.dni
          //     ? false
          //     : incidencia.responsable && user === incidencia.responsable.dni
          //     ? false
          //     : disabled
          // }
        />
        <ButtonCustomCard
          icon={<DeleteOutlineOutlinedIcon fontSize="small" />}
          label="Eliminar"
          onClick={() => eliminar(incidencia.id)}
          disabled={user === incidencia.reportador.dni ? false : disabled}
        />
      </div>
    </div>
  );
}
