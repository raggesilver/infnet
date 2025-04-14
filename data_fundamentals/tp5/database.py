import os

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import scoped_session, sessionmaker

# Define the SQLite database file path
database_file = "database.sqlite"

# Check if database file exists
db_exists = os.path.exists(database_file)

# Create SQLAlchemy engine
engine = create_engine(f"sqlite:///{database_file}", echo=False)

# Create session factory
session_factory = sessionmaker(bind=engine)
Session = scoped_session(session_factory)

# Create base class for ORM models
Base = declarative_base()


def init_db():
    """Initialize the database by creating all tables"""
    Base.metadata.create_all(engine)


def get_session():
    """Get a new database session"""
    return Session()


def close_sessions():
    """Remove the session from the current thread"""
    Session.remove()
