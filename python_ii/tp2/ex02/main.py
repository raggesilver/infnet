from pandas import read_excel, concat
from glob import glob
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from pandas import DataFrame


def read_products(files: list[str]) -> "DataFrame":
    dfs = []
    for file in files:
        dfs.append(read_excel(file))
    df = concat(dfs)
    df["preco"] = df["preco"].astype(float)
    return df

def adjust_prices(df: "DataFrame") -> "DataFrame":
    result = df.copy()
    result["preco"] = df["preco"].apply(lambda x: round(x * 1.05, 2))
    return result

def save_products(df: "DataFrame", file_path: str) -> None:
    df.to_excel(file_path, index=False)

def main():
    OUTPUT_FILE = "produtos.xlsx"
    input_files = glob("produtos[0-9]*.xlsx")

    df = read_products(input_files)
    adjust_prices(df)
    save_products(df, OUTPUT_FILE)

if __name__ == "__main__":
    main()
