export function getRoles() {
  const request = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  return fetch("/api/rol/get/all", request);
}

export function getRol(id) {
  const request = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  return fetch("/api/rol/get/" + id, request);
}

export function postRol(datos) {
  const request = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  };
  return fetch("/api/rol/insert", request);
}

export function putRol(id, datos) {
  const request = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  };
  return fetch("/api/rol/update/" + id, request);
}

export function deleteRol(id) {
  const request = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };
  return fetch("/api/rol/delete/" + id, request);
}

export function decoPermiso(codigo) {
  switch (codigo) {
    case "ADIN":
      return "add incidencias";
    case "MOIN":
      return "mod/del incidencias";
    case "ALTH":
      return "add/mod/del tipo hardware";
    case "ALRO":
      return "add/mod/del roles";
    case "IEDA":
      return "importar/exportar datos";
    case "INFO":
      return "ver informes";
    default:
      return "ERROR DECO PERMISO";
  }
}
