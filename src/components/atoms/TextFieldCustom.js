import { TextField } from "@mui/material";

export default function TextFieldCustom({
  label,
  value,
  onChange,
  disabled,
  readOnly,
  multiLine,
  color,
  errors,
}) {
  return (
    <div className="texFieldCustom">
      <TextField
        label={label}
        variant="outlined"
        value={value}
        onChange={onChange}
        disabled={disabled ? disabled : undefined}
        InputProps={{
          readOnly: readOnly,
        }}
        multiline={multiLine ? multiLine : undefined}
        color={color ? color : readOnly ? "secondary" : "primary"}
      />
      {errors && <div className="texFieldCustom--error">{errors}</div>}
    </div>
  );
}
