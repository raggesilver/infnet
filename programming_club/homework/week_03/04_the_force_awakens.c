#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

#define BUF_SIZE 4194304

// https://judge.beecrowd.com/pt/runs/code/39977228
// gcc-14 -o out 04_the_force_awakens.c -std=c99 -Wall -Werror -Wextra -O2

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
  char *buf = malloc(BUF_SIZE);
  char *ptr = NULL;
  size_t len;
  bool found = false;

  buf_seek_and_readjust(buf, ptr, &len);
  ptr = buf;

  long map_height = strtol(ptr, &ptr, 10);
  long map_width = strtol(ptr, &ptr, 10);

  int map[map_height][map_width];

  for (long y = 0; y < map_height; y++) {
    for (long x = 0; x < map_width; x++) {
      int val = (int)strtol(ptr, &ptr, 10);
      map[y][x] = val;

      if (val == 7 && x > 1 && y > 1) {
        if (map[y - 1][x - 1] == 42 && map[y - 2][x - 2] == 7 &&
            map[y - 2][x - 1] == 7 && map[y - 2][x] == 7 &&
            map[y - 1][x - 2] == 7 && map[y - 1][x] == 7 &&
            map[y][x - 2] == 7 && map[y][x - 1] == 7) {
          found = true;
          printf("%ld %ld\n", y, x);
          goto after_loop;
        }
      }
    }
  }
after_loop:

  if (!found) {
    printf("0 0\n");
  }

  free(buf);
  return 0;
}
