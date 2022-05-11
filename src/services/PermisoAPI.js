export function getPermisos() {
  const request = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  return fetch("/api/permiso/get/all", request);
}

export function getPermiso(id) {
  const request = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  return fetch("/api/permiso/get/" + id, request);
}

export function postPermiso(datos) {
  const request = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  };
  return fetch("/api/permiso/insert", request);
}

export function putPermiso(id, datos) {
  const request = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  };
  return fetch("/api/permiso/update/" + id, request);
}

export function deletePermiso(id) {
  const request = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };
  return fetch("/api/permiso/delete/" + id, request);
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
      return "add/mod/del permisoes";
    case "IEDA":
      return "importar/exportar datos";
    case "INFO":
      return "ver informes";
    default:
      return "ERROR DECO PERMISO";
  }
}
