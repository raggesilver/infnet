from datetime import datetime

from models import Cliente, Compra, Item, Produto
from reports import print_out_of_stock, print_receipt, print_sales_summary
from sqlalchemy.orm import Session
from utils import read_int, validate_product_id, validate_product_quantity


def register_customer(session: Session, customer_id: int) -> Cliente:
    """
    Register a new customer in the database.

    Args:
        session: SQLAlchemy session
        customer_id (int): ID of the customer to register

    Returns:
        Cliente: The registered customer
    """
    customer_name = input("Cliente não encontrado. Digite o nome do cliente: ")
    customer = Cliente(id_cliente=customer_id, nome=customer_name)
    session.add(customer)
    session.commit()
    return customer


def get_customer(session: Session) -> Cliente:
    """
    Get a customer by ID or register a new one if not found.

    Args:
        session: SQLAlchemy session

    Returns:
        Cliente: The customer
    """
    while True:
        customer_id = read_int("Digite o ID do cliente: ")

        # Check if customer exists
        customer = session.query(Cliente).filter_by(id_cliente=customer_id).first()
        if customer:
            return customer
        else:
            # Register new customer
            return register_customer(session, customer_id)


def product_shopping(session: Session, compra: Compra) -> None:
    """
    Handle the product shopping process for a customer.

    Args:
        session: SQLAlchemy session
        compra (Compra): The purchase transaction

    Returns:
        None
    """
    while True:
        # Display available products
        products = session.query(Produto).all()
        print("\nProdutos disponíveis:")
        print("0. Finalizar atendimento")
        for product in products:
            print(
                f"{product.id_produto}. {product.nome} - R${product.preco:.2f} (Estoque: {product.quantidade})"
            )

        # Get product selection
        product_id = read_int("\nDigite o ID do produto (0 para finalizar): ")

        if product_id == 0:
            break

        # Validate product ID
        valid, error_message = validate_product_id(session, product_id)
        if not valid:
            print(error_message)
            continue

        # Get product from database
        product = session.query(Produto).filter_by(id_produto=product_id).first()

        # Get quantity
        quantity = read_int(
            "Digite a quantidade (0 para cancelar): ",
            lambda qty: (
                validate_product_quantity(session, product_id, qty)
                if qty > 0
                else (True, None)
            ),
        )

        if quantity == 0:
            continue

        # Create purchase item
        item = Item(
            quantidade=quantity,
            id_compra=compra.id_compra,
            id_produto=product.id_produto,
        )
        session.add(item)

        # Update product stock
        product.quantidade -= quantity

        # Commit changes - Ensures inventory updates are persisted
        session.commit()


def customer_checkout(session: Session) -> Compra:
    """
    Handle a customer checkout process.

    Args:
        session: SQLAlchemy session

    Returns:
        Compra: The completed purchase transaction
    """
    # Get or register customer
    customer = get_customer(session)

    # Create purchase record with current date and time
    now = datetime.now().strftime("%Y-%m-%d %H:%M")
    compra = Compra(data_compra=now, id_cliente=customer.id_cliente)
    session.add(compra)
    session.commit()  # Commit to ensure purchase is persisted

    # Handle product shopping
    product_shopping(session, compra)

    # Return the completed purchase
    return compra


def register_loop(session: Session) -> None:
    """
    Main checkout register loop. Keeps running until the user decides to close the checkout.

    Args:
        session: SQLAlchemy session

    Returns:
        None
    """
    # Load all existing purchases from the database instead of using an empty list
    # This ensures we don't lose purchases between program runs
    purchases = session.query(Compra).all()

    while True:
        print("\n--- Sistema de Caixa de Supermercado ---")
        print("1. Iniciar atendimento")
        print("2. Fechar caixa")

        option = read_int(
            "\nEscolha uma opção: ",
            lambda x: (True, None) if 1 <= x <= 2 else (False, "Opção inválida"),
        )

        if option == 1:
            # Start customer checkout
            print("\n--- Iniciando Atendimento ---")
            compra = customer_checkout(session)
            purchases.append(compra)

            # Print receipt
            print("\n--- Nota Fiscal ---")
            print_receipt(session, compra)

            # Final commit to ensure all data is saved
            session.commit()

        elif option == 2:
            # Close checkout and show summary
            print("\n--- Fechando Caixa ---")
            print_sales_summary(session, purchases)
            print_out_of_stock(session)

            # Final commit to ensure all data is saved
            session.commit()
            break
