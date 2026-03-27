import { NavLink, Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <div>
      <h2>Painel Administrativo</h2>
      <div className="dashboard-nav">
        <NavLink to="/painel/ativas">Ativas</NavLink>
        <NavLink to="/painel/canceladas">Canceladas</NavLink>
      </div>
      <Outlet />
    </div>
  );
}

export default Dashboard;
