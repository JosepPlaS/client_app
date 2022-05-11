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

import "./Dialog.css";
import AlertCustom from "../atoms/AlertCustom";

export default function DialogDepartamento({ open, onClose, actualizar, id }) {
  const schema = yup
    .object({
      codigo: yup.string().required("Introduce un codigo."),
      nombre: yup.string().required("Introduce un nombre."),
      descripcion: yup
        .string()
        .max(250, "La descripcion no puede superar los 250 caracteres."),
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
      descripcion: "",
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (id) {
      getDepartamento(id)
        .then((response) => response.json())
        .then((json) => reset(json));
    } else {
      reset({ codigo: "", nombre: "", descripcion: "" });
    }
  }, [id, reset, onClose]);

  const onSubmit = (data) => {
    (!id ? postDepartamento(data) : putDepartamento(id, data)).then(
      (response) => {
        if (response.status === 200) {
          actualizar();
          onClose();
        } else {
          openAlert(
            "No se ha podido " +
              (id ? "modificar" : "introducir") +
              " el departamento.",
            "error"
          );
        }
      }
    );
  };

  const [alert, setAlert] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [alertType, setAlertType] = useState("success");

  function openAlert(text, type) {
    if (alert) {
      setAlert(true);
    } else {
      setAlert(false);
      setAlert(true);
    }
    setAlertText(text);
    setAlertType(type);
  }

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
                  className={"tfDialogLong"}
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
                  className={"tfDialogLong"}
                  label={"Nombre: "}
                  value={value}
                  onChange={onChange}
                  errors={errors.nombre?.message}
                />
              )}
            />
            <Controller
              name="descripcion"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextFieldCustom
                  color={"text"}
                  className={"tfDialogLong"}
                  label={"Descripcion: "}
                  value={value}
                  onChange={onChange}
                  multiLine={true}
                  errors={errors.descripcion?.message}
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
