#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

// https://judge.beecrowd.com/pt/runs/code/39973177
// gcc-14 -o out 01_fill_array.c -std=c99 -Wall -Werror -Wextra -O2

int main(void) {
  char buf[10];

  ssize_t read_size = read(STDIN_FILENO, buf, 9);
  buf[read_size] = '\0';

  long num = strtol(buf, NULL, 10);

  int numbers[10];

  numbers[0] = num;
  for (int i = 1; i < 10; i++) {
    numbers[i] = numbers[i - 1] * 2;
  }

  for (int i = 0; i < 10; i++) {
    printf("N[%d] = %d\n", i, numbers[i]);
  }

  return 0;
}
