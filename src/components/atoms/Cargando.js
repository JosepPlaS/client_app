import { CircularProgress } from "@mui/material";

export default function Cargando({ texto }) {
  return (
    <div className="cargando">
      <CircularProgress disableShrink color="secondary" /> {texto}
    </div>
  );
}
