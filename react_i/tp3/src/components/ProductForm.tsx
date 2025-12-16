import { useState, useEffect } from "react";
import type { Product } from "./ProductList";

interface ProductFormProps {
  onSubmit: (product: Omit<Product, "id">) => void;
  editingProduct: Product | null;
  onCancelEdit: () => void;
}

export default function ProductForm({
  onSubmit,
  editingProduct,
  onCancelEdit,
}: ProductFormProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name);
      setCategory(editingProduct.category);
      setPrice(editingProduct.price.toString());
    }
  }, [editingProduct]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !category.trim() || !price.trim()) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    const priceValue = parseFloat(price);
    if (isNaN(priceValue) || priceValue <= 0) {
      alert("Por favor, insira um preço válido!");
      return;
    }

    onSubmit({
      name: name.trim(),
      category: category.trim(),
      price: priceValue,
    });

    setName("");
    setCategory("");
    setPrice("");
  };

  const handleCancel = () => {
    setName("");
    setCategory("");
    setPrice("");
    onCancelEdit();
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h2>{editingProduct ? "Editar Produto" : "Adicionar Produto"}</h2>
      <div>
        <label htmlFor="name">Nome:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome do produto"
        />
      </div>
      <div>
        <label htmlFor="category">Categoria:</label>
        <input
          type="text"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Categoria do produto"
        />
      </div>
      <div>
        <label htmlFor="price">Preço:</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="0.00"
          step="0.01"
        />
      </div>
      <div className="form-buttons">
        <button type="submit">
          {editingProduct ? "Atualizar" : "Adicionar"}
        </button>
        {editingProduct && (
          <button type="button" onClick={handleCancel}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
