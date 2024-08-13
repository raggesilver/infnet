#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

// https://judge.beecrowd.com/en/runs/code/40859008

// Washer works only if you put at least LA clothes and at most LB clothes.
// Similarly, dryer works only if you put at least SA clothes and at most SB
// clothes.

#define BUF_SIZE 1048576 // 1MB

int main(void) {
  char buf[BUF_SIZE];
  size_t len = read(STDIN_FILENO, buf, BUF_SIZE - 1);

  buf[len] = '\0';
  char *ptr = buf;

  long LA, LB, SA, SB, N;

  N = strtol(ptr, &ptr, 10);
  LA = strtol(ptr, &ptr, 10);
  LB = strtol(ptr, &ptr, 10);
  SA = strtol(ptr, &ptr, 10);
  SB = strtol(ptr, &ptr, 10);

  bool possible = N >= LA && N <= LB && N >= SA && N <= SB;

  printf("%s\n", possible ? "possivel" : "impossivel");

  return 0;
}
