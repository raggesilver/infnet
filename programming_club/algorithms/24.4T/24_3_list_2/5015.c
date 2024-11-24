// gcc -o 5015 5015.c -std=c99 -O2 -lm

#include <math.h>
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(void) {
  char buffer[100];
  fgets(buffer, sizeof(buffer) - 1, stdin);
  char *ptr = buffer;

  int friends = strtol(ptr, &ptr, 10);
  int cost = strtol(ptr, &ptr, 10);

  int min_subcriptions = ceil(friends / 6.f);

  printf("%d\n", min_subcriptions * cost);

  return 0;
}
