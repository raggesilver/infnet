import type { Ticket } from "../types";
import Button from "./Button";

type TravelListProps = {
  tickets: Ticket[];
  filter: string;
  onFilterChange: (value: string) => void;
  onEdit: (ticket: Ticket) => void;
  onCancel: (id: string) => void;
  locations: string[];
};

function TravelList({ tickets, filter, onFilterChange, onEdit, onCancel, locations }: TravelListProps) {
  const filtered = tickets.filter((t) =>
    t.destination.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Viagens</h2>
      <input
        placeholder="Filtrar por destino"
        value={filter}
        onChange={(e) => onFilterChange(e.target.value)}
        style={{ marginBottom: 12, padding: 6 }}
        list="locations-filter"
      />
      <datalist id="locations-filter">
        {locations.map((l) => (
          <option key={l} value={l} />
        ))}
      </datalist>
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
          {filtered.map((ticket) => (
            <tr key={ticket.id}>
              <td>{ticket.passenger}</td>
              <td>{ticket.seat}</td>
              <td>{ticket.origin}</td>
              <td>{ticket.destination}</td>
              <td>{ticket.date}</td>
              <td>{ticket.status}</td>
              <td>
                <Button label="Alterar" onClick={() => onEdit(ticket)} variant="warning" />
                <Button label="Cancelar" onClick={() => onCancel(ticket.id)} variant="danger" />
              </td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td colSpan={7} style={{ textAlign: "center" }}>
                Nenhuma viagem encontrada.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TravelList;
