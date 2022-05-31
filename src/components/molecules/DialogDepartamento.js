import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  getDepartamento,
  postDepartamento,
  putDepartamento,
} from "../../services/DepartamentoAPI";
import { Dialog } from "@mui/material";
import TextFieldCustom from "../atoms/TextFieldCustom";
import ButtonCustom from "../atoms/ButtonCustom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import AlertCustom from "../atoms/AlertCustom";

import "./Dialog.css";

export default function DialogDepartamento({ open, onClose, actualizar, id }) {
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
      codigo: yup.string().required("Introduce un codigo."),
      nombre: yup.string().required("Introduce un nombre."),
      localizacion: yup.string(),
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
      codigo: "",
      nombre: "",
      localizacion: "",
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (id) {
      getDepartamento(id)
        .then((response) => response.json())
        .then((json) => reset(json));
    } else {
      reset({ codigo: "", nombre: "", localizacion: "" });
    }
  }, [id, reset, onClose]);

  const onSubmit = (data) => {
    (!id ? postDepartamento(data) : putDepartamento(id, data))
      .then((response) => {
        if (response.status === 200) {
          actualizar();
          openAlert(
            "Se ha " +
              (id ? "modificado" : "introducido") +
              " el departamento.",
            "success"
          );
          onClose();
        } else if (response.status === 402) {
          return response.json();
        } else {
          openAlert(
            "No se ha podido " +
              (id ? "modificar" : "introducir") +
              " el departamento.",
            "error"
          );
        }
      })
      .then((json) => json && openAlert(json.message, "error"));
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <form className="dialog">
          <div className="dialog--oneColumn">
            <div className="dialog--oneColumn--title">
              <h3>{!id ? "Crear " : "Modificar "}departamento:</h3>
            </div>
            <Controller
              name="codigo"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextFieldCustom
                  color={"text"}
                  label={"Codigo: "}
                  value={value}
                  onChange={onChange}
                  errors={errors.codigo?.message}
                />
              )}
            />
            <Controller
              name="nombre"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextFieldCustom
                  color={"text"}
                  label={"Nombre: "}
                  value={value}
                  onChange={onChange}
                  errors={errors.nombre?.message}
                />
              )}
            />
            <Controller
              name="localizacion"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextFieldCustom
                  color={"text"}
                  label={"Localizacion: "}
                  value={value}
                  onChange={onChange}
                  multiLine={true}
                  errors={errors.localizacion?.message}
                />
              )}
            />
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
