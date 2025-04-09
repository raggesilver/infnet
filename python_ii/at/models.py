from sqlalchemy import Column, Float, ForeignKey, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()


class Cliente(Base):
    """Cliente model representing a customer in the supermarket."""

    __tablename__ = "cliente"

    id_cliente = Column(Integer, primary_key=True, autoincrement=True)
    nome = Column(String(50), nullable=False)

    # Relationships
    compras = relationship("Compra", back_populates="cliente")

    def __repr__(self):
        return f"Cliente(id_cliente={self.id_cliente}, nome='{self.nome}')"


class Produto(Base):
    """Produto model representing a product in the supermarket."""

    __tablename__ = "produto"

    id_produto = Column(Integer, primary_key=True, autoincrement=True)
    nome = Column(String(50), nullable=False)
    quantidade = Column(Integer, nullable=False)
    preco = Column(Float, nullable=False)

    # Relationships
    itens = relationship("Item", back_populates="produto")

    def __repr__(self):
        return f"Produto(id_produto={self.id_produto}, nome='{self.nome}', quantidade={self.quantidade}, preco={self.preco})"


class Compra(Base):
    """Compra model representing a purchase transaction."""

    __tablename__ = "compra"

    id_compra = Column(Integer, primary_key=True, autoincrement=True)
    data_compra = Column(String(30), nullable=False)
    id_cliente = Column(Integer, ForeignKey("cliente.id_cliente"), nullable=False)

    # Relationships
    cliente = relationship("Cliente", back_populates="compras")
    itens = relationship("Item", back_populates="compra")

    def __repr__(self):
        return f"Compra(id_compra={self.id_compra}, data_compra='{self.data_compra}', id_cliente={self.id_cliente})"


class Item(Base):
    """Item model representing a product in a purchase."""

    __tablename__ = "item"

    id_item = Column(Integer, primary_key=True, autoincrement=True)
    quantidade = Column(Integer, nullable=False)
    id_compra = Column(Integer, ForeignKey("compra.id_compra"), nullable=False)
    id_produto = Column(Integer, ForeignKey("produto.id_produto"), nullable=False)

    # Relationships
    compra = relationship("Compra", back_populates="itens")
    produto = relationship("Produto", back_populates="itens")

    def __repr__(self):
        return f"Item(id_item={self.id_item}, quantidade={self.quantidade}, id_compra={self.id_compra}, id_produto={self.id_produto})"
