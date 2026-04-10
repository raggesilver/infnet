import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Vehicle } from "../types";

type VehicleRegisterProps = {
  onAddVehicle: (vehicle: Vehicle) => void;
};

export default function VehicleRegister({ onAddVehicle }: VehicleRegisterProps) {
  const navigate = useNavigate();
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [plate, setPlate] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!brand.trim() || !model.trim() || !plate.trim()) {
      alert("Preencha todos os campos.");
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const newVehicle: Vehicle = {
        id: crypto.randomUUID(),
        brand: brand.trim(),
        model: model.trim(),
        plate: plate.trim().toUpperCase(),
        status: "disponivel",
      };

      onAddVehicle(newVehicle);
      setIsProcessing(false);
      navigate("/frota");
    }, 2000);
  };

  return (
    <div>
      <h2>Cadastrar Novo Veiculo</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Marca:
            <input
              value={brand}
              onChange={(event) => setBrand(event.target.value)}
              disabled={isProcessing}
            />
          </label>
        </div>
        <div>
          <label>
            Modelo:
            <input
              value={model}
              onChange={(event) => setModel(event.target.value)}
              disabled={isProcessing}
            />
          </label>
        </div>
        <div>
          <label>
            Placa:
            <input
              value={plate}
              onChange={(event) => setPlate(event.target.value)}
              disabled={isProcessing}
            />
          </label>
        </div>
        <button type="submit" disabled={isProcessing}>
          {isProcessing ? "Processando..." : "Cadastrar Veiculo"}
        </button>
      </form>
    </div>
  );
}
