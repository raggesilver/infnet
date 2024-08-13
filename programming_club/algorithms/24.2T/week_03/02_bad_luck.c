#include <stdbool.h>
#include <stdio.h>
#include <unistd.h>

// https://judge.beecrowd.com/pt/runs/code/39974035
// gcc-14 -o out 02_bad_luck.c -std=c99 -Wall -Werror -Wextra -O2

int main(void) {
  char buf[20];

  ssize_t read_size = read(STDIN_FILENO, buf, 20);
  buf[read_size] = '\0';

  if (read_size > 1 && buf[read_size - 1] == '\n') {
    buf[read_size - 1] = '\0';
  }

  bool is_bad_luck = false;

  const char *ptr = buf;

  while (*ptr) {
    if (*ptr == '1' && *(ptr + 1) == '3') {
      is_bad_luck = true;
      break;
    }
    ptr++;
  }

  printf("%s %s\n", buf,
         is_bad_luck ? "es de Mala Suerte" : "NO es de Mala Suerte");

  return 0;
}
