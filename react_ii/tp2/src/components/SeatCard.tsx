type SeatCardProps = {
  seat: number;
  status: "ocupado" | "livre";
};

function SeatCard({ seat, status }: SeatCardProps) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 40,
        height: 40,
        backgroundColor: status === "ocupado" ? "#e74c3c" : "#2ecc71",
        color: "white",
        fontWeight: "bold",
        borderRadius: 4,
        margin: 2,
      }}
    >
      {seat}
    </div>
  );
}

export default SeatCard;
