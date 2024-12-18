from db import ProductRecord, read_products, write_products
from utils import read_int

type Db = list[ProductRecord]
# Purchase details: (product_id, product_name, quantity, unit price, total price)
type PurchaseDetails = tuple[int, str, int, float, float]
# Purchase entry: (product_id, purchase_details)
type PurchaseEntry = tuple[int, list[PurchaseDetails]]


def print_purchase_entry(entry: PurchaseEntry) -> None:
    """
    Print the purchase entry in a human-readable format.
    """
    id, cart = entry
    total = sum(purchase[4] for purchase in cart)
    print(f"Cliente {id}: R${total:.2f}")


def print_receipt(entry: PurchaseEntry) -> None:
    """
    Print the receipt for the client.
    """
    id, cart = entry
    total = sum(purchase[4] for purchase in cart)
    print(f"Cliente {id}:")
    for purchase in cart:
        print(
            f"{purchase[1]:<40}: {purchase[2]:02} x R${purchase[3]:>7.2f} = R${purchase[4]:>8.2f}"
        )
    print(f"Total: R${total}\n")


def print_stock_status(products: Db) -> None:
    out_of_stock_products = [product for product in products if product[2] <= 0]

    if out_of_stock_products:
        print(
            f"Produtos em falta: {', '.join(product[1] for product in
                                              out_of_stock_products)}."
        )


def shopping_main(products: Db, client_id: int) -> PurchaseEntry:
    """
    This is the main loop for the shopping experience. Here we build the
    client's cart and return the purchase entry.
    """

    cart: list[PurchaseDetails] = []

    while True:
        MENU = (
            "** Atendimento ao cliente **\n"
            "\n 0. Encerrar atendimento\n"
            + "\n".join(
                [
                    f"{product[0]:>2}. {product[1]:<40} R${product[3]:>7.2f} ({product[2]:02})"
                    for product in products
                ]
            )
            + "\n\n"
        )
        QUIT_OPTION = 0

        option = read_int(
            MENU,
            lambda x: (True, None)
            if x >= 0 and x <= len(products)
            else (False, "Opcao invalida"),
        )

        if option == QUIT_OPTION:
            break

        product = products[option - 1]

        quantity = read_int(
            "Digite a quantidade (zero para cancelar item): ",
            lambda x: (True, None)
            if x <= product[2]
            else (
                False,
                product[2] == 0
                and "Produto esgotado"
                or f"Quantidade maxima: {product[2]}",
            ),
        )

        # Permitir que o caixa digite zero foi uma decisão de design. Isso
        # permite que o caixa cancele o item caso o tenha adicionado por engano.
        if quantity == 0:
            continue

        products[option - 1] = (
            product[0],
            product[1],
            product[2] - quantity,
            product[3],
        )

        total_price = quantity * product[3]

        cart.append((product[0], product[1], quantity, product[3], total_price))

    return (client_id, cart)


def register_main(products: Db) -> None:
    """
    This is the main loop for the cash register. Here we keep prompting for
    new clients until the cashier decides to close the register.
    """

    MENU = [
        "Iniciar atendimento",
        "Encerrar caixa",
    ]
    MENU_STR = "\n".join(f"{k + 1} - {v}" for k, v in enumerate(MENU)) + "\n\n"

    client_id = 0
    purchase_entries: list[PurchaseEntry] = []

    while (
        option := read_int(
            MENU_STR,
            lambda x: (True, None) if x <= len(MENU) else (False, "Opcao invalida"),
        )
    ) != 2:
        match option:
            case 1:
                client_id += 1
                entry = shopping_main(products, client_id)
                purchase_entries.append(entry)
                print_receipt(entry)
            case _:
                pass

    print("\n\n")
    print("Todas as compras:\n")
    for entry in purchase_entries:
        print_purchase_entry(entry)

    print()
    print_stock_status(products)


def main():
    DB_FILE = "produtos.csv"
    products = read_products(DB_FILE)

    try:
        register_main(products)
    except KeyboardInterrupt:
        print("\n\nEncerrando caixa...")
    except Exception as e:
        print(f"Erro inesperado: {e}. Encerrando caixa...")

    write_products(DB_FILE, products)


if __name__ == "__main__":
    main()
