// gcc -o 5013 5013.c -std=c99 -O2 -lm

#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(void) {
  char buffer[100];
  fgets(buffer, sizeof(buffer) - 1, stdin);
  char *ptr = buffer;

  int days_to_take_meds = strtol(ptr, &ptr, 10);
  int meds_chef_has = strtol(ptr, &ptr, 10);

  bool has_enough = meds_chef_has >= (days_to_take_meds * 3);

  printf("%s\n", has_enough ? "YES" : "NO");

  return 0;
}
