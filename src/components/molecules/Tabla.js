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
}) {
  const [data, setData] = useState();

  useEffect(() => {
    setData(datos);
  }, [datos]);

  return (
    <>
      {data && data.length > 0 ? (
        <div className="table-wrapper">
          <table className="fl-table">
            <thead>
              <tr>
                {titulos.map((titulo, index) => (
                  <th key={"th" + index}>{titulo}</th>
                ))}
                {perm === 2 && <th className="editar_eliminar">Opciones:</th>}
              </tr>
            </thead>
            <tbody>
              {data.map((dato, index) => (
                <tr key={"tr" + index}>
                  {columnas.map((columna, index) => (
                    <td key={"td" + index}>{dato[columna]}</td>
                  ))}
                  {perm === 2 && (
                    <td className="editar_eliminar">
                      <IconButton onClick={() => editar(dato[idLabel])}>
                        <EditOutlinedIcon fontSize="small" />
                      </IconButton>
                      <IconButton onClick={() => eliminar(dato[idLabel])}>
                        <DeleteOutlineOutlinedIcon fontSize="small" />
                      </IconButton>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="sin_datos">No existen datos.</div>
      )}
    </>
  );
}
