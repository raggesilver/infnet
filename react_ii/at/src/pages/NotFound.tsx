import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div>
      <h2>404</h2>
      <p>Veiculo ou pagina nao encontrados</p>
      <Link to="/">Voltar ao Inicio</Link>
    </div>
  );
}
