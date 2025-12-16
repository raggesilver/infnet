import { Link, useNavigate } from "react-router-dom";
import type { Product } from "../hooks/useProducts";
import styles from "./ProductCard.module.css";

type ProductCardProps = {
  product: Product;
  onDelete?: (id: number) => void;
};

export function ProductCard({ product, onDelete }: ProductCardProps) {
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  const navigate = useNavigate();

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(`/novo/${product.id}`);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onDelete) {
      onDelete(product.id);
    }
  };

  return (
    <div className={styles.card}>
      <Link to={`/produtos/${product.id}`}>
        <img src={product.images[0]} />
        <div className={styles.content}>
          <span className="title">{product.title}</span>
          <span className="price">{formatter.format(product.price)}</span>
        </div>
      </Link>
      <div className={styles.actions}>
        <button onClick={handleEdit}>Editar</button>
        <button onClick={handleDelete}>Excluir</button>
      </div>
    </div>
  );
}
