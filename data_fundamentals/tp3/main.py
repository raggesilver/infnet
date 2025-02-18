from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from alembic.config import Config
from alembic import command
from config import DATABASE_URL

def run_migrations():
    alembic_cfg = Config("alembic.ini")
    command.upgrade(alembic_cfg, "head")
    print("Banco de dados atualizado com sucesso! 🚀")

def main():
    # Set up the database connection
    from db import db
    from app import app_main

    # Run migrations
    run_migrations()

    # Run the application
    app_main()

    db.close()

if __name__ == '__main__':
    main()
