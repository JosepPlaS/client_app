import moment from "moment";

export function getIncidencias() {
  const request = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  return fetch("/api/incidencia/get/all", request);
}

export function getIncidenciasTipo(tipo_incidencia) {
  const request = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  return fetch(
    "/api/incidencia/get/tipo_incidencia/" + tipo_incidencia,
    request
  );
}

export function getIncidenciasResponsable(id) {
  const request = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  return fetch("/api/incidencia/get/all/responsable/" + id, request);
}

export function getIncidenciasReportadas(id) {
  const request = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  return fetch("/api/incidencia/get/all/reportada/" + id, request);
}

export function getIncidencia(id) {
  const request = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  return fetch("/api/incidencia/get/" + id, request);
}

export function getEstadisticas(anyo) {
  const request = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  return fetch("/api/incidencia/get/estadisticas/" + anyo, request);
}

export function postIncidencia(datos) {
  const request = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  };
  return fetch("/api/incidencia/insert", request);
}

export function putIncidencia(id, datos) {
  const request = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  };
  return fetch("/api/incidencia/update/" + id, request);
}

export function putResponsable(id, datos) {
  const request = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  };
  return fetch("/api/incidencia/comunicar/" + id, request);
}

export function putWorkingOn(id, datos) {
  const request = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  };
  return fetch("/api/incidencia/trabajar/" + id, request);
}

export function putSolved(id, datos) {
  const request = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  };
  return fetch("/api/incidencia/viable/" + id, request);
}

export function putUnsolved(id, datos) {
  const request = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  };
  return fetch("/api/incidencia/inviable/" + id, request);
}

export function putEstadoIncidencia(id, datos) {
  const request = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  };
  return fetch("/api/incidencia/estado/" + id, request);
}

export function deleteIncidencia(id) {
  const request = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };
  return fetch("/api/incidencia/delete/" + id, request);
}

export function formatIncidencias(json) {
  let newIncidencias = [];
  json.map((incidencia) => {
    incidencia.id > 999
      ? (incidencia.codigo = incidencia.id)
      : incidencia.id > 99
      ? (incidencia.codigo = "0" + incidencia.id)
      : incidencia.id > 9
      ? (incidencia.codigo = "00" + incidencia.id)
      : (incidencia.codigo = "000" + incidencia.id);

    incidencia.tipo_incidencia === 1
      ? (incidencia.tipo = "Hardware")
      : incidencia.tipo_incidencia === 2
      ? (incidencia.tipo = "Software")
      : (incidencia.tipo = "");

    incidencia.fecha = moment(incidencia.fecha_incidencia).format("DD-MM-YYYY");

    switch (incidencia.estado.codigo) {
      case "Reportada":
        incidencia.estadoCodigo = "🟠 " + incidencia.estado.codigo;
        break;
      case "Comunicada":
        incidencia.estadoCodigo = "🟡 " + incidencia.estado.codigo;
        break;
      case "En proceso":
        incidencia.estadoCodigo = "🔵 " + incidencia.estado.codigo;
        break;
      case "Solución inviable":
        incidencia.estadoCodigo = "🔴 " + incidencia.estado.codigo;
        break;
      case "Solucionada":
        incidencia.estadoCodigo = "🟢 " + incidencia.estado.codigo;
        break;
      default:
        incidencia.estadoCodigo = "🥵 ERROR";
    }

    incidencia.reportador && incidencia.reportador.nombre
      ? (incidencia.reportadorNombre =
          incidencia.reportador.nombre + " " + incidencia.reportador.apellido1)
      : (incidencia.reportadorNombre = "");

    incidencia.responsable && incidencia.responsable.nombre
      ? (incidencia.responsableNombre =
          incidencia.responsable.nombre +
          " " +
          incidencia.responsable.apellido1)
      : (incidencia.responsableNombre = "");

    newIncidencias.push(incidencia);
    return undefined;
  });
  return newIncidencias;
}

export function formatIncidencia(incidencia) {
  incidencia.id > 999
    ? (incidencia.codigo = incidencia.id)
    : incidencia.id > 99
    ? (incidencia.codigo = "0" + incidencia.id)
    : incidencia.id > 9
    ? (incidencia.codigo = "00" + incidencia.id)
    : (incidencia.codigo = "000" + incidencia.id);

  incidencia.tipo_incidencia === 1
    ? (incidencia.tipo = "Hardware")
    : incidencia.tipo_incidencia === 2
    ? (incidencia.tipo = "Software")
    : (incidencia.tipo = "");

  incidencia.fecha = moment(incidencia.fecha_incidencia).format("DD-MM-YYYY");

  switch (incidencia.estado.codigo) {
    case "Reportada":
      incidencia.estadoCodigo = "🟠 " + incidencia.estado.codigo;
      break;
    case "Comunicada":
      incidencia.estadoCodigo = "🟡 " + incidencia.estado.codigo;
      break;
    case "En proceso":
      incidencia.estadoCodigo = "🔵 " + incidencia.estado.codigo;
      break;
    case "Solución inviable":
      incidencia.estadoCodigo = "🔴 " + incidencia.estado.codigo;
      break;
    case "Solucionada":
      incidencia.estadoCodigo = "🟢 " + incidencia.estado.codigo;
      break;
    default:
      incidencia.estadoCodigo = "🥵 ERROR";
  }

  incidencia.reportador && incidencia.reportador.nombre
    ? (incidencia.reportadorNombre =
        incidencia.reportador.nombre + " " + incidencia.reportador.apellido1)
    : (incidencia.reportadorNombre = "");

  incidencia.responsable && incidencia.responsable.nombre
    ? (incidencia.responsableNombre =
        incidencia.responsable.nombre + " " + incidencia.responsable.apellido1)
    : (incidencia.responsableNombre = "");

  return incidencia;
}
