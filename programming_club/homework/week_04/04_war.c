#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

#define BUF_SIZE 1024 * 1024 * 5 // 5MB

// gcc-14 -o out 03_bumpy_board.c -std=c99 -Wall -Werror -Wextra -O2

__attribute__((always_inline)) static inline int
cmp(const void* a, const void* b)
{
  return (*(int*)a - *(int*)b);
}

bool battle(int** allies_ref, int* allies_count, int enemy)
{
  int* allies     = *allies_ref;
  bool can_win    = false;
  int  ally_index = -1;

  for (int i = 0; i < *allies_count; i++) {
    if (allies[i] > enemy) {
      can_win    = true;
      ally_index = i;
      break;
    }
  }

  if (can_win) {
    // If the used ally is the first element of the array, we don't need to
    // shift the elements. Simply increment the pointer.
    if (ally_index == 0) {
      *allies_ref = allies + 1;
    }
    // Otherwise, we need to shift the elements to the left.
    else {
      for (int i = ally_index; i < *allies_count - 1; i++) {
        allies[i] = allies[i + 1];
      }
    }
    (*allies_count)--;
  } else {
    // If we can't win, we need to remove the weakest ally. This is always the
    // first element of the array.
    *allies_ref = allies + 1;
    (*allies_count)--;
  }

  return can_win;
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
  int allies_count = n;
  for (int i = 0; i < n; i++) {
    allies[i] = strtol(ptr, &ptr, 10);
  }

  // Sort the allies in ascending order
  qsort(allies, n, sizeof(int), cmp);

  int* allies_ptr  = allies;
  int  battles_won = 0;

  for (int i = 0; i < n; i++) {
    if (battle(&allies_ptr, &allies_count, enemies[i])) {
      battles_won++;
    }
  }

  printf("%d\n", battles_won);
  free(buf);
  return 0;
}
