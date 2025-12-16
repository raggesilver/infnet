import { useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { useDeleteProduct, useProducts } from "../hooks/useProducts";

export default function Index() {
  const { data: products, isLoading, error } = useProducts();
  const deleteProduct = useDeleteProduct();
  const [deletedIds, setDeletedIds] = useState<number[]>([]);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const handleDelete = (id: number) => {
    if (!confirm("Tem certeza que deseja excluir este produto?")) {
      return;
    }

    setFeedbackMessage(null); // Clear previous messages

    deleteProduct.mutate(id, {
      onSuccess: () => {
        console.log(`Product ${id} deleted successfully`);
        setDeletedIds((prev) => [...prev, id]);
        setFeedbackMessage("Produto excluído com sucesso!");
        setTimeout(() => setFeedbackMessage(null), 3000);
      },
      onError: (error) => {
        console.error("Error deleting product:", error);
        setFeedbackMessage("Erro ao excluir produto. Tente novamente.");
        setTimeout(() => setFeedbackMessage(null), 3000);
      },
    });
  };

  if (isLoading)
    return <main className="wide-layout">Carregando produtos...</main>;
  else if (error || !products)
    return (
      <main className="wide-layout">
        Erro ao carregar produtos: {error?.message || "erro desconhecido"}
      </main>
    );

  // Filter out deleted products from the display
  const visibleProducts = products.filter(
    (product) => !deletedIds.includes(product.id),
  );

  return (
    <main>
      {feedbackMessage && (
        <div
          style={{
            padding: "12px",
            margin: "16px",
            borderRadius: "4px",
            backgroundColor: feedbackMessage.includes("sucesso")
              ? "#d4edda"
              : "#f8d7da",
            color: feedbackMessage.includes("sucesso") ? "#155724" : "#721c24",
            border: `1px solid ${feedbackMessage.includes("sucesso") ? "#c3e6cb" : "#f5c6cb"}`,
          }}
        >
          {feedbackMessage}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 wide-layout">
        {visibleProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </main>
  );
}
