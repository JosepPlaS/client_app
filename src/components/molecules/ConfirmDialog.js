import { Dialog } from "@mui/material";
import ButtonCustom from "../atoms/ButtonCustom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

export default function ConfirmDialog(props) {
  const { open, onClose, aceptar, title, text, id } = props;
  return (
    <Dialog open={open} onClose={onClose}>
      <div className="dialog">
        <div className="dialog--oneColumn">
          <div className="dialog--oneColumn--title">
            <h3>{title}:</h3>
          </div>
          {text}
        </div>
        <div className="dialog--oneColumn--buttons--container">
          <div className="dialog--oneColumn--buttons">
            <ButtonCustom
              label={"Confirmar"}
              color={"success"}
              onClick={() => {
                aceptar(id && id);
                onClose();
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
      </div>
    </Dialog>
  );
}
