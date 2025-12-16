import { Header } from "../components/Header";

export const withDefaultLayout = (elem: () => JSX.Element) => {
  return () => <Default>{elem()}</Default>;
};

export function Default({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <Header className="[&~*]:flex-grow" />

      {children}

      {/*<Footer />*/}
    </div>
  );
}
