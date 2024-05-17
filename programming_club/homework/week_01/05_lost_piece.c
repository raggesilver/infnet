#include <errno.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

#define BUF_SIZE 8192

// https://judge.beecrowd.com/en/runs/code/39754701
// gcc -o lost 05_lost_piece.c -std=c99 -O2 -lm -Wall -Werror -Wextra

char *read_line(void) {
  static char buf[BUF_SIZE];

  size_t length = read(STDIN_FILENO, buf, BUF_SIZE - 1);
  buf[length] = 0;

  return buf;
}

int main(void) {
  char *ptr = read_line();
  long n = strtol(ptr, &ptr, 10);

  char map[1001] = {0};

  // read n - 1 numbers
  for (long i = 0; i < n - 1; i++) {
    ptr++;
    long num = strtol(ptr, &ptr, 10);
    map[num] = 1;
  }

  for (long i = 1; i <= n; i++) {
    if (map[i] == 0) {
      printf("%ld\n", i);
      break;
    }
  }

  return 0;
}
