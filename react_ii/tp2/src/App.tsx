import { useState } from "react";
import type { Ticket } from "./types";
import Header from "./components/Header";
import SeatCard from "./components/SeatCard";
import TicketForm from "./components/TicketForm";
import TravelList from "./components/TravelList";
import "./App.css";

const TOTAL_SEATS = 40;

const initialTickets: Ticket[] = [
  {
    id: "1",
    passenger: "Ana Silva",
    seat: 5,
    origin: "São Paulo",
    destination: "Rio de Janeiro",
    date: "2026-03-15",
    status: "confirmado",
  },
  {
    id: "2",
    passenger: "Carlos Souza",
    seat: 12,
    origin: "Belo Horizonte",
    destination: "Brasília",
    date: "2026-03-18",
    status: "pendente",
  },
  {
    id: "3",
    passenger: "Maria Oliveira",
    seat: 22,
    origin: "Curitiba",
    destination: "Florianópolis",
    date: "2026-03-20",
    status: "confirmado",
  },
];

let nextId = 4;

function App() {
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const [editingTicket, setEditingTicket] = useState<Ticket | null>(null);
  const [filter, setFilter] = useState("");
  const [feedback, setFeedback] = useState("");

  const showFeedback = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(""), 3000);
  };

  const occupiedSeats = new Set(tickets.map((t) => t.seat));
  const locations = Array.from(new Set(tickets.flatMap((t) => [t.origin, t.destination])));

  const handleSubmit = (data: Omit<Ticket, "id" | "status">) => {
    if (editingTicket) {
      if (data.seat !== editingTicket.seat && occupiedSeats.has(data.seat)) {
        alert("Este assento já está ocupado!");
        return;
      }
      setTickets((prev) =>
        prev.map((t) =>
          t.id === editingTicket.id ? { ...t, ...data } : t
        )
      );
      setEditingTicket(null);
      showFeedback("Passagem atualizada com sucesso!");
    } else {
      if (occupiedSeats.has(data.seat)) {
        alert("Este assento já está ocupado!");
        return;
      }
      const newTicket: Ticket = {
        ...data,
        id: String(nextId++),
        status: "pendente",
      };
      setTickets((prev) => [...prev, newTicket]);
      showFeedback("Passagem reservada com sucesso!");
    }
  };

  const handleEdit = (ticket: Ticket) => {
    setEditingTicket(ticket);
  };

  const handleCancel = (id: string) => {
    setTickets((prev) => prev.filter((t) => t.id !== id));
    showFeedback("Passagem cancelada.");
  };

  return (
    <div className="app">
      <Header />

      {feedback && <div className="feedback">{feedback}</div>}

      <h2>Mapa de Assentos</h2>
      <div className="seat-map">
        {Array.from({ length: TOTAL_SEATS }, (_, i) => i + 1).map((seat) => (
          <SeatCard
            key={seat}
            seat={seat}
            status={occupiedSeats.has(seat) ? "ocupado" : "livre"}
          />
        ))}
      </div>

      <TicketForm onSubmit={handleSubmit} editingTicket={editingTicket} locations={locations} />

      <TravelList
        tickets={tickets}
        filter={filter}
        onFilterChange={setFilter}
        onEdit={handleEdit}
        onCancel={handleCancel}
        locations={locations}
      />
    </div>
  );
}

export default App;
