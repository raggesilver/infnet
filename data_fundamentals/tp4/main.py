import json
from typing import TYPE_CHECKING

import mysql.connector
import pandas as pd

if TYPE_CHECKING:
    from mysql.connector.abstracts import MySQLCursorAbstract


SOURCE_CSV = "dados_criminalidade.csv"
RESULT_JSON = "resultado.json"


def ensure_db(cursor: "MySQLCursorAbstract"):
    """
    Ensure that the database is created and the table is created. Drops the
    table if it already exists.
    """
    cursor.execute("DROP TABLE IF EXISTS crimes")

    cursor.execute(
        """
    CREATE TABLE IF NOT EXISTS crimes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      data DATE NOT NULL,
      tipo VARCHAR(100) NOT NULL,
      localizacao VARCHAR(100) NOT NULL,
      hora TIME NOT NULL,
      gravidade VARCHAR(20) NOT NULL,
      sexo VARCHAR(1) DEFAULT NULL,
      idade INT DEFAULT NULL,
      status VARCHAR(20) NOT NULL
    )
    """
    )


def read_df(source: str) -> pd.DataFrame:
    """
    Read the source CSV file and return a DataFrame.
    """
    return pd.read_csv(source, sep=";")


def write_json(result: dict, path: str):
    """
    Write the result dictionary to a JSON file.
    """
    with open(path, "w", encoding="utf-8") as f:
        json.dump(result, f, ensure_ascii=False, indent=2)


def get_crimes_for_month(cursor: "MySQLCursorAbstract", month: int, year: int):
    cursor.execute(
        "SELECT * FROM crimes WHERE MONTH(data) = %s AND YEAR(data) = %s",
        (month, year),
    )

    return cursor.fetchall()


def get_most_common_crime_type_by_region(
    cursor: "MySQLCursorAbstract", region: str
) -> str | None:
    cursor.execute(
        "SELECT tipo, COUNT(*) as ocorrencias FROM crimes WHERE localizacao = %s GROUP BY tipo ORDER BY ocorrencias DESC LIMIT 1",
        (region,),
    )

    res = cursor.fetchall()
    return res[0][0] if res else None


def get_solved_crimes(cursor: "MySQLCursorAbstract"):
    cursor.execute("SELECT * FROM crimes WHERE status = 'Concluído'")

    return cursor.fetchall()


def get_most_common_criminal_age(cursor: "MySQLCursorAbstract") -> int | None:
    cursor.execute(
        "SELECT idade, COUNT(*) as ocorrencias FROM crimes WHERE idade IS NOT NULL GROUP BY idade ORDER BY ocorrencias DESC LIMIT 1"
    )

    res = cursor.fetchall()
    return res[0][0] if res else None


def get_crime_hour_pattern(cursor: "MySQLCursorAbstract") -> list[tuple[str, int, int]]:
    cursor.execute(
        """
        SELECT tipo, hora_do_dia, quantidade FROM (
            SELECT 
                HOUR(hora) as hora_do_dia,
                tipo,
                COUNT(*) as quantidade,
                ROW_NUMBER() OVER (PARTITION BY tipo ORDER BY COUNT(*) DESC) as rank_num
            FROM crimes
            GROUP BY HOUR(hora), tipo
        ) AS crime_stats
        WHERE rank_num = 1
        ORDER BY quantidade DESC;
        """
    )

    res = cursor.fetchall()
    return res or []


def get_violent_crime_percentage(cursor: "MySQLCursorAbstract") -> float:
    cursor.execute(
        """SELECT
    COUNT(*) AS quantidade,
    ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM crimes), 2) AS percentual
FROM crimes
WHERE gravidade IN ('Grave', 'Crítica')"""
    )

    res = cursor.fetchall()
    return res[0][1] if res else 0.0


conn = mysql.connector.connect(
    host="localhost", user="admin", password="admin", database="infnet_tp4"
)

cursor = conn.cursor()

ensure_db(cursor)
df = read_df(SOURCE_CSV)

values: list[tuple] = []
for _, row in df.iterrows():
    row = row.to_dict()

    values.append(
        (
            row["Data"],
            row["Tipo de Crime"],
            row["Localização"],
            row["Hora"],
            row["Gravidade"],
            (
                str(row["Sexo do Suspeito"])[0].lower()
                if row["Sexo do Suspeito"] != "Não identificado"
                else None
            ),
            (
                int(row["Idade do Suspeito"])
                if row["Idade do Suspeito"] != "Desconhecida"
                else None
            ),
            row["Status da Investigação"],
        )
    )

cursor.executemany(
    "INSERT INTO crimes(data, tipo, localizacao, hora, gravidade, sexo, idade, status) VALUES(%s, %s, %s, %s, %s, %s, %s, %s)",
    values,
)
conn.commit()

# Question 1
august_2024_crimes = get_crimes_for_month(cursor, 8, 2024)
# Question 2
most_common_crime_in_peixoto = get_most_common_crime_type_by_region(cursor, "Peixoto")
# Question 3
solved_crimes = get_solved_crimes(cursor)
# Question 4
most_common_criminal_age = get_most_common_criminal_age(cursor)
# Question 5
crime_hour_pattern = get_crime_hour_pattern(cursor)
# Question 6
violent_crime_percentage = get_violent_crime_percentage(cursor)

# print("Crimes in August 2024:", len(august_2024_crimes))
# print("Most common crime in Peixoto:", most_common_crime_in_peixoto)
# print("Solved crimes:", len(solved_crimes))
# print("Most common criminal age:", most_common_criminal_age)
# print("Crime hour pattern:", crime_hour_pattern)
# print("Violent crime percentage:", violent_crime_percentage)

result = {
    "Crimes em agosto de 2024": len(august_2024_crimes),
    "Tipo de crime mais comum em Peixoto": most_common_crime_in_peixoto,
    "Crimes resolvidos": len(solved_crimes),
    "Idade mais comum dos criminosos": most_common_criminal_age,
    "Padrão de horário dos crimes": {
        pat[0]: f"{pat[1]}:00 até {pat[1]}:59 ({pat[2]})" for pat in crime_hour_pattern
    },
    "Porcentagem de crimes violentos": f"{violent_crime_percentage:.2f}%",
}

write_json(result, RESULT_JSON)
