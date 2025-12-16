import type { HTMLAttributes } from "react";
import { Link } from "react-router";

type HeaderProps = Omit<HTMLAttributes<HTMLDivElement>, "children">;

export function Header({ className, ...props }: HeaderProps) {
  return (
    <header {...props} className={"wide-layout " + (className ?? "")}>
      <h1>Dummy E-Commerce Admin</h1>
      <span className="mx-auto"></span>
      <Link to="/">Início</Link>
      <Link to="/novo">Novo</Link>
    </header>
  );
}
