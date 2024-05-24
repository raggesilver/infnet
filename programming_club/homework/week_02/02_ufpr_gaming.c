#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

#define BUF_SIZE 65536

#define LEAGUE_ID 1
#define COUNTER_ID 0

// https://judge.beecrowd.com/en/runs/code/39887110
// gcc -o ufpr 02_ufpr_gaming.c -std=c99 -O2 -lm -Wall -Werror -Wextra

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

  while (1) {
    // The worst case scenario is n = 1000. Each line has about 7 characters, so
    // the whole buffer should fit a little more than 7010 characters.
    buf_seek_and_readjust(buf, ptr, &len);

    if (len == 0) {
      break;
    }

    ptr = buf;

    long response = 0;
    long n = strtol(ptr, &ptr, 10);
    ptr++;
    long my_id = strtol(ptr, &ptr, 10);
    ptr++;

    for (long i = 0; i < n; i++) {
      long player_id = strtol(ptr, &ptr, 10);
      ptr++;
      long game_id = *ptr - '0';
      ptr++;
      if (*ptr) {
        ptr++;
      }
      if (game_id == COUNTER_ID && player_id == my_id) {
        response++;
      }
    }
    printf("%ld\n", response);
  }
  return 0;
}
