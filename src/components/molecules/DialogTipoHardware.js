import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { getTipoHardware } from "../../services/TipoHardwareAPI";
import { Dialog } from "@mui/material";
import TextFieldCustom from "../atoms/TextFieldCustom";
import ButtonCustom from "../atoms/ButtonCustom";

export default function DialogTipoHardware({ open, onClose, actualizar, id }) {
  const schema = yup
    .object({
      nombre: yup.string().required("Debes de introducir un nombre."),
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
    if (id !== 0) {
      getTipoHardware(id)
        .then((response) => response.json())
        .then((json) => reset(json));
    } else {
      reset({ nombre: "" });
    }
  }, [id, reset, onClose]);

  const onSubmit = () => {};

  return (
    <Dialog open={open} onClose={onClose} onSubmit={handleSubmit(onSubmit)}>
      <form className="dialog--one">
        <div className="dialog--one--column">
          <div className="dialog--one--title">
            <h3>{id === 0 ? "Crear " : "Modificar "}pieza:</h3>
          </div>
          <Controller
            name="nombre"
            control={control}
            render={({ field: { onChange, value } }) => <TextFieldCustom />}
          />
        </div>
        <div className="dialog--one--buttons">
          <ButtonCustom />
          <ButtonCustom
            onClick={onClose}
            variant="contained"
            color="error"
            label="Cancelar"
          />
        </div>
      </form>
    </Dialog>
  );
}
