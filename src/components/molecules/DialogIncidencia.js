import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  getIncidencia,
  postIncidencia,
  putIncidencia,
} from "../../services/IncidenciaAPI";
import { getEstadoByCodigo } from "../../services/EstadoAPI";
import { Dialog, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import TextFieldCustom from "../atoms/TextFieldCustom";
import ButtonCustom from "../atoms/ButtonCustom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import AlertCustom from "../atoms/AlertCustom";
import moment from "moment";

import "./Dialog.css";
import { getProfesorDto } from "../../services/ProfesorAPI";
import { getTiposHardware } from "../../services/TipoHardwareAPI";
import SelectorCustom from "../atoms/SelectorCustom";

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
  const [tipo, setTipo] = useState(0);
  const [tiposHardware, setTiposHardware] = useState();

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
      aula: yup.string().required("Introduce el aula."),
      fecha_incidencia: yup.date().required("Introduce una fecha."),
      tipo_incidencia: yup
        .number()
        .required("Selecciona el tipo de incidencia."),
      descripcion: yup
        .string()
        .max(250, "No puede contener mas de 250 caracteres.")
        .required("Introduce una descripción."),
      modelo: yup.string(),
      numero_serie: yup.string(),
      tipo_hardware: yup.object().nullable(),
      aplicacion: yup.string(),
      sistema_operativo: yup.string(),
    })
    .required();

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      aula: "",
      fecha_incidencia: moment(Date.now()).format("YYYY-MM-DD"),
      tipo_incidencia: 0,
      descripcion: "",
      modelo: "",
      numero_serie: "",
      tipo_hardware: null,
      aplicacion: "",
      sistema_operativo: "",
    },
    resolver: yupResolver(schema),
  });

  function adaptarIncidencia(incidencia) {
    if (incidencia.incidencia_hw) {
      incidencia.modelo = incidencia.incidencia_hw.modelo;
      incidencia.numero_serie = incidencia.incidencia_hw.numero_serie;
      incidencia.tipo_hardware = incidencia.incidencia_hw.tipo_hardware;
    } else if (incidencia.incidencia_sw) {
      incidencia.aplicacion = incidencia.incidencia_sw.aplicacion;
      incidencia.sistema_operativo = incidencia.incidencia_sw.sistema_operativo;
    }
    return incidencia;
  }

  useEffect(() => {
    setTipo(0);
    reset({
      aula: "",
      fecha_incidencia: moment(Date.now()).format("YYYY-MM-DD"),
      tipo_incidencia: 0,
      descripcion: "",
      modelo: "",
      numero_serie: "",
      tipo_hardware: null,
      aplicacion: "",
      sistema_operativo: "",
    });
    if (open) {
      getTiposHardware()
        .then((response) => response.json())
        .then((json) => json && setTiposHardware(json));
    }
    if (id && open) {
      if (incidencia) {
        reset(adaptarIncidencia(incidencia));
        setTipo(incidencia.tipo_incidencia);
      } else {
        getIncidencia(id)
          .then((response) => response.json())
          .then((json) => {
            if (json) {
              reset(adaptarIncidencia(json));
              setTipo(json.tipo_incidencia);
            }
          });
      }
    }
  }, [id, onClose, open]);

  const onSubmit = async (data) => {
    console.log(data);

    let finalObj = {
      aula: data.aula,
      fecha_incidencia: data.fecha_incidencia,
      tipo_incidencia: data.tipo_incidencia,
      descripcion: data.descripcion,
    };

    if (data.tipo_incidencia === 1) {
      finalObj.incidencia_hw = {
        modelo: data.modelo,
        numero_serie: data.numero_serie,
        tipo_hardware: data.tipo_hardware,
      };
    } else if (data.tipo_incidencia === 2) {
      finalObj.incidencia_sw = {
        aplicacion: data.aplicacion,
        sistema_operativo: data.sistema_operativo,
      };
    }
    if (id) {
      const user = JSON.parse(sessionStorage.getItem("incidenciasUser"));

      finalObj.historial =
        data.historial +
        "{UwU}" +
        moment(Date.now()).format("DD-MM-YY") +
        " Modificada por: " +
        user.email;

      putIncidencia(id, finalObj)
        .then((response) => {
          if (response.status === 200) {
            actualizar();
            onClose();
          } else if (response.status === 402) {
            return response.json();
          } else {
            openAlert("No se ha podido modificar la incidencia.", "error");
          }
        })
        .then((json) => json && openAlert(json.message, "error"));
    } else {
      finalObj.fecha_introduccion = moment(Date.now()).format("YYYY-MM-DD");

      finalObj.estado = await getEstadoByCodigo("Reportada")
        .then((response) => response.json())
        .then((json) => json);

      const user = JSON.parse(sessionStorage.getItem("incidenciasUser"));

      finalObj.reportador = await getProfesorDto(user.id)
        .then((response) => response.json())
        .then((json) => json);

      finalObj.historial =
        moment(Date.now()).format("DD-MM-YY") + " Creada por: " + user.email;

      postIncidencia(finalObj)
        .then((response) => {
          if (response.status === 200) {
            actualizar();
            onClose();
          } else if (response.status === 402) {
            return response.json();
          } else {
            openAlert("No se ha podido introducir la incidencia.", "error");
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
              <h3>{id ? "Modificar" : "Crear"} incidencia:</h3>
            </div>
            <div className="dialog--twoColumn--row">
              <Controller
                name="aula"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextFieldCustom
                    color={"text"}
                    label={"Aula: "}
                    value={value}
                    onChange={onChange}
                    errors={errors.aula?.message}
                  />
                )}
              />
              <Controller
                name="fecha_incidencia"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextFieldCustom
                    className="textFieldCustom--fullSize"
                    color={"text"}
                    label={"Fecha incidencia: "}
                    value={value}
                    type={"date"}
                    onChange={onChange}
                    errors={errors.fecha_incidencia?.message}
                  />
                )}
              />
            </div>
            <div className="dialog--twoColumn--row">
              <Controller
                name="descripcion"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextFieldCustom
                    className="textFieldCustom--fullSize"
                    color={"text"}
                    label={"Descripción: "}
                    value={value}
                    onChange={onChange}
                    multiLine={true}
                    errors={errors.descripcion?.message}
                  />
                )}
              />
            </div>
            <div className="dialog--twoColumn--row">
              <Controller
                name="tipo_incidencia"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={value}
                    onChange={(event, option) => {
                      onChange(option);
                      setValue("modelo", "");
                      setValue("numero_serie", "");
                      setValue("sistema_operativo", "");
                      setValue("tipo_hardware", null);
                      setValue("aplicacion", "");
                      setTipo(parseInt(option));
                    }}
                  >
                    <FormControlLabel
                      value={1}
                      control={<Radio />}
                      label="Hardware"
                    />
                    <FormControlLabel
                      value={2}
                      control={<Radio />}
                      label="Software"
                    />
                    <FormControlLabel
                      value={3}
                      control={<Radio />}
                      label="Internet"
                    />
                    <FormControlLabel
                      value={0}
                      control={<Radio />}
                      label="Otro"
                    />
                  </RadioGroup>
                )}
              />
            </div>
            <hr />
            {tipo === 1 ? (
              <>
                <div className="dialog--twoColumn--row">
                  <Controller
                    name="modelo"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TextFieldCustom
                        color={"text"}
                        label={"Modelo: "}
                        value={value}
                        onChange={onChange}
                        errors={errors.modelo?.message}
                      />
                    )}
                  />
                  <Controller
                    name="numero_serie"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TextFieldCustom
                        color={"text"}
                        label={"Numero de serie: "}
                        value={value}
                        onChange={onChange}
                        errors={errors.numero_serie?.message}
                      />
                    )}
                  />
                </div>
                <div className="dialog--twoColumn--row">
                  <Controller
                    name="tipo_hardware"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <SelectorCustom
                        color={"text"}
                        label={"Tipo de hardware: "}
                        datos={tiposHardware}
                        optionLabel={(option) => option.nombre}
                        value={value || null}
                        onChange={(event, option) => {
                          onChange(option);
                        }}
                        errors={errors.tipo_hardware?.message}
                      />
                    )}
                  />
                </div>
              </>
            ) : (
              tipo === 2 && (
                <div className="dialog--twoColumn--row">
                  <Controller
                    name="aplicacion"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TextFieldCustom
                        color={"text"}
                        label={"Aplicación: "}
                        value={value}
                        onChange={onChange}
                        errors={errors.aplicacion?.message}
                      />
                    )}
                  />
                  <Controller
                    name="sistema_operativo"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TextFieldCustom
                        color={"text"}
                        label={"Sistema operativo: "}
                        value={value}
                        onChange={onChange}
                        errors={errors.sistema_operativo?.message}
                      />
                    )}
                  />
                </div>
              )
            )}
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
