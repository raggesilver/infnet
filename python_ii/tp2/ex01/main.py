from os import path

FILE = path.join(path.dirname(__file__), "nomes.txt")


def ensure_file(path: str):
    with open(path, "w+") as f:
        f.write(
            """Maria
Luiz
Felipe
Clara
Luiza
João
José
Roberto"""
        )


def read_names(path: str):
    with open(path, "r") as f:
        return [n.strip() for n in f.readlines()]


def write_names(path: str, names: list):
    with open(path, "w+") as f:
        f.write("\n".join(names))


def main():
    ensure_file(FILE)
    names = read_names(FILE)
    # print(*[f"'{name.strip()}'" for name in names], sep="\n")
    sorted_names = sorted(names)
    # print(*[f"'{name.strip()}'" for name in sorted_names], sep="\n")
    write_names(FILE, sorted_names)


if __name__ == "__main__":
    main()
