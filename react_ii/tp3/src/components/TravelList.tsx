import { Link } from "react-router-dom";
import type { Ticket } from "../types";
import Button from "./Button";

type TravelListProps = {
  tickets: Ticket[];
  onCancel: (id: string) => void;
};

function TravelList({ tickets, onCancel }: TravelListProps) {
  return (
    <table className="ticket-table">
      <thead>
        <tr>
          <th>Passageiro</th>
          <th>Assento</th>
          <th>Origem</th>
          <th>Destino</th>
          <th>Data</th>
          <th>Status</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {tickets.map((ticket) => (
          <tr key={ticket.id}>
            <td>{ticket.passenger}</td>
            <td>{ticket.seat}</td>
            <td>{ticket.origin}</td>
            <td>{ticket.destination}</td>
            <td>{ticket.date}</td>
            <td>{ticket.status}</td>
            <td>
              <Link to={`/passagem/${ticket.id}`}>
                <Button
                  label="Detalhes"
                  onClick={() => {}}
                  variant="success"
                />
              </Link>
              {ticket.status !== "cancelado" && (
                <Button
                  label="Cancelar"
                  onClick={() => onCancel(ticket.id)}
                  variant="danger"
                />
              )}
            </td>
          </tr>
        ))}
        {tickets.length === 0 && (
          <tr>
            <td colSpan={7} style={{ textAlign: "center" }}>
              Nenhuma viagem encontrada.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default TravelList;
