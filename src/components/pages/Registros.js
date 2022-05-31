import { useContext, useEffect, useState } from "react";
import SsidChartIcon from "@mui/icons-material/SsidChart";
import SearchIcon from "@mui/icons-material/Search";

import AppContext from "../../AppContext";
import Titulo from "../atoms/Titulo";
import { getEstadisticas } from "../../services/IncidenciaAPI";
import { InputAdornment, OutlinedInput, Paper } from "@mui/material";
import ButtonCustom from "../atoms/ButtonCustom";
import Tabla from "../molecules/Tabla";
import TituloPagina from "../atoms/TituloPagina";

import AssignmentIcon from "@mui/icons-material/Assignment"; // INCIDENCIA
import DesktopMacIcon from "@mui/icons-material/DesktopMac";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

export default function MenuIncidencias({ openAlert }) {
  const { setGlobal } = useContext(AppContext);
  let [anyo, setAnyo] = useState(new Date().getFullYear());
  const [estadisticas, setEstadisticas] = useState();

  const titEstado = [
    "Pendiente: ",
    "Solucionada: ",
    "Solución inviable: ",
    "Total: ",
  ];
  const labEstado = ["pendiente", "solucionadas", "noSolucionadas", "total"];

  const titTipo = [
    "Hardware: ",
    "Software: ",
    "Internet: ",
    "Otros:",
    "Total: ",
  ];
  const labTipo = ["hardware", "software", "internet", "otros", "total"];

  const titMeses = [
    "Enero: ",
    "Febrero: ",
    "Marzo: ",
    "Abril:",
    "Mayo:",
    "Junio:",
    "Julio:",
    "Agosto:",
    "Septiembre:",
    "Octubre:",
    "Nobiembre:",
    "Diciembre:",
    "Total: ",
  ];
  const labMeses = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
    "total",
  ];

  const titSai = ["Reportadas al SAI: ", "No reportadas al SAI: ", "Total: "];
  const labSai = ["sai", "noSai", "total"];

  const titTiempo = ["Horas invertidas: ", "Días tardados: "];
  const labTiempo = ["tiempo_invertido", "tiempo_dias"];

  useEffect(() => {
    setGlobal((old) => ({
      ...old,
      pageTitle: (
        <Titulo icono={<SsidChartIcon fontSize="small" />} texto="Registros" />
      ),
    }));
  }, [setGlobal]);

  function search() {
    getEstadisticas(anyo)
      .then((response) => response.json())
      .then((json) => setEstadisticas(json));
  }

  console.log(estadisticas);

  return (
    <div className="pagina">
      <br />
      <div className="BuscarAnadir--contenedor">
        <div className="BuscarAnadir--buscador">
          <Paper>
            <OutlinedInput
              style={{ height: "30px" }}
              onChange={(evn) => setAnyo(evn.target.value)}
              type="number"
              endAdornment={
                <InputAdornment position="end">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              }
              value={anyo}
            />
          </Paper>
        </div>
        <div className="BuscarAnadir--botones">
          <div className="BuscarAnadir--boton">
            <ButtonCustom
              onClick={search}
              icon={<SearchIcon fontSize="small" />}
              label="Buscar"
            />
          </div>
        </div>
      </div>
      <TituloPagina
        icon={<AutorenewIcon fontSize="large" />}
        text={"Registros de estado:"}
      />
      <Tabla
        idLabel={"id"}
        titulos={titEstado}
        columnas={labEstado}
        perm={0}
        datos={estadisticas}
      />
      <TituloPagina
        icon={<AssignmentIcon fontSize="large" />}
        text={"Registros de tipo:"}
      />
      <Tabla
        idLabel={"id"}
        titulos={titTipo}
        columnas={labTipo}
        perm={0}
        datos={estadisticas}
      />
      <TituloPagina
        icon={<CalendarMonthIcon fontSize="large" />}
        text={"Registros de mes:"}
      />
      <Tabla
        idLabel={"id"}
        titulos={titMeses}
        columnas={labMeses}
        perm={0}
        datos={estadisticas}
      />
      <TituloPagina
        icon={<DesktopMacIcon fontSize="large" />}
        text={"Registros de asignaciones al SAI:"}
      />
      <Tabla
        idLabel={"id"}
        titulos={titSai}
        columnas={labSai}
        perm={0}
        datos={estadisticas}
      />
      <TituloPagina
        icon={<AccessTimeOutlinedIcon fontSize="large" />}
        text={"Registros de media temporal:"}
      />
      <Tabla
        idLabel={"id"}
        titulos={titTiempo}
        columnas={labTiempo}
        perm={0}
        datos={estadisticas}
      />
    </div>
  );
}
