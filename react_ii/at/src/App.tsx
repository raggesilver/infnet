import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import RootLayout from "./layouts/RootLayout";
import FleetDashboard, { VehicleList } from "./pages/FleetDashboard";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import VehicleDetails from "./pages/VehicleDetails";
import VehicleRegister from "./pages/VehicleRegister";
import { Vehicle } from "./types";

const STORAGE_KEY = "driverent-vehicles";

function loadVehicles(): Vehicle[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(loadVehicles);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(vehicles));
  }, [vehicles]);

  const addVehicle = (vehicle: Vehicle) => {
    setVehicles((prev) => [...prev, vehicle]);
  };

  const removeVehicle = (id: string) => {
    setVehicles((prev) => prev.filter((v) => v.id !== id));
  };

  const toggleStatus = (id: string) => {
    setVehicles((prev) =>
      prev.map((v) =>
        v.id === id
          ? { ...v, status: v.status === "disponivel" ? "alugado" : "disponivel" }
          : v,
      ),
    );
  };

  const availableVehicles = vehicles.filter((v) => v.status === "disponivel");
  const rentedVehicles = vehicles.filter((v) => v.status === "alugado");

  return (
    <Routes>
      <Route
        element={
          <RootLayout
            isLogged={isLogged}
            onToggleLogin={() => setIsLogged((prev) => !prev)}
          />
        }
      >
        <Route path="/" element={<Home />} />
        <Route
          path="/cadastrar"
          element={<VehicleRegister onAddVehicle={addVehicle} />}
        />
        <Route element={<ProtectedRoute isLogged={isLogged} />}>
          <Route
            path="/frota"
            element={
              <FleetDashboard
                vehicles={vehicles}
                onRemoveVehicle={removeVehicle}
                onToggleStatus={toggleStatus}
              />
            }
          >
            <Route
              path="disponiveis"
              element={
                <VehicleList
                  vehicles={availableVehicles}
                  onRemoveVehicle={removeVehicle}
                  onToggleStatus={toggleStatus}
                />
              }
            />
            <Route
              path="alugados"
              element={
                <VehicleList
                  vehicles={rentedVehicles}
                  onRemoveVehicle={removeVehicle}
                  onToggleStatus={toggleStatus}
                />
              }
            />
          </Route>
        </Route>
        <Route
          path="/veiculo/:id"
          element={<VehicleDetails vehicles={vehicles} />}
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
