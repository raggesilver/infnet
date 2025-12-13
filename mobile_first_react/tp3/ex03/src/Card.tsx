export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        borderRadius: "1rem",
        border: "1px solid #ccc",
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      {children}
    </div>
  );
}
