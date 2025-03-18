from typing import TYPE_CHECKING
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from pandas import DataFrame

from produto import Produto

if TYPE_CHECKING:
    from sqlalchemy.orm import Session

def read_products(db: "Session") -> "DataFrame":
    products = db.query(Produto).all()
    df = DataFrame({
        "id": product.id,
        "nome": product.nome,
        "quantidade": product.quantidade,
        "preco": product.preco,
    } for product in products)
    return df

def adjust_prices(df: DataFrame):
    df["preco"] = df["preco"].apply(lambda x: round(x * 1.05, 2))
    return df

def save_products(df: DataFrame, db: "Session"):
    for index, row in df.iterrows():
        product = Produto(id=row["id"], nome=row["nome"], quantidade=row["quantidade"], preco=row["preco"])
        if product.id is None:
            db.add(product)
        else:
            db.merge(product)
    db.commit()

def main():
    engine = create_engine("sqlite:///mercado.db")
    Session = sessionmaker(bind=engine)

    with Session() as session:
        products = read_products(session)
        adjust_prices(products)
        save_products(products, session)

if __name__ == "__main__":
    main()
