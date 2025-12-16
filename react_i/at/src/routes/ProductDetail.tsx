import { useState } from "react";
import { useParams } from "react-router";
import { useProduct } from "../hooks/useProducts";

export default function ProductView() {
  const { id } = useParams();

  const { data: product, isLoading, error } = useProduct(id!);
  const [imageIndex, setImageIndex] = useState(0);

  if (isLoading) return <main>Carregando produto...</main>;
  else if (error) return <main>Erro ao carregar produto: {error.message}</main>;

  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <main className="flex flex-col gap-4 p-4 wide-layout">
      <h2>
        {product!.title} — {formatter.format(product!.price)}
      </h2>
      <p>{product!.description}</p>
      <img
        src={product!.images[imageIndex]}
        style={{ width: "100%", maxWidth: "500px" }}
      />
      {product!.images.length > 1 && (
        <>
          <button
            disabled={imageIndex <= 0}
            onClick={() => setImageIndex(imageIndex - 1)}
          >
            Anterior
          </button>
          <button
            disabled={imageIndex + 1 >= product!.images.length}
            onClick={() => setImageIndex(imageIndex + 1)}
          >
            Próxima
          </button>
        </>
      )}
    </main>
  );
}
