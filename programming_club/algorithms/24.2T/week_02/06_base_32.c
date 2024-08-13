#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

#define BUF_SIZE 65536

// https://judge.beecrowd.com/pt/runs/code/39890764
// gcc -o base32 06_base_32.c -std=c99 -O2 -lm -Wall -Werror -Wextra

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

void print_number_in_base(unsigned long long number, int base) {
  char buf[1024] = {0};
  char *ptr = buf;
  do {
    int digit = number % base;
    number /= base;
    *ptr = digit < 10 ? '0' + digit : 'A' + digit - 10;
    ptr++;
  } while (number > 0);
  do {
    write(STDOUT_FILENO, --ptr, 1);
  } while (ptr != buf);
  write(STDOUT_FILENO, "\n", 1);
  fflush(stdout);
}

int main(void) {
  char buf[BUF_SIZE];
  char *ptr = NULL;
  size_t len;

  while (1) {
    buf_seek_and_readjust(buf, ptr, &len);
    ptr = buf;
    unsigned long long number = strtoull(ptr, &ptr, 10);
    ptr++;

    print_number_in_base(number, 32);

    if (number == 0) {
      break;
    }
  }

  return 0;
}
