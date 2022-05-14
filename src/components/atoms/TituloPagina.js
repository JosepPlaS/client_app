export default function TituloPagina({ icon, text }) {
  return (
    <div className="tituloPagina--container">
      {icon && icon}
      <div className="tituloPagina--text">{text && text}</div>
    </div>
  );
}
