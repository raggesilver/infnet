import { useState } from "react";
import Header from "./components/Header";
import ProductForm from "./components/ProductForm";
import ProductList, { Product } from "./components/ProductList";
import "./styles.css";

export default function App() {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "Notebook", category: "Eletrônicos", price: 3500.0 },
    { id: 2, name: "Mouse", category: "Eletrônicos", price: 50.0 },
    { id: 3, name: "Teclado", category: "Eletrônicos", price: 150.0 },
  ]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const showFeedback = (message: string) => {
    setFeedbackMessage(message);
    setTimeout(() => setFeedbackMessage(""), 3000);
  };

  const handleAddProduct = (productData: Omit<Product, "id">) => {
    if (editingProduct) {
      setProducts(
        products.map((p) =>
          p.id === editingProduct.id ? { ...productData, id: p.id } : p,
        ),
      );
      showFeedback("Produto atualizado com sucesso!");
      setEditingProduct(null);
    } else {
      const newProduct = {
        ...productData,
        id:
          products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1,
      };
      setProducts([...products, newProduct]);
      showFeedback("Produto adicionado com sucesso!");
    }
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
    showFeedback("Produto removido com sucesso!");
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="App">
      <Header />

      {feedbackMessage && (
        <div className="feedback-message">{feedbackMessage}</div>
      )}

      <div className="container">
        <ProductForm
          onSubmit={handleAddProduct}
          editingProduct={editingProduct}
          onCancelEdit={handleCancelEdit}
        />

        <div className="search-container">
          <label htmlFor="search">Buscar produto:</label>
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Digite o nome do produto..."
          />
        </div>

        <ProductList
          products={filteredProducts}
          onDelete={handleDeleteProduct}
          onEdit={handleEditProduct}
        />
      </div>
    </div>
  );
}
