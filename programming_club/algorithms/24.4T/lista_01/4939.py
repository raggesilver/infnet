"""
For some reason this program is causing a runtime error on the online judge.
It works fine on my machine.
"""

high_cards = {
    "ace": 4,
    "king": 3,
    "queen": 2,
    "jack": 1,
}

high_play = None

player_points = {"A": 0, "B": 0}

for i in range(52):
    card = input()
    if card in high_cards:
        high_play = ("A" if i % 2 == 0 else "B", high_cards[card], card)
    elif high_play is not None:
        player, remaining, card_ = high_play
        if remaining - 1 > 0:
            high_play = (player, remaining - 1, card_)
            continue
        points = high_cards[card_]
        print(f"Player {player} scores {points} point(s).")
        high_play = None
        player_points[player] += points

print(f"Player A: {player_points["A"]} point(s).")
print(f"Player B: {player_points["B"]} point(s).")
