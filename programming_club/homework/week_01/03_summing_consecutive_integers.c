#include <errno.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

#define BUF_SIZE 1024

// https://judge.beecrowd.com/en/runs/code/39754555
// gcc -o summing 03_summing_consecutive_integers.c -std=c99 -O2 -lm -Wall
// -Werror -Wextra

char *read_line(void) {
  static char buf[BUF_SIZE];

  size_t length = read(STDIN_FILENO, buf, BUF_SIZE - 1);
  buf[length] = 0;

  return buf;
}

int main(void) {
  char *ptr = read_line();
  long a = strtol(ptr, &ptr, 10);
  long n = 0;

  while (n <= 0) {
    ptr++;
    n = strtol(ptr, &ptr, 10);
  }

  long total = 0;

  for (long i = 0; i < n; i++) {
    total += a + i;
  }

  printf("%ld\n", total);

  return 0;
}
