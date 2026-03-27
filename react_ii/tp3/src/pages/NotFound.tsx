import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div>
      <h2>Página não encontrada</h2>
      <Link to="/">Voltar ao Início</Link>
    </div>
  );
}

export default NotFound;
