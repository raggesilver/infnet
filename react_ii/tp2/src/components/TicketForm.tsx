import { useState, useEffect } from "react";
import type { Ticket } from "../types";

type TicketFormProps = {
  onSubmit: (data: Omit<Ticket, "id" | "status">) => void;
  editingTicket: Ticket | null;
  locations: string[];
};

function TicketForm({ onSubmit, editingTicket, locations }: TicketFormProps) {
  const [passenger, setPassenger] = useState("");
  const [seat, setSeat] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (editingTicket) {
      setPassenger(editingTicket.passenger);
      setSeat(String(editingTicket.seat));
      setOrigin(editingTicket.origin);
      setDestination(editingTicket.destination);
      setDate(editingTicket.date);
    }
  }, [editingTicket]);

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

    onSubmit({ passenger, seat: seatNum, origin, destination, date });

    setPassenger("");
    setSeat("");
    setOrigin("");
    setDestination("");
    setDate("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <h2>{editingTicket ? "Editar Passagem" : "Nova Passagem"}</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 400 }}>
        <input
          placeholder="Nome do passageiro"
          value={passenger}
          onChange={(e) => setPassenger(e.target.value)}
        />
        <input
          type="number"
          placeholder="Assento (1-40)"
          value={seat}
          min={1}
          max={40}
          onChange={(e) => setSeat(e.target.value)}
        />
        <input
          placeholder="Origem"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          list="locations-origin"
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
        />
        <button type="submit" style={{ padding: "8px", cursor: "pointer" }}>
          {editingTicket ? "Salvar Alterações" : "Reservar"}
        </button>
      </div>
    </form>
  );
}

export default TicketForm;
