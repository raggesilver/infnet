import "./App.css";
import { Button } from "./Button";
import { Card } from "./Card";

function App() {
  return (
    <main>
      <h1>Exercício 03</h1>

      <Card>
        <span>Olá, estou dentro do card</span>
        <Button style={{ marginTop: "2rem", alignSelf: "start" }}>
          Clique em mim
        </Button>
      </Card>
    </main>
  );
}

export default App;
