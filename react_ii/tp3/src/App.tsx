import { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import type { Ticket } from "./types";
import RootLayout from "./components/RootLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import TravelList from "./components/TravelList";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import Dashboard from "./pages/Dashboard";
import TicketDetails from "./pages/TicketDetails";
import NotFound from "./pages/NotFound";
import "./App.css";

const STORAGE_KEY = "expresso-horizon-tickets";

const defaultTickets: Ticket[] = [
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

function loadTickets(): Ticket[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return defaultTickets;
    }
  }
  return defaultTickets;
}

let nextId = 4;

function App() {
  const [tickets, setTickets] = useState<Ticket[]>(loadTickets);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
  }, [tickets]);

  const locations = Array.from(
    new Set(tickets.flatMap((t) => [t.origin, t.destination])),
  );

  const handleAddTicket = (data: Omit<Ticket, "id" | "status">) => {
    const newTicket: Ticket = {
      ...data,
      id: String(nextId++),
      status: "pendente",
    };
    setTickets((prev) => [...prev, newTicket]);
  };

  const handleCancel = (id: string) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status: "cancelado" as const } : t,
      ),
    );
  };

  const activeTickets = tickets.filter((t) => t.status !== "cancelado");
  const cancelledTickets = tickets.filter((t) => t.status === "cancelado");

  return (
    <Routes>
      <Route
        element={
          <RootLayout
            isAuth={isAuth}
            onToggleAuth={() => setIsAuth((v) => !v)}
          />
        }
      >
        <Route index element={<Home />} />
        <Route
          path="reservar"
          element={
            <Booking onSubmit={handleAddTicket} locations={locations} />
          }
        />
        <Route path="passagem/:id" element={<TicketDetails />} />

        <Route element={<ProtectedRoute isAuth={isAuth} />}>
          <Route path="painel" element={<Dashboard />}>
            <Route
              index
              element={<Navigate to="/painel/ativas" replace />}
            />
            <Route
              path="ativas"
              element={
                <TravelList
                  tickets={activeTickets}
                  onCancel={handleCancel}
                />
              }
            />
            <Route
              path="canceladas"
              element={
                <TravelList tickets={cancelledTickets} onCancel={handleCancel} />
              }
            />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
