import { NavLink } from "react-router-dom";

type NavBarProps = {
  isLogged: boolean;
  onToggleLogin: () => void;
};

export default function NavBar({ isLogged, onToggleLogin }: NavBarProps) {
  return (
    <nav style={{ display: "flex", gap: "1rem", alignItems: "center", padding: "0.5rem 1rem" }}>
      <NavLink to="/">Inicio</NavLink>
      <NavLink to="/cadastrar">Novo Veiculo</NavLink>
      <NavLink to="/frota">Frota</NavLink>
      <button onClick={onToggleLogin}>
        {isLogged ? "Sair" : "Entrar"}
      </button>
    </nav>
  );
}
