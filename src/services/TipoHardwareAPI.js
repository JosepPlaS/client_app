export function getTiposHardware() {
  const request = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  return fetch("/api/tipo_hardware/get/all", request);
}

export function getTipoHardware(id) {
  const request = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  return fetch("/api/tipo_hardware/get/" + id, request);
}

export function postTipoHardware(datos) {
  const request = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  };
  return fetch("/api/tipo_hardware/insert", request);
}

export function putTipoHardware(id, datos) {
  const request = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  };
  return fetch("/api/tipo_hardware/update/" + id, request);
}

export function deleteTipoHardware(id) {
  const request = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };
  return fetch("/api/tipo_hardware/delete/" + id, request);
}
