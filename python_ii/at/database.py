import os

# Pretty sure we need to import all models so SQLAlchemy can create the tables
from models import Base, Cliente, Compra, Item, Produto
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


def get_db_engine(db_path="mercado-at.bd"):
    """
    Create and return a SQLAlchemy engine for SQLite database.

    Args:
        db_path (str): Path to the SQLite database file

    Returns:
        SQLAlchemy engine
    """
    # Create the database directory if it doesn't exist
    db_dir = os.path.dirname(db_path)
    if db_dir and not os.path.exists(db_dir):
        os.makedirs(db_dir)

    engine = create_engine(f"sqlite:///{db_path}")
    return engine


def setup_database(engine):
    """
    Create database tables if they don't exist.

    Args:
        engine: SQLAlchemy engine

    Returns:
        None
    """
    Base.metadata.create_all(engine)


def get_session(engine):
    """
    Create and return a new SQLAlchemy session.

    Args:
        engine: SQLAlchemy engine

    Returns:
        SQLAlchemy session
    """
    Session = sessionmaker(bind=engine)
    return Session()
