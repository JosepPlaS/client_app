export default function BigButtonCustom({ icon, text, onClick, disabled }) {
  return (
    <div
      className={
        !disabled ? "bigButton--container" : "bigButton--container--disabled"
      }
      onClick={!disabled && onClick}
    >
      {icon && icon}
      <div className="bigButton--text">{text && text}</div>
    </div>
  );
}
