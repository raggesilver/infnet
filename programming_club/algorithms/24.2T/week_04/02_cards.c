#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

#define BUF_SIZE 30

// https://judge.beecrowd.com/pt/runs/code/40245525
// gcc-14 -o out 02_cards.c -std=c99 -Wall -Werror -Wextra -O2

#define E_RESPONSE_TO_STRING(e) ("CDN"[e])

typedef enum { ASCENDING = 0, DESCENDING, NOT_SORTED } e_response;

int main(void)
{
  char buf[BUF_SIZE];
  read(STDIN_FILENO, buf, BUF_SIZE - 1);

  char*      ptr = buf;
  e_response response;

  // We need to check if a sequence of 5 numbers is sorted or not. To do so, we
  // save the first number and the difference between the nth and n-1th number.
  // If the difference changes sign, the sequence is not sorted. If at the end
  // of the loop the difference is positive, the sequence is ascending,
  // otherwise it is descending.

  int diff = 0;
  int last = strtol(ptr, &ptr, 10);

  for (int i = 1; i < 5; i++) {
    int n = strtol(ptr, &ptr, 10);
    if (i > 1 && ((n - last < 0 && diff > 0) || (n - last > 0 && diff < 0))) {
      response = NOT_SORTED;
      goto end;
    }
    diff += n - last;
    last  = n;
  }

  response = diff < 0 ? DESCENDING : ASCENDING;

end:
  printf("%c\n", E_RESPONSE_TO_STRING(response));
  return 0;
}
