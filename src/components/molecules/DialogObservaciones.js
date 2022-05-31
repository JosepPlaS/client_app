import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Dialog } from "@mui/material";
import TextFieldCustom from "../atoms/TextFieldCustom";
import ButtonCustom from "../atoms/ButtonCustom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import AlertCustom from "../atoms/AlertCustom";
import moment from "moment";

import "./Dialog.css";
import { putIncidencia } from "../../services/IncidenciaAPI";

export default function DialogIncidencia({
  open,
  onClose,
  actualizar,
  id,
  incidencia,
}) {
  const [alert, setAlert] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [alertType, setAlertType] = useState("success");

  const openAlert = (text, type) => {
    if (alert) {
      setAlert(true);
    } else {
      setAlert(false);
      setAlert(true);
    }
    setAlertText(text);
    setAlertType(type);
  };

  const schema = yup
    .object({
      observaciones: yup
        .string()
        .max(250, "No puede contener mas de 250 caracteres."),
    })
    .required();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      observaciones: "",
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (id && open) {
      if (incidencia) {
        reset(incidencia);
      }
    }
  }, [id, onClose, open]);

  const onSubmit = async (data) => {
    const user = JSON.parse(sessionStorage.getItem("incidenciasUser"));
    let tmp = data;
    tmp.historial +=
      "{UwU}" +
      moment(Date.now()).format("DD-MM-YY") +
      " Observaciones modificadas por: " +
      user.email;

    putIncidencia(id, tmp)
      .then((response) => {
        if (response.status === 200) {
          openAlert("Se han modificado las observaciones.", "success");
          actualizar();
          onClose();
        } else {
          return response.json();
        }
      })
      .then((json) => {
        if (json) {
          json.message
            ? openAlert(json.message, "error")
            : openAlert(
                "No se han podido modificar las observaciones.",
                "error"
              );
        }
      });
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <form className="dialog">
          <div className="dialog--oneColumn">
            <div className="dialog--oneColumn--title">
              <h3>Modificar observaciones:</h3>
            </div>
            <div className="dialog--oneColumn--fullSize--row">
              <Controller
                name="observaciones"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextFieldCustom
                    className="textFieldCustom--fullSize"
                    color={"text"}
                    label={"Observaciones: "}
                    value={value}
                    onChange={onChange}
                    multiLine={true}
                    errors={errors.observaciones?.message}
                  />
                )}
              />
            </div>
          </div>
          <div className="dialog--oneColumn--buttons--container">
            <div className="dialog--oneColumn--buttons">
              <ButtonCustom
                label={"Aceptar"}
                color={"success"}
                onClick={handleSubmit(onSubmit)}
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
      <AlertCustom
        open={alert}
        setOpen={setAlert}
        severity={alertType}
        text={alertText}
      />
    </>
  );
}
