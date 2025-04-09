from typing import List

from models import Cliente, Compra, Item, Produto
from sqlalchemy import func
from sqlalchemy.orm import Session
from tabulate import tabulate


def print_receipt(session: Session, compra: Compra) -> None:
    """
    Print a receipt for a purchase transaction using tabulate.

    Args:
        session: SQLAlchemy session
        compra (Compra): The purchase transaction

    Returns:
        None
    """
    # Get all items for this purchase with their related products
    items = (
        session.query(Item, Produto)
        .join(Produto, Item.id_produto == Produto.id_produto)
        .filter(Item.id_compra == compra.id_compra)
        .all()
    )

    # Get customer name
    customer = session.query(Cliente).filter_by(id_cliente=compra.id_cliente).first()

    # Print header
    print("\n=== NOTA FISCAL ===")
    print(f"Cliente: {customer.nome}")
    print(f"Data: {compra.data_compra}")

    # Prepare data for tabulate
    table_data = []
    total = 0

    for item, product in items:
        item_total = item.quantidade * product.preco
        total += item_total
        table_data.append(
            [
                product.nome,
                item.quantidade,
                f"R$ {product.preco:.2f}",
                f"R$ {item_total:.2f}",
            ]
        )

    # Print items table
    print(
        tabulate(
            table_data,
            headers=["Produto", "Qtd", "Preço Unit.", "Total"],
            tablefmt="grid",
        )
    )

    # Print total
    print(f"\nTotal: R$ {total:.2f}")
    print("==================")


def print_sales_summary(session: Session, purchases: List[Compra]) -> None:
    """
    Print a summary of all sales using tabulate.

    Args:
        session: SQLAlchemy session
        purchases (List[Compra]): List of purchase transactions

    Returns:
        None
    """
    if not purchases:
        print("Nenhuma venda realizada.")
        return

    print("\n=== RESUMO DE VENDAS ===")

    table_data = []
    grand_total = 0

    for compra in purchases:
        # Get customer
        customer = (
            session.query(Cliente).filter_by(id_cliente=compra.id_cliente).first()
        )

        # Calculate total for this purchase
        purchase_total = (
            session.query(func.sum(Item.quantidade * Produto.preco))
            .join(Produto, Item.id_produto == Produto.id_produto)
            .filter(Item.id_compra == compra.id_compra)
            .scalar()
            or 0
        )

        # Add to table data
        table_data.append([customer.nome, f"R$ {purchase_total:.2f}"])

        grand_total += purchase_total

    # Print table
    print(tabulate(table_data, headers=["Cliente", "Total"], tablefmt="grid"))

    # Print grand total
    print(f"\nTotal de vendas: R$ {grand_total:.2f}")
    print("======================")


def print_out_of_stock(session: Session) -> None:
    """
    Print a list of products that are out of stock using tabulate.

    Args:
        session: SQLAlchemy session

    Returns:
        None
    """
    # Get products out of stock
    out_of_stock = session.query(Produto).filter(Produto.quantidade == 0).all()

    if out_of_stock:
        print("\n=== PRODUTOS SEM ESTOQUE ===")

        # Prepare data for tabulate
        table_data = [[product.id_produto, product.nome] for product in out_of_stock]

        # Print table
        print(tabulate(table_data, headers=["ID", "Produto"], tablefmt="grid"))

        print("=========================")
    else:
        print("\nTodos os produtos possuem estoque.")
