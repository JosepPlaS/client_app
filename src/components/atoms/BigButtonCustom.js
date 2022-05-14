export default function BigButtonCustom({ icon, text, onClick }) {
  return (
    <div className="bigButton--container" onClick={onClick}>
      {icon && icon}
      <div className="bigButton--text">{text && text}</div>
    </div>
  );
}
