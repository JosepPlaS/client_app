import { useEffect, useState } from "react";
import { Dialog } from "@mui/material";
import ButtonCustom from "../atoms/ButtonCustom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

import "./Dialog.css";
import SelectorCustom from "../atoms/SelectorCustom";
import { getEstado, getEstados } from "../../services/EstadoAPI";

export default function DialogTipoHardware({
  open,
  onClose,
  actualizar,
  estadoActual,
}) {
  const [estados, setEstados] = useState([]);
  const [estado, setEstado] = useState(null);

  useEffect(() => {
    open &&
      getEstados()
        .then((response) => response.json())
        .then((json) => json && setEstados(json));
    setEstado(estadoActual);
  }, [onClose, open]);

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <form className="dialog">
          <div className="dialog--oneColumn">
            <div className="dialog--oneColumn--title">
              <h3>Seleccionar estado:</h3>
            </div>
            <SelectorCustom
              datos={estados}
              optionLabel={(option) => option.codigo}
              color={"text"}
              label={"Estado: "}
              value={estado || null}
              onChange={(event, option) => setEstado(option)}
            />
          </div>
          <div className="dialog--oneColumn--buttons--container">
            <div className="dialog--oneColumn--buttons">
              <ButtonCustom
                label={"Aceptar"}
                color={"success"}
                onClick={() => {
                  if (estado) {
                    actualizar(estado);
                    onClose();
                  }
                }}
                icon={<CheckCircleOutlineIcon fontSize="small" />}
              />
            </div>
            <div className="dialog--oneColumn--buttons">
              <ButtonCustom
                onClick={onClose}
                variant="contained"
                color="error"
                label="Cancelar"
                icon={<CancelOutlinedIcon fontSize="small" />}
              />
            </div>
          </div>
        </form>
      </Dialog>
    </>
  );
}
