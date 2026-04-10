import { Link, NavLink, Outlet } from "react-router-dom";
import { Vehicle } from "../types";

type FleetDashboardProps = {
  vehicles: Vehicle[];
  onRemoveVehicle: (id: string) => void;
  onToggleStatus: (id: string) => void;
};

export default function FleetDashboard({
  vehicles,
  onRemoveVehicle,
  onToggleStatus,
}: FleetDashboardProps) {
  return (
    <div>
      <h2>Painel da Frota</h2>
      <nav style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <NavLink to="/frota/disponiveis">Disponiveis</NavLink>
        <NavLink to="/frota/alugados">Alugados</NavLink>
      </nav>
      <Outlet
        context={{ vehicles, onRemoveVehicle, onToggleStatus }}
      />
    </div>
  );
}

type VehicleListProps = {
  vehicles: Vehicle[];
  onRemoveVehicle: (id: string) => void;
  onToggleStatus: (id: string) => void;
};

export function VehicleList({
  vehicles,
  onRemoveVehicle,
  onToggleStatus,
}: VehicleListProps) {
  if (vehicles.length === 0) {
    return <p>Nenhum veiculo encontrado.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Marca</th>
          <th>Modelo</th>
          <th>Placa</th>
          <th>Status</th>
          <th>Acoes</th>
        </tr>
      </thead>
      <tbody>
        {vehicles.map((vehicle) => (
          <tr key={vehicle.id}>
            <td>{vehicle.brand}</td>
            <td>{vehicle.model}</td>
            <td>{vehicle.plate}</td>
            <td>{vehicle.status === "disponivel" ? "Disponivel" : "Alugado"}</td>
            <td>
              <Link to={`/veiculo/${vehicle.id}`}>Ver Detalhes</Link>{" "}
              <button onClick={() => onToggleStatus(vehicle.id)}>
                {vehicle.status === "disponivel" ? "Alugar" : "Devolver"}
              </button>{" "}
              <button onClick={() => onRemoveVehicle(vehicle.id)}>
                Remover
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
