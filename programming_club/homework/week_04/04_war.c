#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

#define BUF_SIZE 1024 * 1024 * 5 // 5MB

// https://judge.beecrowd.com/pt/runs/code/40246877
// gcc-14 -o out 03_bumpy_board.c -std=c99 -Wall -Werror -Wextra -O2

__attribute__((always_inline)) static inline int
cmp(const void* a, const void* b)
{
  return (*(int*)a - *(int*)b);
}

int main(void)
{
  char* buf = malloc(BUF_SIZE);
  read(STDIN_FILENO, buf, BUF_SIZE);
  char* ptr = buf;

  int n = strtol(ptr, &ptr, 10);

  int enemies[n];
  for (int i = 0; i < n; i++) {
    enemies[i] = strtol(ptr, &ptr, 10);
  }

  int allies[n];
  for (int i = 0; i < n; i++) {
    allies[i] = strtol(ptr, &ptr, 10);
  }

  // Sort the allies in ascending order
  qsort(allies, n, sizeof(int), cmp);
  qsort(enemies, n, sizeof(int), cmp);

  int* enemies_ptr = enemies;
  int* allies_ptr  = allies;
  int* strong_ptr  = allies + n - 1;
  int  battles_won = 0;

  for (int i = n - 1; i >= 0; i--) {
    if (*strong_ptr > enemies_ptr[i]) {
      battles_won++;
      if (strong_ptr == allies_ptr) {
        break;
      }
      strong_ptr--;
    }
  }

  printf("%d\n", battles_won);
  free(buf);
  return 0;
}
