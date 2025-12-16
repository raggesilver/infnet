interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
}

interface ProductListProps {
  products: Product[];
  onDelete: (id: number) => void;
  onEdit: (product: Product) => void;
}

export default function ProductList({
  products,
  onDelete,
  onEdit,
}: ProductListProps) {
  return (
    <div className="product-list">
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Categoria</th>
            <th>Preço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>R$ {product.price.toFixed(2)}</td>
              <td>
                <button onClick={() => onEdit(product)}>Editar</button>
                <button onClick={() => onDelete(product.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export type { Product };
