from pandas import read_excel
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from pandas import DataFrame


def read_products(file_path: str) -> "DataFrame":
    df = read_excel(file_path)
    df["preco"] = df["preco"].astype(float)
    return df

def adjust_prices(df: "DataFrame") -> None:
    df["preco"] = df["preco"] * 1.05 # Increase prices by 5%
    pass

def save_products(df: "DataFrame", file_path: str) -> None:
    df.to_excel(file_path, index=False)

def main():
    f = "produtos.xlsx"
    df = read_products(f)
    print("Produtos antes do ajuste de preços:\n")
    print(df)
    adjust_prices(df)
    save_products(df, f)
    print("\n\nProdutos após o ajuste de preços:\n")
    print(df)

if __name__ == "__main__":
    main()
