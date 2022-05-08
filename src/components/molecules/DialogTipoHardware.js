import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  getTipoHardware,
  postTipoHardware,
  putTipoHardware,
} from "../../services/TipoHardwareAPI";
import { Dialog } from "@mui/material";
import TextFieldCustom from "../atoms/TextFieldCustom";
import ButtonCustom from "../atoms/ButtonCustom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

import "./Dialog.css";

export default function DialogTipoHardware({ open, onClose, actualizar, id }) {
  const schema = yup
    .object({
      nombre: yup.string().required("Introduce un nombre."),
    })
    .required();

  const {
    control,
    handleSubmit,
    setValue,
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

  useEffect(() => {
    if (id) {
      getTipoHardware(id)
        .then((response) => response.json())
        .then((json) => reset(json));
    } else {
      reset({ nombre: "" });
    }
  }, [id, reset, onClose]);

  const onSubmit = (data) => {
    if (!id) {
      postTipoHardware(data);
    } else {
      putTipoHardware(id, data);
    }
    actualizar();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <form className="dialog">
        <div className="dialog--oneColumn">
          <div className="dialog--oneColumn--title">
            <h3>{!id ? "Crear " : "Modificar "}tipo de hardware:</h3>
          </div>
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
  );
}
