import { useState } from "react";
import type { Ticket } from "../types";

type TicketFormProps = {
  onSubmit: (data: Omit<Ticket, "id" | "status">) => void;
  locations: string[];
};

function TicketForm({ onSubmit, locations }: TicketFormProps) {
  const [passenger, setPassenger] = useState("");
  const [seat, setSeat] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const seatNum = Number(seat);
    if (!passenger || !seat || !origin || !destination || !date) {
      alert("Preencha todos os campos.");
      return;
    }
    if (seatNum < 1 || seatNum > 40) {
      alert("O assento deve ser entre 1 e 40.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      onSubmit({ passenger, seat: seatNum, origin, destination, date });
      setIsLoading(false);
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <h2>Nova Passagem</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          maxWidth: 400,
        }}
      >
        <input
          placeholder="Nome do passageiro"
          value={passenger}
          onChange={(e) => setPassenger(e.target.value)}
          disabled={isLoading}
        />
        <input
          type="number"
          placeholder="Assento (1-40)"
          value={seat}
          min={1}
          max={40}
          onChange={(e) => setSeat(e.target.value)}
          disabled={isLoading}
        />
        <input
          placeholder="Origem"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          list="locations-origin"
          disabled={isLoading}
        />
        <datalist id="locations-origin">
          {locations.map((l) => (
            <option key={l} value={l} />
          ))}
        </datalist>
        <input
          placeholder="Destino"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          list="locations-destination"
          disabled={isLoading}
        />
        <datalist id="locations-destination">
          {locations.map((l) => (
            <option key={l} value={l} />
          ))}
        </datalist>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          disabled={isLoading}
        />
        <button
          type="submit"
          style={{ padding: "8px", cursor: "pointer" }}
          disabled={isLoading}
        >
          {isLoading ? "A processar..." : "Reservar Assento"}
        </button>
      </div>
    </form>
  );
}

export default TicketForm;
