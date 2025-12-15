import { Biography } from "./_biography";
import { Calendar } from "./_calendar";
import { Projects } from "./_projects";
import "./App.css";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import ToTop from "./components/to-top";

function App() {
  return (
    <div className="flex flex-col min-h-screen font-sans sm:gap-8">
      <Header />

      <main className="wide-layout p-4 space-y-16">
        <Biography />
        <Projects />
        <Calendar />
      </main>

      <ToTop />

      <Footer />
    </div>
  );
}

export default App;
