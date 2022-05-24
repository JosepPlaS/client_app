import { useState } from "react";
import LoginIcon from "@mui/icons-material/Login";

import TextFieldCustom from "../atoms/TextFieldCustom";
import ButtonCustom from "../atoms/ButtonCustom";
import logo from "../img/logo.png";

export default function Login({ openAlert }) {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");

  function login() {
    const request = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: usuario, contrasena: contrasena }),
    };
    fetch("/api/login", request)
      .then((response) =>
        response.status === 200 || response.status === 401
          ? response.json()
          : openAlert("No se puede conectar con la base de datos", "error")
      )
      .then((json) => {
        if (json) {
          if (json.id) {
            sessionStorage.setItem("incidenciasUser", JSON.stringify(json));
            window.location.replace("");
          } else {
            openAlert(json.message, "error");
          }
        }
      });
  }

  return (
    <div className="login">
      <div className="loginCard">
        <div className="loginPicture">
          <img src={logo} alt="INCIDENCIAS" />
        </div>
        <div className="loginTf">
          <TextFieldCustom
            label="Email: "
            color="grey"
            value={usuario}
            onChange={(evnt) => setUsuario(evnt.target.value)}
          />
          <TextFieldCustom
            label="Contraseña: "
            color="grey"
            value={contrasena}
            onChange={(evnt) => setContrasena(evnt.target.value)}
            type={"password"}
          />
        </div>
        <div className="loginBotones">
          <ButtonCustom
            variant="contained"
            color="error"
            label="Login"
            onClick={() => login()}
            icon={<LoginIcon fontSize="small" />}
          />
        </div>
      </div>
    </div>
  );
}
