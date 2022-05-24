import { useEffect, useState } from "react";
import { Dialog } from "@mui/material";
import ButtonCustom from "../atoms/ButtonCustom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import MouseOutlinedIcon from "@mui/icons-material/MouseOutlined";

import "./Dialog.css";
import SelectorCustom from "../atoms/SelectorCustom";
import { getProfesores } from "../../services/ProfesorAPI";

export default function DialogTipoHardware({
  open,
  onClose,
  actualizar,
  responsableActual,
}) {
  const [profesores, setProfesores] = useState([]);
  const [responsable, setResponsable] = useState(null);

  useEffect(() => {
    open &&
      getProfesores()
        .then((response) => response.json())
        .then((json) => json && setProfesores(json));
    setResponsable(responsableActual);
  }, [onClose, open]);

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <form className="dialog">
          <div className="dialog--oneColumn">
            <div className="dialog--oneColumn--title">
              <h3>Seleccionar responsable:</h3>
            </div>
            <div className="dialog--oneColumn--fullSize--row">
              <SelectorCustom
                datos={profesores}
                optionLabel={(option) =>
                  option.nombre + " " + option.apellido1 + " - " + option.email
                }
                color={"text"}
                label={"Responsable: "}
                value={responsable || null}
                onChange={(event, option) => setResponsable(option)}
              />
            </div>
            <ButtonCustom
              onClick={() => {
                actualizar(undefined);
                onClose();
              }}
              variant="contained"
              color="info"
              label="Asignar al SAI"
              icon={<MouseOutlinedIcon fontSize="small" />}
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
