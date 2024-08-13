#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

#define BUF_SIZE 65536

// https://judge.beecrowd.com/en/runs/code/39887918
// gcc -o turn 03_whose_turn.c -std=c99 -O2 -lm -Wall -Werror -Wextra

typedef enum {
  EVEN = 0,
  ODD = 1,
} play_e;

void buf_seek_and_readjust(char *buf, char *ptr, size_t *new_length) {
  // If ptr is not NULL and not the beginning of the buffer
  if (ptr && ptr != buf && *ptr != '\0') {
    // Handle remainder
    size_t len = strlen(ptr);
    // Move remainder to the beginning of the buffer
    memmove(buf, ptr, len);
    // Read more data from stdin
    ssize_t read_size = read(STDIN_FILENO, buf + len, BUF_SIZE - len - 1);
    buf[len + read_size] = '\0';
    *new_length = len + read_size;
  } else {
    // Read more data from stdin
    ssize_t read_size = read(STDIN_FILENO, buf, BUF_SIZE - 1);
    buf[read_size] = '\0';
    *new_length = read_size;
  }
}

int main(void) {
  char buf[BUF_SIZE];
  char *ptr = NULL;
  size_t len;

  char player1[101];
  char player2[101];
  play_e player1_play;

  buf_seek_and_readjust(buf, ptr, &len);
  ptr = buf;

  long n = strtol(ptr, &ptr, 10);
  ptr++;

  for (long i = 0; i < n; i++) {
    // Read player name until space
    char *space = strchr(ptr, ' ');
    strncpy(player1, ptr, space - ptr);
    player1[space - ptr] = '\0';
    // Move pointer to the character after the space
    ptr = space + 1;
    // Read player play based on the first character
    player1_play = *ptr == 'P' ? EVEN : ODD;
    // Move pointer to second player's name
    ptr = player1_play == EVEN ? ptr + 4 : ptr + 6;

    space = strchr(ptr, ' ');
    strncpy(player2, ptr, space - ptr);
    player2[space - ptr] = '\0';
    // Move pointer to second player's play
    ptr = space + 1;

    // We can ignore the second player's play
    ptr = (player1_play == EVEN ? ptr + 6 : ptr + 4);

    long player1_number = strtol(ptr, &ptr, 10);
    ptr++;
    long player2_number = strtol(ptr, &ptr, 10);
    ptr++;

    play_e result = (player1_number + player2_number) & 1 ? ODD : EVEN;

    printf("%s\n", result == player1_play ? player1 : player2);
  }

  return 0;
}
