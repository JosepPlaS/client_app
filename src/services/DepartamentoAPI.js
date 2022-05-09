export function getDepartamentos() {
  const request = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  return fetch("/api/departamento/get/all", request);
}

export function getDepartamento(id) {
  const request = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  return fetch("/api/departamento/get/" + id, request);
}

export function postDepartamento(datos) {
  const request = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  };
  return fetch("/api/departamento/insert", request);
}

export function putDepartamento(id, datos) {
  const request = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  };
  return fetch("/api/departamento/update/" + id, request);
}

export function deleteDepartamento(id) {
  const request = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };
  return fetch("/api/departamento/delete/" + id, request);
}
