import { InputAdornment, OutlinedInput, Paper } from "@mui/material";
import ButtonCustom from "./ButtonCustom";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

import "./atoms.css";

export default function BuscarAnadir({ filtro, crear }) {
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
      <ButtonCustom
        onClick={() => crear()}
        icon={<AddIcon fontSize="small" />}
        label="Crear"
      />
      <div className="BuscarAnadir--boton">
        <div className="BuscarAnadir--texto"></div>
      </div>
    </div>
  );
}
