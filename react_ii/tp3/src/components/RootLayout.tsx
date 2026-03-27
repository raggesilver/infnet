import { Outlet } from "react-router-dom";
import Header from "./Header";
import NavBar from "./NavBar";

type RootLayoutProps = {
  isAuth: boolean;
  onToggleAuth: () => void;
};

function RootLayout({ isAuth, onToggleAuth }: RootLayoutProps) {
  return (
    <div className="app">
      <Header />
      <NavBar isAuth={isAuth} onToggleAuth={onToggleAuth} />
      <Outlet />
    </div>
  );
}

export default RootLayout;
