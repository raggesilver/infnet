type ButtonProps = {
  label: string;
  onClick: () => void;
  variant: "danger" | "success" | "warning";
};

const variantColors: Record<ButtonProps["variant"], string> = {
  danger: "#e74c3c",
  success: "#2ecc71",
  warning: "#f39c12",
};

function Button({ label, onClick, variant }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: variantColors[variant],
        color: "white",
        border: "none",
        padding: "6px 12px",
        cursor: "pointer",
        marginRight: 4,
      }}
    >
      {label}
    </button>
  );
}

export default Button;
