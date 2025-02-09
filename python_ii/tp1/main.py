from product_service import ProductService
from utils import format_error, present_menu, print_products, read_int


def add_product(product_service: ProductService):
    try:
        id = read_int("Digite o ID do novo produto: ")
        name = input("Digite o nome do produto: ")
        price = float(input("Digite o preço do produto: "))
        quantity = int(input("Digite a quantidade do produto: "))

        product_service.add_product(id, name, quantity, price)
    except ValueError as e:
        print(f"Entrada inválida. {e}")
    except Exception as e:
        print(f"Erro ao adicionar produto: {format_error(e)}")


def remove_product(product_service: ProductService):
    id = read_int("Digite o ID do produto: ")

    try:
        product = product_service.remove_product(id)
        print(f"Produto removido: ({product.id}) {product.name}")
    except ValueError as e:
        print(f"Erro ao remover produto: {format_error(e)}")


def update_product(product_service: ProductService):
    id = read_int("Digite o ID do produto: ")
    product = product_service.get_product(id)

    if product is None:
        print("Produto não encontrado.")
        return

    print("\n== Deixe em branco para manter o valor atual. ==\n")
    name = input(f"Digite o novo nome do produto ({product.name}): ")
    price = input(f"Digite o novo preço do produto ({product.price}): ")
    quantity = input(f"Digite a nova quantidade do produto ({product.quantity}): ")

    try:
        product_service.update_product(
            product.id,
            name if name else None,
            int(quantity) if quantity else None,
            float(price) if price else None,
        )
    except ValueError as e:
        print(f"Erro ao atualizar produto: {format_error(e)}")


def display_all_products(product_service: ProductService):
    products = product_service.get_all_products()
    print_products(products)


def display_product(product_service: ProductService):
    id = read_int("Digite o ID do produto: ")
    product = product_service.get_product(id)

    if product is None:
        print("Produto não encontrado.")
    else:
        print_products([product])


def menu(product_service: ProductService):
    """
    Display the main menu and handle user input. This will run until the user
    chooses to exit.
    """
    EXIT_OPTION = 6

    options = {
        1: "Adicionar produto",
        2: "Exibir produto",
        3: "Remover produto",
        4: "Atualizar produto",
        5: "Exibir todos os produtos",
        6: "Sair",
    }

    while (option := present_menu(options, True)) != EXIT_OPTION:
        match option:
            case 1:
                add_product(product_service)
            case 2:
                display_product(product_service)
            case 3:
                remove_product(product_service)
            case 4:
                update_product(product_service)
            case 5:
                display_all_products(product_service)
            case _:
                pass

        input("\nPressione Enter para continuar...")


def main():
    product_service = ProductService()
    try:
        menu(product_service)
    except KeyboardInterrupt:
        print("\nSaindo...")


if __name__ == "__main__":
    main()
