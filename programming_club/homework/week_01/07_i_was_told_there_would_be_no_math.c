#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <strings.h>
#include <unistd.h>

#define BUF_SIZE 65536

// https://judge.beecrowd.com/en/custom-runs/code/1039811
// gcc -o no_math 07_i_was_told_there_would_be_no_math.c -std=c99 -O2 -lm -Wall
// -Werror -Wextra

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
  // N is the number of lines in the input
  long n = strtol(ptr, &ptr, 10);
  if (*ptr == '\n') {
    ptr++;
  }

  unsigned long long result = 0;

  for (long i = 0; i < n; i++) {
    char *end = strchr(ptr, '\n');
    if (!end) {
      buf_seek_and_readjust(buf, ptr, &len);
      ptr = buf;
      // We don't check for end again because we assume the input is correct
    }
    long l = strtol(ptr, &ptr, 10);
    ptr++;
    long w = strtol(ptr, &ptr, 10);
    ptr++;
    long h = strtol(ptr, &ptr, 10);
    ptr++;

    long *sides = l > w && l > h ? (long[]){w, h}
                  : w > h        ? (long[]){l, h}
                                 : (long[]){l, w};

    result += 2 * l * w + 2 * w * h + 2 * h * l + sides[0] * sides[1];
  }

  printf("%llu\n", result);

  return 0;
}
