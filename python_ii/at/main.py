from checkout import register_loop
from database import get_db_engine, get_session, setup_database
from utils import load_customers_from_csv, load_products_from_csv


def initialize_data(session):
    """
    Initialize database with data from CSV files.

    Args:
        session: SQLAlchemy session

    Returns:
        None
    """
    # Load products and customers from CSV files
    load_products_from_csv(session, "produtos.csv")
    load_customers_from_csv(session, "clientes.csv")


def main():
    """
    Main function to run the supermarket checkout system.
    """
    print("Iniciando Sistema de Caixa de Supermercado...")

    try:
        # Setup database
        engine = get_db_engine()
        setup_database(engine)

        # Create session
        session = get_session(engine)

        try:
            # Initialize data
            initialize_data(session)

            # Run main checkout loop
            register_loop(session)

        except KeyboardInterrupt:
            print("\nSistema interrompido pelo usuário.")
        except Exception as e:
            print(f"\nErro inesperado: {e}")
        finally:
            # Close session
            session.close()

    except Exception as e:
        print(f"Erro ao inicializar o banco de dados: {e}")


if __name__ == "__main__":
    main()
