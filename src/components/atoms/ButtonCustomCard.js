import { Button } from "@mui/material";

export default function ButtonCustomCard({
  onClick,
  label,
  disabled,
  icon,
  color,
}) {
  return (
    <Button
      style={{ height: "20px" }}
      variant="contained"
      onClick={() => onClick()}
      disabled={disabled}
      color={color || "primary"}
    >
      <div className="ButtonCustom">
        {icon && icon}
        <div
          className={
            icon ? "ButtonCustom--texto--icono" : "ButtonCustom--texto"
          }
        >
          {label}
        </div>
      </div>
    </Button>
  );
}
