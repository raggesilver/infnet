export type VehicleStatus = "disponivel" | "alugado";

export type Vehicle = {
  id: string;
  brand: string;
  model: string;
  plate: string;
  status: VehicleStatus;
};
