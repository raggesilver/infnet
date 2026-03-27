import { useNavigate } from "react-router-dom";
import TicketForm from "../components/TicketForm";
import type { Ticket } from "../types";

type BookingProps = {
  onSubmit: (data: Omit<Ticket, "id" | "status">) => void;
  locations: string[];
};

function Booking({ onSubmit, locations }: BookingProps) {
  const navigate = useNavigate();

  const handleSubmit = (data: Omit<Ticket, "id" | "status">) => {
    onSubmit(data);
    navigate("/painel");
  };

  return (
    <div>
      <TicketForm onSubmit={handleSubmit} locations={locations} />
    </div>
  );
}

export default Booking;
