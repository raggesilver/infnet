#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

#define BUF_SIZE 1024 * 1024

// https://judge.beecrowd.com/pt/runs/code/40246114
// gcc-14 -o out 03_bumpy_board.c -std=c99 -Wall -Werror -Wextra -O2

// Knight movements
typedef enum {
  E_MOVEMENT_UP_RIGHT = 1,
  E_MOVEMENT_RIGHT_UP,
  E_MOVEMENT_RIGHT_DOWN,
  E_MOVEMENT_DOWN_RIGHT,
  E_MOVEMENT_DOWN_LEFT,
  E_MOVEMENT_LEFT_DOWN,
  E_MOVEMENT_LEFT_UP,
  E_MOVEMENT_UP_LEFT,
} e_movement;

typedef struct {
  int x;
  int y;
} t_point;

#define compare_points(a, b) (a.x == b.x && a.y == b.y)

// These are the potholes on the board
static const t_point potholes[4] = {
  { 1, 3 },
  { 2, 3 },
  { 2, 5 },
  { 5, 4 },
};

// A list of all possible movements for a knight.
static const t_point combined_movements[9] = {
  // Dummy. Not used.
  { 0, 0 },
  // E_MOVEMENT_UP_RIGHT
  { 1, 2 },
  // E_MOVEMENT_RIGHT_UP
  { 2, 1 },
  // E_MOVEMENT_RIGHT_DOWN
  { 2, -1 },
  // E_MOVEMENT_DOWN_RIGHT
  { 1, -2 },
  // E_MOVEMENT_DOWN_LEFT
  { -1, -2 },
  // E_MOVEMENT_LEFT_DOWN
  { -2, -1 },
  // E_MOVEMENT_LEFT_UP
  { -2, 1 },
  // E_MOVEMENT_UP_LEFT
  { -1, 2 },
};

static bool can_move(t_point position, e_movement movement, t_point* result)
{
  position.x += combined_movements[movement].x;
  position.y += combined_movements[movement].y;

  for (int j = 0; j < 4; j++) {
    if (compare_points(position, potholes[j])) {
      return false;
    }
  }

  *result = position;
  return true;
}

int main(void)
{
  char buf[BUF_SIZE];
  read(STDIN_FILENO, buf, BUF_SIZE - 1);

  t_point position = { 4, 3 };

  char* ptr = buf;
  int   n   = strtol(ptr, &ptr, 10);

  int movement_count = 0;

  for (int i = 0; i < n; i++) {
    e_movement movement = strtol(ptr, &ptr, 10);

    movement_count++;
    if (!can_move(position, movement, &position)) {
      break;
    }
  }
  printf("%d\n", movement_count);
  return 0;
}
