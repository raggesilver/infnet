// gcc -o 5012 5012.c -std=c99 -O2 -lm

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(void) {
  char buffer[100];
  fgets(buffer, sizeof(buffer) - 1, stdin);
  char *ptr = buffer;

  int points;
  int passed;

  points = strtol(ptr, &ptr, 10);
  passed = strtol(ptr, &ptr, 10);

  int score = points * (passed / 10.f);

  printf("%d\n", score);

  return 0;
}
