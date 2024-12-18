# Product (id, name, stock, price)
type ProductRecord = tuple[int, str, int, float]


# We are not allowed to use globals. Ideally, this would have been a global
# constant. We cannot use OOP either, so no static members.
def get_product_headers() -> list[str]:
    return ["id", "product", "stock", "price"]


def read_products(file_path: str) -> list[ProductRecord]:
    with open(file_path, "r") as file:
        rows = file.readlines()

        _types = [int, str, int, float]

        return [
            tuple(_type(value) for _type, value in zip(_types, row.split(",")))
            for row in rows[1:]
        ]


def write_products(file_path: str, products: list[ProductRecord]) -> None:
    headers = get_product_headers()
    with open(file_path, "w") as file:
        file.write(",".join(headers) + "\n")

        for product in products:
            file.write(",".join(str(field) for field in product) + "\n")
