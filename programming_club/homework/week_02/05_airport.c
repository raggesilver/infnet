#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <strings.h>
#include <unistd.h>

#define BUF_SIZE 65536

#define MAX(a, b) ((a) > (b) ? (a) : (b))
#define MIN(a, b) ((a) < (b) ? (a) : (b))

// https://judge.beecrowd.com/pt/runs/code/39890018
// gcc -o airport 05_airport.c -std=c99 -O2 -lm -Wall -Werror -Wextra

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

  long test = 0;

  while (1) {
    buf_seek_and_readjust(buf, ptr, &len);
    ptr = buf;

    long airports = strtol(ptr, &ptr, 10);
    ptr++;
    long flights = strtol(ptr, &ptr, 10);
    ptr++;

    if (airports == 0 && flights == 0) {
      break;
    }

    long busyness[airports + 1];
    bzero(busyness, sizeof(busyness));

    long busiest = 0;

    for (long i = 0; i < flights; i++) {
      long origin = strtol(ptr, &ptr, 10);
      ptr++;
      long destination = strtol(ptr, &ptr, 10);
      ptr++;

      busyness[origin]++;
      busyness[destination]++;

      busiest = MAX(busiest, MAX(busyness[origin], busyness[destination]));
    }

    printf("Teste %ld\n", ++test);

    for (long i = 1; i <= airports; i++) {
      if (busyness[i] == busiest) {
        printf("%ld ", i);
      }
    }
    printf("\n\n");
  }

  return 0;
}
