from typing import Tuple, TypedDict, List
from common import read_int


class StudentEntry(TypedDict):
    """
    Represents a student entry.
    """

    name: str
    grades: Tuple[float, float]
    average: float


def read_students() -> List[StudentEntry]:
    """
    Read students from the user and calculate their average.
    """
    students: List[StudentEntry] = []
    while (name := input("Digite o nome do aluno: ")) != "FIM":
        grade1 = read_int("Digite a primeira nota do aluno: ")
        grade2 = read_int("Digite a segunda nota do aluno: ")

        student: StudentEntry = {
            "name": name,
            "grades": (grade1, grade2),
            "average": round((grade1 + grade2) / 2),
        }
        students.append(student)

    return students


def main():
    """
    This program reads student entries from the user, then calculates their
    average grades, prints their status (grades and if they passed or not) and
    the class average.
    """
    students = read_students()
    avg = 0

    print()
    for student in students:
        status = "aprovado" if student["average"] >= 6 else "prova final"
        print(f"{student['name']} teve média {student['average']}. {status}.")

        avg += student["average"]

    avg /= max(len(students), 1)
    print(f"A média da turma foi {avg}.")


if __name__ == "__main__":
    main()
