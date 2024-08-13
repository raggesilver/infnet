#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

#define BUF_SIZE 64

// https://judge.beecrowd.com/pt/runs/code/40252242
// gcc-14 -o out 05_divisible_by_seven.c -std=c99 -Wall -Werror -Wextra -O2

int main(void)
{
  char buf[BUF_SIZE];

  const size_t bytes = read(STDIN_FILENO, buf, BUF_SIZE - 1);

  buf[bytes] = '\0';

  uint64_t n = strtoull(buf, NULL, 10);

  printf("%llu\n", n);
  while (n >= 10) {
    const uint64_t last_digit = n % 10;
    const uint64_t remaining  = n / 10;

    n = remaining * 3 + last_digit;

    printf("%llu\n", n);
  }

  return 0;
}
