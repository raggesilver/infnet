#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

// https://judge.beecrowd.com/en/runs/code/39754423
// gcc -o basic 02_extremely_basic.c -std=c99 -O2 -lm -Wall -Werror -Wextra

char *read_line(void) {
  static char buf[100];

  size_t length = read(STDIN_FILENO, buf, 99);
  buf[length] = 0;

  return buf;
}

int main(void) {
  char *ptr = read_line();

  long a = strtol(ptr, &ptr, 10);

  // In terminal mode `read()` may return on the first newline. However, calling
  // this program with `basic <<EOF ... EOF` will return all input in a single
  // read. If there's no more data after the first number we must read again.
  if (*ptr == 0 || *(ptr + 1) == 0) {
    ptr = read_line();
  }

  long b = strtol(ptr, NULL, 10);

  printf("X = %ld\n", a + b);

  return 0;
}
