#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

#define BUF_SIZE 1024 * 1024 * 5 // 5 MB

// https://judge.beecrowd.com/pt/runs/code/40245087
// gcc-14 -o out 01_in_debt.c -std=c99 -Wall -Werror -Wextra -O2

void buf_seek_and_readjust(char* buf, char* ptr, size_t* new_length)
{
  // If ptr is not NULL and not the beginning of the buffer
  if (ptr && ptr != buf && *ptr != '\0') {
    // Handle remainder
    size_t len = strlen(ptr);
    // Move remainder to the beginning of the buffer
    memmove(buf, ptr, len);
    // Read more data from stdin
    ssize_t read_size    = read(STDIN_FILENO, buf + len, BUF_SIZE - len - 1);
    buf[len + read_size] = '\0';
    *new_length          = len + read_size;
  } else {
    // Read more data from stdin
    ssize_t read_size = read(STDIN_FILENO, buf, BUF_SIZE - 1);
    buf[read_size]    = '\0';
    *new_length       = read_size;
  }
}

int main(void)
{
  char   buf[BUF_SIZE];
  char*  ptr;
  size_t length = 0;
  buf_seek_and_readjust(buf, NULL, &length);

  ptr = buf;
  while (true) {
    int n = strtol(ptr, &ptr, 10);

    if (n == -1)
      break;

    int debt   = 0;
    int visits = 0;
    for (int i = 0; i < n; i++) {
      debt += strtol(ptr, &ptr, 10);
      if (debt % 100 == 0) {
        visits++;
        debt = 0;
      }
    }
    printf("%d\n", visits);
  }
  return 0;
}
