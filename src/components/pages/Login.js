import { useEffect, useState } from "react";
import LoginIcon from "@mui/icons-material/Login";

import TextFieldCustom from "../atoms/TextFieldCustom";
import ButtonCustom from "../atoms/ButtonCustom";
import logo from "../img/logo.png";

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");

  return (
    <div className="login">
      <div className="loginCard">
        <div className="loginPicture">
          <img src={logo} alt="INCIDENCIAS" />
        </div>
        <div className="loginTf">
          <TextFieldCustom
            label="Usuario: "
            color="grey"
            value={usuario}
            onChange={(evnt) => setUsuario(evnt.target.value)}
          />
          <TextFieldCustom
            label="Contraseña: "
            color="grey"
            value={contrasena}
            onChange={(evnt) => setContrasena(evnt.target.value)}
            password={true}
          />
        </div>
        <div className="loginBotones">
          <ButtonCustom
            variant="contained"
            color="error"
            label="Login"
            onClick={() =>
              console.log("User: " + usuario + " - Pass: " + contrasena)
            }
            icon={<LoginIcon fontSize="small" />}
          />
        </div>
      </div>
    </div>
  );
}
