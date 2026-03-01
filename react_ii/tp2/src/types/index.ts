export type TicketStatus = "confirmado" | "pendente" | "cancelado";

export type Ticket = {
  id: string;
  passenger: string;
  seat: number;
  origin: string;
  destination: string;
  date: string;
  status: TicketStatus;
};
