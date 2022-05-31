import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { getRol, postRol, putRol } from "../../services/RolAPI";
import { getPermisos } from "../../services/PermisoAPI";
import { Checkbox, Dialog, FormControlLabel } from "@mui/material";
import TextFieldCustom from "../atoms/TextFieldCustom";
import ButtonCustom from "../atoms/ButtonCustom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import AlertCustom from "../atoms/AlertCustom";

import "./Dialog.css";

export default function DialogRol({ open, onClose, actualizar, id }) {
  const [permisos, setPermisos] = useState();
  const [permisosUsuario, setPermisosUsuario] = useState();

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
      nombre: yup.string().required("Introduce un nombre."),
      adin: yup.boolean(),
      alro: yup.boolean(),
      alth: yup.boolean(),
      ieda: yup.boolean(),
      info: yup.boolean(),
      moin: yup.boolean(),
    })
    .required();

  const {
    control,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      nombre: "",
    },
    resolver: yupResolver(schema),
  });

  function convertPermisos(perms) {
    let tmp = {};
    perms.map((perm) => {
      switch (perm.codigo) {
        case "ADIN":
          tmp.adin = perm;
          break;
        case "MOIN":
          tmp.moin = perm;
          break;
        case "ALTH":
          tmp.alth = perm;
          break;
        case "ALRO":
          tmp.alro = perm;
          break;
        case "IEDA":
          tmp.ieda = perm;
          break;
        case "INFO":
          tmp.info = perm;
          break;
        default:
          tmp.error = perm;
      }
      return undefined;
    });
    return tmp;
  }

  function formatRol(rol) {
    rol.adin = false;
    rol.moin = false;
    rol.alth = false;
    rol.alro = false;
    rol.ieda = false;
    rol.info = false;
    rol.permisos.map((perm) => {
      switch (perm.codigo) {
        case "ADIN":
          rol.adin = true;
          break;
        case "MOIN":
          rol.moin = true;
          break;
        case "ALTH":
          rol.alth = true;
          break;
        case "ALRO":
          rol.alro = true;
          break;
        case "IEDA":
          rol.ieda = true;
          break;
        case "INFO":
          rol.info = true;
          break;
        default:
          console.log("PERMISO DESCONOCIDO");
      }
    });
    return rol;
  }

  function comprobarPermisos() {
    let user = JSON.parse(sessionStorage.getItem("incidenciasUser"));
    if (user) {
      setPermisosUsuario(convertPermisos(user.rol.permisos));
    } else {
      window.location.replace("");
    }
  }

  useEffect(() => {
    getPermisos()
      .then((response) => response.json())
      .then((json) => setPermisos(convertPermisos(json)));
    if (id) {
      getRol(id)
        .then((response) => response.json())
        .then((json) => {
          reset(formatRol(json));
        });
    } else {
      reset({ nombre: "" });
    }
    comprobarPermisos();
  }, [id, reset, onClose]);

  const onSubmit = (data) => {
    let newRol = {
      nombre: data.nombre,
      permisos: [],
    };

    data.adin && newRol.permisos.push(permisos.adin);
    data.alro && newRol.permisos.push(permisos.alro);
    data.alth && newRol.permisos.push(permisos.alth);
    data.ieda && newRol.permisos.push(permisos.ieda);
    data.info && newRol.permisos.push(permisos.info);
    data.moin && newRol.permisos.push(permisos.moin);

    (!id ? postRol(newRol) : putRol(id, newRol))
      .then((response) => {
        if (response.status === 200) {
          actualizar();
          openAlert(
            "Se ha " + (id ? "modificado" : "introducido") + " el rol.",
            "success"
          );
          onClose();
        } else if (response.status === 402) {
          return response.json();
        } else {
          openAlert(
            "No se ha podido " + (id ? "modificar" : "introducir") + " el rol.",
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
              <h3>{!id ? "Crear " : "Modificar "}rol:</h3>
            </div>

            <Controller
              name="nombre"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextFieldCustom
                  color={"text"}
                  label={"Nombre: "}
                  className="tfDialogLong"
                  value={value}
                  onChange={onChange}
                  errors={errors.nombre?.message}
                />
              )}
            />
            <div className="dialog--oneColumn--cb">
              <div className="dialog--oneColumn--cb--column">
                <Controller
                  name="adin"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <FormControlLabel
                      control={<Checkbox checked={value || false} />}
                      label="Añadir incidencias."
                      onChange={onChange}
                      value={value}
                      disabled={!permisosUsuario.adin && true}
                    />
                  )}
                />
                <Controller
                  name="alth"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <FormControlLabel
                      control={<Checkbox checked={value || false} />}
                      label="Control total de tipos de hardware."
                      onChange={onChange}
                      value={value}
                      disabled={!permisosUsuario.alth && true}
                    />
                  )}
                />
                <Controller
                  name="info"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <FormControlLabel
                      control={<Checkbox checked={value || false} />}
                      label="Generacion de informes."
                      onChange={onChange}
                      value={value}
                      disabled={!permisosUsuario.info && true}
                    />
                  )}
                />
              </div>
              <div className="dialog--oneColumn--cb--column">
                <Controller
                  name="moin"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <FormControlLabel
                      control={<Checkbox checked={value || false} />}
                      label="Modificar y borrar incidencias."
                      onChange={onChange}
                      value={value}
                      disabled={!permisosUsuario.moin && true}
                    />
                  )}
                />
                <Controller
                  name="alro"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <FormControlLabel
                      control={<Checkbox checked={value || false} />}
                      label="Control total de roles."
                      onChange={onChange}
                      value={value}
                      disabled={!permisosUsuario.alro && true}
                    />
                  )}
                />

                <Controller
                  name="ieda"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <FormControlLabel
                      control={<Checkbox checked={value || false} />}
                      label="Importar y exportar datos."
                      onChange={onChange}
                      value={value}
                      disabled={!permisosUsuario.ieda && true}
                    />
                  )}
                />
              </div>
            </div>
          </div>
          <div className="dialog--oneColumn--buttons--container">
            <div className="dialog--oneColumn--buttons">
              <ButtonCustom
                label={"Aceptar"}
                color={"success"}
                onClick={handleSubmit(onSubmit)}
                icon={<CheckCircleOutlineIcon fontSize="small" />}
                disabled={getValues().nombre === "Administrador"}
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
