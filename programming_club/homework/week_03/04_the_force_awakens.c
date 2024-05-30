#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

#define BUF_SIZE 65536

typedef struct {
  int x;
  int y;
} point_t;

typedef struct node_t {
  point_t val;
  struct node_t *next;
} node_t;

// gcc-14 -o out 03_naming_roads.c -std=c99 -Wall -Werror -Wextra -O2

void buf_seek_and_readjust(char *buf, char *ptr, size_t *new_length) {
  // If ptr is not NULL and not the beginning of the buffer
  if (ptr && ptr != buf && *ptr != '\0') {
    // Handle remainder
    size_t len = strlen(ptr);
    // Move remainder to the beginning of the buffer
    memmove(buf, ptr, len);
    // Read more data from stdin
    ssize_t read_size = read(STDIN_FILENO, buf + len, BUF_SIZE - len - 1);
    buf[len + read_size] = '\0';
    *new_length = len + read_size;
  } else {
    // Read more data from stdin
    ssize_t read_size = read(STDIN_FILENO, buf, BUF_SIZE - 1);
    buf[read_size] = '\0';
    *new_length = read_size;
  }
}

node_t *append_node(node_t *head, point_t val) {
  node_t *self = malloc(sizeof(*self));
  *self = (node_t){val, NULL};

  node_t *current = head;
  while (current) {
    if (!current->next) {
      break;
    }
    current = current->next;
  }
  if (current) {
    current->next = self;
    return head;
  } else {
    return self;
  }
}

void free_nodes(node_t *head) {
  node_t *current = head;
  while (current) {
    node_t *next = current->next;
    free(current);
    current = next;
  }
}

int main(void) {
  char buf[BUF_SIZE];
  char *ptr = NULL;
  size_t len;

  buf_seek_and_readjust(buf, ptr, &len);
  ptr = buf;

  long map_height = strtol(ptr, &ptr, 10);
  long map_width = strtol(ptr, &ptr, 10);

  node_t *points_to_check = NULL;

  int map[map_height][map_width];

  for (long y = 0; y < map_height; y++) {
    for (long x = 0; x < map_width; x++) {
      int val = (int)strtol(ptr, &ptr, 10);
      map[y][x] = val;

      if (val == 42) {
        points_to_check = append_node(points_to_check, (point_t){x, y});
      }
    }
    buf_seek_and_readjust(buf, ptr, &len);
    ptr = buf;
  }

  bool found = false;

  node_t *current = points_to_check;
  while (current) {
    point_t point = current->val;
    int x = point.x;
    int y = point.y;

    if (x > 0 && x < map_width - 1 && y > 0 && y < map_height - 1) {
      if (map[y - 1][x - 1] == 7 && map[y - 1][x] == 7 &&
          map[y - 1][x + 1] == 7 && map[y][x - 1] == 7 && map[y][x + 1] == 7 &&
          map[y + 1][x - 1] == 7 && map[y + 1][x] == 7 &&
          map[y + 1][x + 1] == 7) {
        printf("%d %d\n", y + 1, x + 1);
        found = true;
        break;
      }
    }

    current = current->next;
  }

  if (!found) {
    printf("0 0\n");
  }

  free_nodes(points_to_check);

  return 0;
}
