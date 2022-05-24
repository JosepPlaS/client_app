export function getEstados() {
  const request = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  return fetch("/api/estado/get/all", request);
}

export function getEstado(id) {
  const request = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  return fetch("/api/estado/get/" + id, request);
}

export function getEstadoByCodigo(codigo) {
  const request = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  return fetch("/api/estado/get/c-" + codigo, request);
}

export function postEstado(datos) {
  const request = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  };
  return fetch("/api/estado/insert", request);
}

export function putEstado(id, datos) {
  const request = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  };
  return fetch("/api/estado/update/" + id, request);
}

export function deleteEstado(id) {
  const request = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };
  return fetch("/api/estado/delete/" + id, request);
}
