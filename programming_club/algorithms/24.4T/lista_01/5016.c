// gcc -o 5016 5016.c -std=c99 -O2 -lm

#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX(a, b) ((a) > (b) ? (a) : (b))

int main(void) {
  char buffer[128];
  fgets(buffer, sizeof(buffer) - 1, stdin);
  char *ptr = buffer;

  int a = strtol(ptr, &ptr, 10);
  int b = strtol(ptr, &ptr, 10);
  int c = strtol(ptr, &ptr, 10);
  int d = strtol(ptr, NULL, 10);

  int max_one = MAX(a, b);
  int max_two = MAX(c, d);

  printf("%d\n", max_one + max_two);

  return 0;
}
