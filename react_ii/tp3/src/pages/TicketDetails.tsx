import { useNavigate, useParams } from "react-router-dom";

function TicketDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  return (
    <div>
      <h2>Detalhes da Passagem</h2>
      <p>Visualizando detalhes da passagem ID: {id}</p>
      <button onClick={() => navigate(-1)}>Voltar</button>
    </div>
  );
}

export default TicketDetails;
