import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { getRoles } from "../../services/RolAPI";
import { getDepartamentos } from "../../services/DepartamentoAPI";
import {
  getProfesor,
  postProfesor,
  putProfesor,
} from "../../services/ProfesorAPI";
import { Dialog } from "@mui/material";
import TextFieldCustom from "../atoms/TextFieldCustom";
import ButtonCustom from "../atoms/ButtonCustom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import AlertCustom from "../atoms/AlertCustom";

import "./Dialog.css";
import SelectorCustom from "../atoms/SelectorCustom";

export default function DialogProfesor({ open, onClose, actualizar, id }) {
  const [departamentos, setDepartamentos] = useState();
  const [roles, setRoles] = useState();

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
      dni: yup
        .string()
        .strict(true)
        .matches(
          new RegExp(
            /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i.source +
              "|" +
              /^[XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]$/i.source
          ),
          "Formato incorrecto."
        )
        .required("Introduce un DNI."),
      nombre: yup.string().required("Introduce un nombre."),
      apellido1: yup.string().required("Introduce el primer apellido."),
      apellido2: yup.string().required("Introduce el segundo apellido."),
      email: yup
        .string()
        .email("formato incorrecto.")
        .required("Introduce un email."),
      contrasena: yup
        .string()
        .min(8, "Minimo 8 caracteres.")
        .required("Introduce una contraseña."),
      departamento: yup.object().nullable(),
      rol: yup.object().required("Selecciona un rol."),
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
      dni: "",
      nombre: "",
      apellido1: "",
      apellido2: "",
      email: "",
      contrasena: "",
      departamento: { nombre: "" },
      rol: { nombre: "" },
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    !departamentos &&
      getDepartamentos()
        .then((response) => response.json())
        .then((json) => json && setDepartamentos(json));

    !roles &&
      getRoles()
        .then((response) => response.json())
        .then((json) => json && setRoles(json));
    if (id) {
      getProfesor(id)
        .then((response) => response.json())
        .then((json) => json && reset(json));
    } else {
      reset({
        dni: "",
        nombre: "",
        apellido1: "",
        apellido2: "",
        email: "",
        contrasena: "",
        departamento: { nombre: "" },
        rol: (roles && roles.find((rol) => rol.nombre === "Profesor")) || {
          nombre: "",
        },
      });
    }
  }, [id, onClose]);

  const onSubmit = (data) => {
    (!id ? postProfesor(data) : putProfesor(id, data))
      .then((response) => {
        if (response.status === 200) {
          actualizar();
          onClose();
        } else if (response.status === 402) {
          return response.json();
        } else {
          openAlert(
            "No se ha podido " +
              (id ? "modificar" : "introducir") +
              " el profesor.",
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
              <h3>{!id ? "Crear " : "Modificar "}profesor:</h3>
            </div>
            <div className="dialog--twoColumn--row">
              <Controller
                name="dni"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextFieldCustom
                    color={"text"}
                    label={"DNI: "}
                    value={value}
                    onChange={onChange}
                    errors={errors.dni?.message}
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
            </div>
            <div className="dialog--twoColumn--row">
              <Controller
                name="apellido1"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextFieldCustom
                    color={"text"}
                    label={"Primer apellido: "}
                    value={value}
                    onChange={onChange}
                    errors={errors.apellido1?.message}
                  />
                )}
              />
              <Controller
                name="apellido2"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextFieldCustom
                    color={"text"}
                    label={"Segundo apellido: "}
                    value={value}
                    onChange={onChange}
                    errors={errors.apellido2?.message}
                  />
                )}
              />
            </div>
            <div className="dialog--twoColumn--row">
              <Controller
                name="email"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextFieldCustom
                    color={"text"}
                    label={"Email: "}
                    value={value}
                    onChange={onChange}
                    errors={errors.email?.message}
                  />
                )}
              />
              <Controller
                name="contrasena"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextFieldCustom
                    color={"text"}
                    label={"Contraseña: "}
                    value={value}
                    onChange={onChange}
                    password={true}
                    errors={errors.contrasena?.message}
                  />
                )}
              />
            </div>
            <div className="dialog--twoColumn--row">
              <Controller
                name="departamento"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <SelectorCustom
                    color={"text"}
                    datos={departamentos}
                    optionLabel={(option) => option.nombre}
                    value={value}
                    onChange={(event, option) => {
                      onChange(option);
                    }}
                    label={"Departamento: "}
                    errors={errors.departamento?.message}
                    clear={true}
                  />
                )}
              />
              <Controller
                name="rol"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <SelectorCustom
                    color={"text"}
                    datos={roles}
                    optionLabel={(option) => option.nombre}
                    value={value}
                    onChange={(event, option) => onChange(option)}
                    label={"Rol: "}
                    errors={errors.rol?.message}
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
