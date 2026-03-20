import { BrowserRouter, Route, Routes } from "react-router";
import { Layout } from "./components/layout";
import { CreateEventPage } from "./pages/create-event";
import { HomePage } from "./pages/home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="criar" element={<CreateEventPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
