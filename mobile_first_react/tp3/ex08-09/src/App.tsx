import "./App.css";
import { Button } from "./Button";
import { Card } from "./Card";

function App() {
  return (
    <main>
      <Card>
        <h1>Título</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <Button style={{ alignSelf: "start" }}>Clique aqui</Button>
        <Button style={{ alignSelf: "start" }} disabled>
          Desabilitado
        </Button>
      </Card>
    </main>
  );
}

export default App;
