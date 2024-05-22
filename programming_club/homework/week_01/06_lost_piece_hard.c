#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <strings.h>
#include <unistd.h>

#define BUF_SIZE 65536
#define INITIAL_NUMBER 2

// https://judge.beecrowd.com/en/custom-runs/code/1039810
// gcc -o lost 06_lost_piece_hard.c -std=c99 -O2 -lm -Wall -Werror -Wextra

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

int main() {
  char buf[BUF_SIZE];
  size_t len;

  // Read from stdin
  buf_seek_and_readjust(buf, NULL, &len);

  char *ptr = buf;
  // N is the lagerst number in the list.
  long n = strtol(ptr, &ptr, 10);
  if (*ptr == '\n') {
    ptr++;
  }

  // This is where we keep track of which numbers we've read
  char *map = malloc(sizeof(*map) * (n + 1));
  bzero(map, n + 1);

  for (long i = INITIAL_NUMBER; i < n; i++) {
    char *end = strchr(ptr, ' ') ?: strchr(ptr, '\n');
    if (!end) {
      buf_seek_and_readjust(buf, ptr, &len);
      ptr = buf;
      // We don't check for end again because we assume the input is correct
    }
    long num = strtol(ptr, &ptr, 10);
    map[num] = 1;
    ptr++;
  }

  for (long i = INITIAL_NUMBER; i <= n; i++) {
    if (map[i] == 0) {
      printf("%ld\n", i);
      break;
    }
  }

  free(map);
  return 0;
}
