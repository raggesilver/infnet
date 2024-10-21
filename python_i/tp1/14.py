from common import get_int, get_yes_or_no

votes = {"Windows": 0, "Mac": 0, "Linux": 0}


def prompt_vote():
    vote = get_int(
        """1 - Windows
2 - Mac
3 - Linux

Qual seu sistema operacional favorito? """
    )
    votes[list(votes.keys())[vote - 1]] += 1


def show_votes():
    for key, value in votes.items():
        print(f"{key}: {value}")


while True:
    prompt_vote()
    print()
    show_votes()
    print()
    if not get_yes_or_no("Continuar votando?", default="s"):
        break
    print()
