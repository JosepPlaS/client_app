import { Button } from "@mui/material";

export default function ButtonCustom({ onClick, label, disabled, icon }) {
  return (
    <Button
      style={{ height: "30px" }}
      variant="contained"
      onClick={() => onClick()}
      disabled={disabled}
    >
      <div className="ButtonCustom">
        {icon && icon}
        <div className="ButtonCustom--texto">{label}</div>
      </div>
    </Button>
  );
}
