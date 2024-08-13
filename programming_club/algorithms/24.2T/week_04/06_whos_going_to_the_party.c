#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

#define BUF_SIZE 1024 * 1024 * 5 // 5MB
#define MAX_GUESTS 1005

// gcc-14 -o out 06_whos_going_to_the_party.c -std=c99 -Wall -Werror -Wextra -O2

typedef struct t_node {
  int64_t person;

  struct t_node* next;
} t_node;

t_node* create_node(int64_t person)
{
  t_node* self = malloc(sizeof(*self));

  *self = (t_node) {
    .person = person,
    .next   = NULL,
  };

  return self;
}

int main(void)
{
  char*  buf   = malloc(BUF_SIZE);
  size_t bytes = read(STDIN_FILENO, buf, BUF_SIZE - 1);

  buf[bytes] = '\0';
  char* ptr  = buf;

  int64_t n;

  while ((n = strtoll(ptr, &ptr, 10)) > 0) {
    t_node guests[MAX_GUESTS] = { 0 };

    for (int64_t i = 0; i < n; ++i) {
      // Move cursor to the next pair
      ptr = strchr(ptr, '(');

      const int64_t x = strtoll(ptr, &ptr, 10);

      ++ptr;
      const int64_t y = strtoll(ptr, &ptr, 10);

      guests[x] = (t_node) { y, &guests[y] };
      guests[y] = (t_node) { x, &guests[x] };
    }
  }

  free(buf);
  return 0;
}
