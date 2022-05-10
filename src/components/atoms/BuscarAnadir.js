import { InputAdornment, OutlinedInput, Paper } from "@mui/material";
import ButtonCustom from "./ButtonCustom";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import AutorenewIcon from "@mui/icons-material/Autorenew";

import "./atoms.css";

export function filtrar(datos, filtro) {
  if (!filtro) return datos;
  return datos.filter((dato) =>
    Object.keys(dato).some(
      (key) =>
        typeof dato[key] === "string" &&
        dato[key].toLowerCase().includes(filtro.toLowerCase())
    )
  );
}

export default function BuscarAnadir({
  filtro,
  crear,
  actualizar,
  disableCrear,
}) {
  return (
    <div className="BuscarAnadir--contenedor">
      <div className="BuscarAnadir--buscador">
        <Paper>
          <OutlinedInput
            style={{ height: "30px" }}
            onChange={(evnt) => filtro(evnt.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            }
          />
        </Paper>
      </div>
      {(crear || actualizar) && (
        <div className="BuscarAnadir--botones">
          {actualizar && (
            <div className="BuscarAnadir--boton">
              <ButtonCustom
                onClick={() => actualizar()}
                icon={<AutorenewIcon fontSize="small" />}
                label="Recargar"
              />
            </div>
          )}
          {crear && (
            <div className="BuscarAnadir--boton">
              <ButtonCustom
                onClick={() => crear()}
                disabled={disableCrear}
                icon={<AddIcon fontSize="small" />}
                label="Crear"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
