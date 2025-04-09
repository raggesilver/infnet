import csv
from typing import Callable, Literal, Tuple

from models import Cliente, Produto
from sqlalchemy.orm import Session

# Type definitions for type hints
ValidationFunction = Callable[
    [int], Tuple[Literal[True], None] | Tuple[Literal[False], str]
]


def read_int(
    message: str = "Digite um número inteiro: ",
    validation_fn: ValidationFunction | None = None,
) -> int:
    """
    Read an integer from the user.

    This function will keep asking for input until a valid integer is entered.
    If you provide a validation function, it will be used to check if the
    integer is valid. The validation function should return a tuple with a
    boolean indicating if the integer is valid and an error message if it is
    not.

    Args:
        message (str): The message to display to the user.
        validation_fn (callable): A function that receives the integer and returns
          a tuple with a boolean indicating if the integer is valid and an error
          message if it is not.
    """
    while True:
        try:
            n = int(input(message))

            if validation_fn is not None:
                valid, error_message = validation_fn(n)
                if not valid:
                    print(error_message)
                    continue

            return n

        except ValueError:
            print("Erro: valor inválido.")


def clear_terminal():
    """
    Clear the terminal screen.
    """
    import os

    if os.name == "nt":
        os.system("cls")
    else:
        print("\033[H\033[J", end="")


def present_menu(menu: dict[int, str], clear=False) -> int:
    """
    Present a menu to the user and return the selected option.

    Args:
        menu (dict): A dictionary with the options of the menu. The keys should
          be the options and the values should be the descriptions.
        clear (bool): Whether to clear the terminal before displaying the menu.
    """
    while True:
        if clear:
            clear_terminal()

        print("Escolha uma opção:\n")
        for option, description in menu.items():
            print(f"{option}: {description}")

        try:
            option = int(input("\nOpção: "))
            return next(k for k, _ in menu.items() if k == option)
        except StopIteration:
            print("Opção inválida.")
        except ValueError:
            print("Entrada inválida.")

        if clear:
            input("Pressione enter para continuar...")


# --- CSV Loading Functions ---


def load_products_from_csv(session: Session, file_path: str) -> None:
    """
    Load products from a CSV file into the database.

    Args:
        session: SQLAlchemy session
        file_path (str): Path to the CSV file

    Returns:
        None
    """
    try:
        with open(file_path, "r") as file:
            csv_reader = csv.reader(file)
            for row in csv_reader:
                if len(row) == 4:  # Ensure correct format: id,name,quantity,price
                    try:
                        product_id = int(row[0])
                        name = row[1]
                        quantity = int(row[2])
                        price = float(row[3])

                        # Check if product already exists
                        product = (
                            session.query(Produto)
                            .filter_by(id_produto=product_id)
                            .first()
                        )
                        if product:
                            # Update existing product
                            product.nome = name
                            product.quantidade = quantity
                            product.preco = price
                        else:
                            # Create new product
                            product = Produto(
                                id_produto=product_id,
                                nome=name,
                                quantidade=quantity,
                                preco=price,
                            )
                            session.add(product)

                    except (ValueError, IndexError):
                        print(f"Erro: linha inválida no arquivo produtos: {row}")
                else:
                    print(f"Erro: formato inválido no arquivo produtos: {row}")

            session.commit()
    except FileNotFoundError:
        print(f"Erro: arquivo {file_path} não encontrado.")
    except Exception as e:
        session.rollback()
        print(f"Erro ao carregar produtos: {e}")


def load_customers_from_csv(session: Session, file_path: str) -> None:
    """
    Load customers from a CSV file into the database.

    Args:
        session: SQLAlchemy session
        file_path (str): Path to the CSV file

    Returns:
        None
    """
    try:
        with open(file_path, "r") as file:
            csv_reader = csv.reader(file)
            for row in csv_reader:
                if len(row) == 2:  # Ensure correct format: id,name
                    try:
                        customer_id = int(row[0])
                        name = row[1]

                        # Check if customer already exists
                        customer = (
                            session.query(Cliente)
                            .filter_by(id_cliente=customer_id)
                            .first()
                        )
                        if customer:
                            # Update existing customer
                            customer.nome = name
                        else:
                            # Create new customer
                            customer = Cliente(id_cliente=customer_id, nome=name)
                            session.add(customer)

                    except (ValueError, IndexError):
                        print(f"Erro: linha inválida no arquivo clientes: {row}")
                else:
                    print(f"Erro: formato inválido no arquivo clientes: {row}")

            session.commit()
    except FileNotFoundError:
        print(f"Erro: arquivo {file_path} não encontrado.")
    except Exception as e:
        session.rollback()
        print(f"Erro ao carregar clientes: {e}")


# --- Validation Functions ---


def validate_customer_id(session: Session, customer_id: int) -> Tuple[bool, str | None]:
    """
    Validate if the customer ID exists in the database.

    Args:
        session: SQLAlchemy session
        customer_id (int): Customer ID to validate

    Returns:
        Tuple with boolean indicating if ID is valid and error message if not
    """
    if customer_id <= 0:
        return False, "Erro: id inválido"

    customer = session.query(Cliente).filter_by(id_cliente=customer_id).first()
    if not customer:
        return False, "Cliente não encontrado"

    return True, None


def validate_product_id(session: Session, product_id: int) -> Tuple[bool, str | None]:
    """
    Validate if the product ID exists in the database.

    Args:
        session: SQLAlchemy session
        product_id (int): Product ID to validate

    Returns:
        Tuple with boolean indicating if ID is valid and error message if not
    """
    if product_id <= 0:
        return False, "Erro: id inválido"

    product = session.query(Produto).filter_by(id_produto=product_id).first()
    if not product:
        return False, "Erro: produto não cadastrado"

    return True, None


def validate_product_quantity(
    session: Session, product_id: int, quantity: int
) -> tuple[Literal[True], None] | tuple[Literal[False], str]:
    """
    Validate if the requested quantity is available in stock.

    Args:
        session: SQLAlchemy session
        product_id (int): Product ID
        quantity (int): Requested quantity

    Returns:
        Tuple with boolean indicating if quantity is valid and error message if not
    """
    if quantity <= 0:
        return False, "Erro: quantidade inválida"

    product = session.query(Produto).filter_by(id_produto=product_id).first()
    if not product:
        return False, "Erro: produto não cadastrado"

    if quantity > product.quantidade:
        return False, "Erro: quantidade fora do estoque"

    return True, None
