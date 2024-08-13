#include <errno.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

#define BUF_SIZE 1024

// https://judge.beecrowd.com/en/runs/code/39754633
// gcc -o sod 04_system_of_a_download.c -std=c99 -O2 -lm -Wall -Werror -Wextra

const char *songs[] = {
    "PROXYCITY", "P.Y.N.G.",   "DNSUEY!",       "SERVERS",
    "HOST!",     "CRIPTONIZE", "OFFLINE DAY",   "SALT",
    "ANSWER!",   "RAR?",       "WIFI ANTENNAS",
};

char *read_line(void) {
  static char buf[BUF_SIZE];

  size_t length = read(STDIN_FILENO, buf, BUF_SIZE - 1);
  buf[length] = 0;

  return buf;
}

int main(void) {
  char *ptr = read_line();
  long test_cases = strtol(ptr, &ptr, 10);

  for (long i = 0; i < test_cases; i++) {
    ptr++;
    long a = strtol(ptr, &ptr, 10);

    ptr++;
    long b = strtol(ptr, &ptr, 10);

    printf("%s\n", songs[a + b]);
  }

  return 0;
}
