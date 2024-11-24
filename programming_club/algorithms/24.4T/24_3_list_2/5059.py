n, k = map(int, input().split())
scores = list(map(int, input().split()))

min_score = scores[k - 1]

print(len([score for score in scores if score >= min_score and score > 0]))
