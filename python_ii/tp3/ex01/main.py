from pandas import read_excel, ExcelWriter
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from pandas import DataFrame


def read_products(file_path: str) -> "DataFrame":
    df = read_excel(file_path)
    df["preco"] = df["preco"].astype(float)
    return df

def adjust_prices(df: "DataFrame") -> "DataFrame":
    result = df.copy()
    result["preco"] = result["preco"].apply(lambda x: round(x * 1.05, 2))
    return result

def save_products(file_path: str, data: list[tuple[str, "DataFrame"]]) -> None:
    with ExcelWriter(file_path) as writer:
        for sheet_name, df in data:
            df.to_excel(writer, index=False, sheet_name=sheet_name)

def main():
    SOURCE_FILE = "produtos.xlsx"
    TARGET_FILE = "produtos2.xlsx"
    df = read_products(SOURCE_FILE)
    adjusted = adjust_prices(df)
    save_products(TARGET_FILE, [("Antes", df), ("Depois", adjusted)])

if __name__ == "__main__":
    main()
