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
import FiberManualRecordOutlinedIcon from "@mui/icons-material/FiberManualRecordOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import moment from "moment";

import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import "./Card.css";
import { useState } from "react";
import { IconButton } from "@mui/material";

export default function CardIncidenciaDetalle({ incidencia }) {
  const [historial, setHistorial] = useState(false);
  function formatHistorial(historial) {
    let hList = historial.split("{UwU}");

    return (
      <ul>
        {hList.map((line, index) => (
          <li key={"h" + index}>{line}</li>
        ))}
      </ul>
    );
  }

  return (
    <div className="card--detalle">
      <div className="card--title">
        <div className="card--title--label">
          <AssignmentIcon />
          <div>Incidencia:</div>
        </div>
        {incidencia.codigo}
      </div>
      <hr />

      <div className="card--line">
        <div className="card--label">
          <CalendarMonthIcon fontSize="small" />
          <div>Fecha de la incidencia:</div>
        </div>
        <div className="card--data">{incidencia.fecha}</div>
      </div>
      <div className="card--line">
        <div className="card--label">
          <CalendarMonthIcon fontSize="small" />
          <div>Fecha de introducción:</div>
        </div>
        <div className="card--data">
          {moment(incidencia.fecha_introduccion).format("DD-MM-YYYY")}
        </div>
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
          <PersonPinIcon fontSize="small" />
          <div>Reportador:</div>
        </div>
        <div className="card--data">
          {incidencia.reportador && incidencia.reportador.email !== "root"
            ? incidencia.reportador.nombre +
              " " +
              incidencia.reportador.apellido1 +
              " " +
              incidencia.reportador.apellido2
            : "No especificado"}
        </div>
      </div>
      <div className="card--line">
        <div className="card--label">
          <DescriptionOutlinedIcon fontSize="small" />
          <div> Descripción:</div>
        </div>
      </div>
      <div>{incidencia.descripcion}</div>
      <hr />
      <div className="card--line">
        <div className="card--label">
          {incidencia.tipo_incidencia === 0 ? (
            <AssignmentIcon fontSize="small" />
          ) : incidencia.tipo_incidencia === 1 ? (
            <DesktopMacIcon fontSize="small" />
          ) : incidencia.tipo_incidencia === 2 ? (
            <TerminalIcon fontSize="small" />
          ) : incidencia.tipo_incidencia === 3 ? (
            <RouterIcon fontSize="small" />
          ) : (
            <QuestionMarkIcon fontSize="small" />
          )}
          <div>Tipo de incidencia:</div>
        </div>
        <div className="card--data">
          {incidencia.tipo_incidencia === 0
            ? "Otros"
            : incidencia.tipo_incidencia === 1
            ? "Hardware"
            : incidencia.tipo_incidencia === 2
            ? "Software"
            : incidencia.tipo_incidencia === 3
            ? "Internet"
            : "Otros"}
        </div>
      </div>
      {incidencia.tipo_incidencia === 1 ? (
        <>
          <div className="card--line">
            <div className="card--label">
              <FiberManualRecordOutlinedIcon fontSize="small" />
              <div>Modelo:</div>
            </div>
            <div className="card--data">
              {incidencia.incidencia_hw.modelo || "No especificado"}
            </div>
          </div>
          <div className="card--line">
            <div className="card--label">
              <FiberManualRecordOutlinedIcon fontSize="small" />
              <div>Nº de serie:</div>
            </div>
            <div className="card--data">
              {incidencia.incidencia_hw.numero_serie || "No especificado"}
            </div>
          </div>
          <div className="card--line">
            <div className="card--label">
              <FiberManualRecordOutlinedIcon fontSize="small" />
              <div>Tipo de hardware:</div>
            </div>
            <div className="card--data">
              {(incidencia.incidencia_hw.tipo_hardware &&
                incidencia.incidencia_hw.tipo_hardware.nombre) ||
                "No especificado"}
            </div>
          </div>
        </>
      ) : incidencia.tipo_incidencia === 2 ? (
        <>
          <div className="card--line">
            <div className="card--label">
              <FiberManualRecordOutlinedIcon fontSize="small" />
              <div>Aplicación:</div>
            </div>
            <div className="card--data">
              {incidencia.incidencia_sw.aplicacion || "No especificado"}
            </div>
          </div>
          <div className="card--line">
            <div className="card--label">
              <FiberManualRecordOutlinedIcon fontSize="small" />
              <div>Sistema operativo:</div>
            </div>
            <div className="card--data">
              {incidencia.incidencia_sw.sistema_operativo || "No especificado"}
            </div>
          </div>
        </>
      ) : (
        ""
      )}
      <hr />
      <div className="card--line">
        <div className="card--label">
          <PersonIcon fontSize="small" />
          <div> Responsable:</div>
        </div>
        <div className="card--data">
          {incidencia.responsable
            ? incidencia.responsable.nombre +
              " " +
              incidencia.responsable.apellido1 +
              " " +
              incidencia.responsable.apellido2
            : "No asignado"}
        </div>
      </div>
      <div className="card--line">
        <div className="card--label">
          <CalendarMonthIcon fontSize="small" />
          <div>Fecha de finalización:</div>
        </div>
        <div className="card--data">
          {incidencia.fecha_finalizacion
            ? moment(incidencia.fecha_finalizacion).format("DD-MM-YYYY")
            : "No finalizada"}
        </div>
      </div>
      <div className="card--line">
        <div className="card--label">
          <AccessTimeOutlinedIcon fontSize="small" />
          <div>Tiempo invertido:</div>
        </div>
        <div className="card--data">
          {incidencia.tiempo_invertido !== null
            ? incidencia.tiempo_invertido + " horas"
            : "No especificado"}
        </div>
      </div>
      <div className="card--line">
        <div className="card--label">
          <DescriptionOutlinedIcon fontSize="small" />
          <div> Observaciones:</div>
        </div>
      </div>
      <div>{incidencia.observaciones || "No hay observaciones."}</div>
      <hr />
      <div className="card--line">
        <div className="card--label">
          <AutorenewIcon fontSize="small" />
          <div>Estado:</div>
        </div>
        <div className="card--data">{incidencia.estadoCodigo}</div>
      </div>
      <div>{incidencia.estado.descripcion}</div>
      <div className="card--line">
        <div className="card--label">
          <CalendarMonthIcon fontSize="small" />
          <div>Historial:</div>
        </div>
        <div>
          <IconButton onClick={() => setHistorial((old) => !old)}>
            {!historial ? (
              <RemoveRedEyeOutlinedIcon fontSize="small" />
            ) : (
              <VisibilityOffOutlinedIcon fontSize="small" />
            )}
          </IconButton>
        </div>
      </div>
      {historial && <div>{formatHistorial(incidencia.historial)}</div>}
    </div>
  );
}
