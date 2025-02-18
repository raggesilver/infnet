from sqlalchemy import Column, String, Date, DECIMAL, Integer
from .base import Base

class Employee(Base):
    __tablename__ = 'funcionarios'

    id = Column(Integer, primary_key=True)
    nome = Column(String(100), nullable=False)
    cargo = Column(String(50), nullable=False)
    departamento = Column(String(50), nullable=False)
    salario_base = Column(DECIMAL, nullable=False)
    data_admissao = Column(Date, nullable=False)
