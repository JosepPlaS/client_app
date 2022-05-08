import { TextField } from "@mui/material";

export default function TextFieldCustom({
  label,
  value,
  onChange,
  disabled,
  readOnly,
  multiLine,
}) {
  return (
    <div className="texFieldCustom">
      <TextField
        style={{ height: "30px" }}
        label={label}
        variant="outlined"
        value={value}
        onChange={onChange}
        disabled={disabled ? disabled : undefined}
        InputProps={{
          readOnly: readOnly,
        }}
        multiline={multiLine ? multiLine : undefined}
        color={readOnly ? "secondary" : "primary"}
      />
    </div>
  );
}
