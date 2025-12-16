import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
  useCreateProduct,
  useProduct,
  useUpdateProduct,
} from "../hooks/useProducts";

type ProductFormData = {
  title: string;
  price: number;
  description: string;
  category: string;
};

export default function ProductForm() {
  const { id } = useParams();
  const isEditMode = !!id;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductFormData>();
  const navigate = useNavigate();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct(id!);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const { data: product, isLoading } = useProduct(id!, {
    enabled: isEditMode,
  });

  // Pre-populate form when editing
  useEffect(() => {
    if (product && isEditMode) {
      reset({
        title: product.title,
        price: product.price,
        description: product.description,
        category: product.category,
      });
    }
  }, [product, isEditMode, reset]);

  const onSubmit = (data: ProductFormData) => {
    setFeedbackMessage(null); // Clear previous messages

    if (isEditMode) {
      // Update existing product (PUT request)
      updateProduct.mutate(data, {
        onSuccess: (result) => {
          console.log("Product updated successfully:", result);
          setFeedbackMessage("Produto atualizado com sucesso!");
          setTimeout(() => navigate(`/produtos/${id}`), 1500);
        },
        onError: (error) => {
          console.error("Error updating product:", error);
          setFeedbackMessage("Erro ao atualizar produto. Tente novamente.");
        },
      });
    } else {
      // Create new product (POST request)
      createProduct.mutate(data, {
        onSuccess: (result) => {
          console.log("Product created successfully:", result);
          setFeedbackMessage(`Produto criado com sucesso! ID: ${result.id}`);
          setTimeout(() => navigate("/"), 1500);
        },
        onError: (error) => {
          console.error("Error creating product:", error);
          setFeedbackMessage("Erro ao criar produto. Tente novamente.");
        },
      });
    }
  };

  if (isEditMode && isLoading) {
    return <main className="wide-layout p-4">Carregando produto...</main>;
  }

  return (
    <main className="wide-layout p-4">
      <h2>{isEditMode ? "Editar Produto" : "Novo Produto"}</h2>

      {feedbackMessage && (
        <div
          style={{
            padding: "12px",
            marginBottom: "16px",
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

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="title">Título</label>
          <br />
          <input
            id="title"
            type="text"
            {...register("title", {
              required: "Título é obrigatório",
              maxLength: {
                value: 50,
                message: "Título deve ter no máximo 50 caracteres",
              },
            })}
          />
          {errors.title && (
            <div style={{ color: "red" }}>{errors.title.message}</div>
          )}
        </div>
        <br />

        <div>
          <label htmlFor="price">Preço</label>
          <br />
          <input
            id="price"
            type="number"
            step="0.01"
            {...register("price", {
              required: "Preço é obrigatório",
              valueAsNumber: true,
              min: {
                value: 0.01,
                message: "Preço deve ser maior que 0",
              },
            })}
          />
          {errors.price && (
            <div style={{ color: "red" }}>{errors.price.message}</div>
          )}
        </div>
        <br />

        <div>
          <label htmlFor="description">Descrição</label>
          <br />
          <textarea
            id="description"
            rows={4}
            {...register("description", {
              required: "Descrição é obrigatória",
            })}
          />
          {errors.description && (
            <div style={{ color: "red" }}>{errors.description.message}</div>
          )}
        </div>
        <br />

        <div>
          <label htmlFor="category">Categoria</label>
          <br />
          <input id="category" type="text" {...register("category")} />
        </div>
        <br />

        <button
          type="submit"
          disabled={createProduct.isPending || updateProduct.isPending}
        >
          {createProduct.isPending || updateProduct.isPending
            ? "Salvando..."
            : "Salvar"}
        </button>
      </form>
    </main>
  );
}
