#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

#define BUF_SIZE 65536

// https://judge.beecrowd.com/en/runs/code/39888039
// gcc -o radars 04_radars.c -std=c99 -O2 -lm -Wall -Werror -Wextra

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

int main(void) {
  char buf[BUF_SIZE];
  char *ptr = NULL;
  size_t len;

  buf_seek_and_readjust(buf, ptr, &len);
  ptr = buf;

  long n = strtol(ptr, &ptr, 10);
  ptr++;

  for (long i = 0; i < n; i++) {
    long length = strtol(ptr, &ptr, 10);
    ptr++;
    long range = strtol(ptr, &ptr, 10);
    ptr++;

    long radars = ((int)length / range) + ((length % range) ? 1 : 0);
    printf("%ld\n", radars);
  }

  return 0;
}
