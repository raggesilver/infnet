// gcc -o 5014 5014.c -std=c99 -O2 -lm

#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(void) {
  char buffer[100];
  fgets(buffer, sizeof(buffer) - 1, stdin);
  char *ptr = buffer;

  int a = strtol(ptr, &ptr, 10);
  int b = strtol(ptr, &ptr, 10);
  int c = strtol(ptr, NULL, 10);

  printf("%s\n", ((a + b) / 2.f) > c ? "YES" : "NO");

  return 0;
}
