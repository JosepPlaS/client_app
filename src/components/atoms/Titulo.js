export default function Titulo({ icono, texto }) {
  return (
    <>
      {icono}
      <div className="titulo--texto">{texto}</div>
    </>
  );
}
