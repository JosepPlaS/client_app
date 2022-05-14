import { Autocomplete, TextField } from "@mui/material";

export default function SelectorCustom({
  className,
  datos,
  optionLabel,
  value,
  onChange,
  label,
  clear,
  color,
  errors,
}) {
  return (
    <div className="texFieldCustom">
      <Autocomplete
        color={color}
        className={className || ""}
        disablePortal={false}
        disableClearable={!clear}
        options={datos || []}
        getOptionLabel={optionLabel}
        value={value}
        onChange={onChange}
        renderInput={(params) => <TextField {...params} label={label} />}
        onClear
      />
      {errors && <div className="texFieldCustom--error">{errors}</div>}
    </div>
  );
}
