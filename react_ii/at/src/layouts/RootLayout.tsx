import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import NavBar from "../components/NavBar";

type RootLayoutProps = {
  isLogged: boolean;
  onToggleLogin: () => void;
};

export default function RootLayout({ isLogged, onToggleLogin }: RootLayoutProps) {
  return (
    <div>
      <Header />
      <NavBar isLogged={isLogged} onToggleLogin={onToggleLogin} />
      <main style={{ padding: "1rem" }}>
        <Outlet />
      </main>
    </div>
  );
}
