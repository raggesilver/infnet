from dataclasses import dataclass


@dataclass
class Product:
    id: int
    name: str
    quantity: int
    price: float

    def __iter__(self):
        return iter((self.id, self.name, self.quantity, self.price))

    @staticmethod
    def headers():
        return ("ID", "Nome", "Quantidade", "Preço")


class ProductService:
    def __init__(self) -> None:
        self.products: dict[int, Product] = {}

    def add_product(self, id: int, name: str, quantity: int, price: float) -> None:
        if id in self.products:
            raise ValueError("Produto já cadastrado.")

        if name == "":
            raise ValueError("Nome não pode ser vazio")
        if quantity < 0:
            raise ValueError("Quantidade não pode ser negativa")
        if price < 0:
            raise ValueError("Preço não pode ser negativo")

        self.products[id] = Product(id, name, quantity, price)

    def get_product(self, id: int) -> Product | None:
        return self.products.get(id)

    def get_all_products(self) -> list[Product]:
        return list(self.products.values())

    def remove_product(self, id: int) -> Product:
        if id not in self.products:
            raise ValueError("Produto não encontrado.")

        val = self.products[id]
        del self.products[id]
        return val

    def update_product(
        self,
        id: int,
        name: str | None = None,
        quantity: int | None = None,
        price: float | None = None,
    ) -> None:
        if id not in self.products:
            raise ValueError("Produto não encontrado.")

        product = self.products[id]

        if name is not None:
            if name == "":
                raise ValueError("Nome não pode ser vazio")
            product.name = name

        if quantity is not None:
            if quantity < 0:
                raise ValueError("Quantidade não pode ser negativa")
            product.quantity = quantity

        if price is not None:
            if price < 0:
                raise ValueError("Preço não pode ser negativo")
            product.price = price
