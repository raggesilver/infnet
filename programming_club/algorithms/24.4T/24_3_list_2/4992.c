// gcc -o 4939 4939.c -std=c99 -O2 -lm
//
// This is a sort of online judge ranking system. Each team may submit solutions
// to problems. The team with the most problems solved and the least score
// (time) is ranked first. If two teams have the same number of problems solved
// and the same score, the team with the lowest id is ranked first.
//
// Wrong submissions result in 20 minutes penalty. Wrong submissions to problems
// that were never solved do not count as penalty.

#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_PROBLEMS 255

typedef struct s_submission {
  int team;
  int submission_time;
  int problem;
  bool accepted;
} submission_t;

typedef struct s_team {
  int id;
  /**
   * The score is the sum of the time taken to solve each problem in seconds.
   * (lower is better)
   */
  int score;
  int solved_count;
  bool problems_solved[MAX_PROBLEMS];
} team_t;

// Order teams by number of problems solved, lowest score, then lowest id.
int sort_teams(const void *_a, const void *_b) {
  team_t *a = (team_t *)_a;
  team_t *b = (team_t *)_b;

  if (a->solved_count != b->solved_count) {
    return b->solved_count - a->solved_count;
  }

  if (a->score != b->score) {
    return a->score - b->score;
  }

  return a->id - b->id;
}

// Order by problem, submission time, team. This should group all
// submissions by problem.
int sort_submissions(const void *_a, const void *_b) {
  submission_t *a = (submission_t *)_a;
  submission_t *b = (submission_t *)_b;

  if (a->problem != b->problem) {
    return a->problem - b->problem;
  }
  if (a->submission_time != b->submission_time) {
    return a->submission_time - b->submission_time;
  }
  return a->team - b->team;
}

int main(void) {
  // C is the number of teams
  // N is the number of submissions
  int C, N;

  {
    char buffer[100];
    fgets(buffer, 99, stdin);
    char *ptr = buffer;
    C = strtol(ptr, &ptr, 10);
    N = strtol(ptr, NULL, 10);
  }

  submission_t submissions[N];
  team_t teams[C];

  for (size_t i = 0; i < N; i++) {
    char buffer[255];
    fgets(buffer, 254, stdin);

    int c, p, t, r;

    {
      char *ptr = buffer;
      c = strtol(ptr, &ptr, 10);
      p = strtol(ptr, &ptr, 10);
      t = strtol(ptr, &ptr, 10);
      r = strtol(ptr, NULL, 10);
    }

    submissions[i] = (submission_t){
        .team = c, .submission_time = t, .problem = p, .accepted = r == 1};
  }

  qsort(submissions, N, sizeof(submission_t), &sort_submissions);

  for (size_t i = 0; i < C; i++) {
    teams[i] = (team_t){0};
    teams[i].id = i + 1;
    memset(teams[i].problems_solved, 0, MAX_PROBLEMS);
  }

  int max_problem = 0;
  for (size_t i = 0; i < N; i++) {
    submission_t sub = submissions[i];
    team_t *team = &teams[sub.team - 1];

    team->problems_solved[sub.problem] =
        team->problems_solved[sub.problem] || sub.accepted == 1;

    if (sub.problem > max_problem) {
      max_problem = sub.problem;
    }
  }

  // Calculate the score for each team
  for (size_t team_id = 1; team_id <= C; team_id++) {
    team_t *team = &teams[team_id - 1];

    // Find all submissions for the current problem
    for (size_t j = 1; j <= max_problem; j++) {
      if (team->problems_solved[j] != true) {
        continue; // No penalty for unsolved problems
      }

      for (size_t i = 0; i < N; i++) {
        submission_t sub = submissions[i];
        if (sub.team == team_id && sub.problem == j) {
          if (sub.accepted) {
            team->score += sub.submission_time;
            team->solved_count++;
            break;
          } else {
            team->score += 20 * 60;
          }
        }
      }
    }
  }

  qsort(teams, C, sizeof(team_t), &sort_teams);

  for (size_t i = 0; i < C; i++) {
    printf("%s%d", i > 0 ? " " : "", teams[i].id);
  }
  printf("\n");

  return 0;
}
