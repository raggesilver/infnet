export function Button({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <button
      style={{
        borderRadius: ".25rem",
        border: "none",
        display: "flex",
        flexDirection: "row",
        gap: ".25rem",
        alignItems: "center",
        padding: "0.25rem 0.5rem",
        background: "black",
        color: "white",
        cursor: "pointer",
        fontSize: ".8rem",
        fontWeight: 500,
        ...style,
      }}
    >
      {children}
    </button>
  );
}
