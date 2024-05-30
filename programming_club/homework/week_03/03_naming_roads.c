#include <math.h>
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

#define BUF_SIZE 65536

// https://judge.beecrowd.com/pt/runs/code/39974480
// gcc-14 -o out 03_naming_roads.c -std=c99 -Wall -Werror -Wextra -O2

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

  size_t count = 0;

  while (1) {
    buf_seek_and_readjust(buf, ptr, &len);
    ptr = buf;
    long roads_to_name = strtol(ptr, &ptr, 10);
    long max_digits = strtol(ptr, &ptr, 10);

    if (roads_to_name == 0 && max_digits == 0) {
      break;
    }

    int min_characters = ceil((double)roads_to_name / max_digits) - 1;

    if (min_characters > 26) {
      printf("Case %zu: impossible\n", ++count);
      continue;
    }

    printf("Case %zu: %d\n", ++count, min_characters);
  }

  return 0;
}
