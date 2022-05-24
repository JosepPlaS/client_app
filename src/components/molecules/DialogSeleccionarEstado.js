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
  responsableActual,
}) {
  const [estados, setEstados] = useState([]);
  const [responsable, setResponsable] = useState(null);

  useEffect(() => {
    open &&
      getEstados()
        .then((response) => response.json())
        .then((json) => json && setEstados(json));
    setResponsable(responsableActual);
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
              value={responsable || null}
              onChange={(event, option) => setResponsable(option)}
            />
          </div>
          <div className="dialog--oneColumn--buttons--container">
            <div className="dialog--oneColumn--buttons">
              <ButtonCustom
                label={"Aceptar"}
                color={"success"}
                onClick={() => {
                  if (responsable) {
                    actualizar(responsable);
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
