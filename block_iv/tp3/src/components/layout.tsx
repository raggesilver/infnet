import { NavLink, Outlet } from "react-router";

export function Layout() {
  return (
    <>
      <header className="nav-header">
        <div className="nav-container">
          <span className="nav-brand">EventUp</span>
          <nav className="flex gap-4">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `nav-link ${isActive ? "nav-link-active" : ""}`
              }
            >
              Eventos
            </NavLink>
            <NavLink
              to="/criar"
              className={({ isActive }) =>
                `nav-link ${isActive ? "nav-link-active" : ""}`
              }
            >
              Criar Evento
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="main-content">
        <Outlet />
      </main>
    </>
  );
}
