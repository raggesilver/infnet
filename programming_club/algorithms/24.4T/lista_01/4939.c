// gcc -o 4939 4939.c -std=c99 -O2 -lm

#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// I don't know how to make fgets read a line without the newline character
// so we'll compare the strings with the newline character
const char *high_cards[] = {"jack\n", "queen\n", "king\n", "ace\n", NULL};

typedef struct s_play {
  char player;
  int points;
  int count;
} play_t;

int strvfind(char *str, const char *vstr[]) {
  for (int i = 0; vstr[i] != NULL; i++) {
    if (strcmp(str, vstr[i]) == 0) {
      return i;
    }
  }
  return -1;
}

int main(void) {
  int player_a_score = 0;
  int player_b_score = 0;
  char buff[40];

  bool has_high_play = false;
  play_t high_play = {0};

  for (size_t i = 0; i < 52; i++) {
    fgets(buff, 39, stdin);

    int high_card = strvfind(buff, high_cards);

    if (high_card != -1) {
      has_high_play = true;
      high_play = (play_t){.player = (i % 2) + 'A',
                           .points = high_card + 1,
                           .count = high_card + 1};
    } else if (has_high_play) {
      if (high_play.count > 1) {
        high_play.count--;
        continue;
      }
      if (high_play.player == 'A') {
        player_a_score += high_play.points;
      } else {
        player_b_score += high_play.points;
      }
      printf("Player %c scores %d point(s).\n", high_play.player,
             high_play.points);
      has_high_play = false;
      high_play = (play_t){0};
    }
  }
  printf("Player A: %d point(s).\n", player_a_score);
  printf("Player B: %d point(s).\n", player_b_score);
  return 0;
}
