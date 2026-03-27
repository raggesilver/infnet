import { NavLink } from "react-router-dom";

type NavBarProps = {
  isAuth: boolean;
  onToggleAuth: () => void;
};

function NavBar({ isAuth, onToggleAuth }: NavBarProps) {
  return (
    <nav>
      <NavLink to="/">Início</NavLink>
      <NavLink to="/reservar">Nova Reserva</NavLink>
      <NavLink to="/painel">Painel</NavLink>
      <button onClick={onToggleAuth} style={{ marginLeft: "auto" }}>
        {isAuth ? "Logout" : "Login"}
      </button>
    </nav>
  );
}

export default NavBar;
