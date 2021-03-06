import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Dialog, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import TextFieldCustom from "../atoms/TextFieldCustom";
import ButtonCustom from "../atoms/ButtonCustom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import AlertCustom from "../atoms/AlertCustom";
import moment from "moment";

import "./Dialog.css";
import { putSolved, putUnsolved } from "../../services/IncidenciaAPI";

export default function DialogIncidencia({
  open,
  onClose,
  actualizar,
  id,
  incidencia,
}) {
  const [estado, setEstado] = useState(0);

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
        .typeError("Introduce observaciones.")
        .required("Introduce observaciones.")
        .max(250, "No puede contener mas de 250 caracteres."),
      fecha_finalizacion: yup
        .date()
        .required("Introduce una fecha.")
        .typeError("Introduce una fecha válida."),
      tiempo_invertido: yup
        .number()
        .min(0, "No puede ser un valor negativo.")
        .max(999, "Pues si que te ha costado...")
        .typeError("Introduce el tiempo invertido.")
        .required("Introduce el tiempo invertido."),
    })
    .required();

  const {
    control,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      observaciones: "",
      fecha_finalizacion: moment(Date.now()).format("YYYY-MM-DD"),
      tiempo_invertido: 0,
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (id && open) {
      if (incidencia) {
        reset(incidencia);
        setValue("fecha_finalizacion", moment(Date.now()).format("YYYY-MM-DD"));
        setEstado(0);
      }
    }
  }, [id, onClose, open]);

  const onSubmit = async (data) => {
    const user = JSON.parse(sessionStorage.getItem("incidenciasUser"));
    let tmp = data;
    tmp.historial +=
      "{UwU}" +
      moment(Date.now()).format("DD-MM-YY") +
      " Finalizada por: " +
      user.email;

    if (estado === 0) {
      putSolved(id, tmp)
        .then((response) => {
          if (response.status === 200) {
            actualizar();
            openAlert(
              "Se ha finalizado la incidencia e informado a su reportador.",
              "success"
            );
            onClose();
          } else if (response.status === 402) {
            return response.json();
          } else {
            openAlert("No se ha podido finalizar la incidencia.", "error");
          }
        })
        .then((json) => json && openAlert(json.message, "error"));
    } else {
      putUnsolved(id, tmp)
        .then((response) => {
          if (response.status === 200) {
            actualizar();
            openAlert(
              "Se ha finalizado la incidencia e informado a su reportador.",
              "success"
            );
            onClose();
          } else if (response.status === 402) {
            return response.json();
          } else {
            openAlert("No se ha podido finalizar la incidencia.", "error");
          }
        })
        .then((json) => json && openAlert(json.message, "error"));
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <form className="dialog">
          <div className="dialog--oneColumn">
            <div className="dialog--oneColumn--title">
              <h3>Finalizar incidencia:</h3>
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
            <div className="dialog--twoColumn--row">
              <Controller
                name="tiempo_invertido"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextFieldCustom
                    className="textFieldCustom--time"
                    color={"text"}
                    label={"Tiempo (h): "}
                    value={value}
                    onChange={onChange}
                    type="number"
                    errors={errors.tiempo_invertido?.message}
                  />
                )}
              />

              <RadioGroup
                row
                value={estado}
                onChange={(event, option) => {
                  setEstado(option);
                }}
              >
                <div className="dialog--twoColumn--radiobutton">
                  <FormControlLabel
                    value={0}
                    control={<Radio />}
                    label="Solucionada"
                  />
                  <FormControlLabel
                    value={1}
                    control={<Radio />}
                    label="Solución inviable"
                  />
                </div>
              </RadioGroup>
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
