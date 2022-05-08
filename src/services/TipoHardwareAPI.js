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
