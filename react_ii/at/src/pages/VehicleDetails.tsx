import { useNavigate, useParams } from "react-router-dom";
import { Vehicle } from "../types";

type VehicleDetailsProps = {
  vehicles: Vehicle[];
};

export default function VehicleDetails({ vehicles }: VehicleDetailsProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const vehicle = vehicles.find((v) => v.id === id);

  if (!vehicle) {
    return (
      <div>
        <p>Visualizando dados do veiculo placa/ID: {id}</p>
        <p>Veiculo nao encontrado.</p>
        <button onClick={() => navigate(-1)}>Voltar para Lista</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Detalhes do Veiculo</h2>
      <p>Visualizando dados do veiculo placa/ID: {vehicle.plate}</p>
      <ul>
        <li><strong>ID:</strong> {vehicle.id}</li>
        <li><strong>Marca:</strong> {vehicle.brand}</li>
        <li><strong>Modelo:</strong> {vehicle.model}</li>
        <li><strong>Placa:</strong> {vehicle.plate}</li>
        <li><strong>Status:</strong> {vehicle.status === "disponivel" ? "Disponivel" : "Alugado"}</li>
      </ul>
      <button onClick={() => navigate(-1)}>Voltar para Lista</button>
    </div>
  );
}
