import { useState, useEffect } from "react";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import "./Tabla.css";
import { IconButton } from "@mui/material";

export default function Tabla({
  idLabel,
  datos,
  columnas,
  titulos,
  perm,
  editar,
  eliminar,
  rol,
  profesor,
}) {
  const [data, setData] = useState();

  useEffect(() => {
    setData(datos);
  }, [datos]);

  return (
    <>
      <div className="table-wrapper">
        <table className="fl-table">
          <thead>
            <tr>
              {titulos.map((titulo, index) => (
                <th key={"th" + index}>{titulo}</th>
              ))}
              {perm >= 2 && <th className="editar_eliminar">Opciones:</th>}
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((dato, index) => (
                <tr key={"tr" + index}>
                  {columnas.map((columna, index) => (
                    <td key={"td" + index}>{dato[columna]}</td>
                  ))}
                  {perm >= 2 && (
                    <td className="editar_eliminar">
                      <IconButton
                        onClick={() => editar(dato[idLabel])}
                        disabled={rol && dato.nombre === "Administrador"}
                      >
                        <EditOutlinedIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        onClick={() => eliminar(dato[idLabel])}
                        disabled={rol && dato.nombre === "Administrador"}
                      >
                        <DeleteOutlineOutlinedIcon fontSize="small" />
                      </IconButton>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={perm >= 2 ? titulos.length + 1 : titulos.length}
                  className="table--sinDatos"
                >
                  <div>No existen datos.</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
