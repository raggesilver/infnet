#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <unistd.h>

// This program generates an input file for both 06_lost_piece_hard.c and
// 05_lost_piece.c. However, it is not optimal, as it only generates numbers
// in sequence.

long random_int(long min, long max) { return min + rand() % (max - min + 1); }

int main(int argc, char **argv) {
  if (argc != 2) {
    return 1;
  }

  srand(time(NULL));

  long max_number = strtol(argv[1], NULL, 10);

  long missing_piece = random_int(2, max_number);

  long first = 2;
  while (first == missing_piece) {
    first++;
  }

  // Write first line
  printf("%ld\n", max_number);
  // Write the first number
  printf("%ld", first);

  // Write the rest of the numbers
  for (long i = first + 1; i <= max_number; i++) {
    if (i == missing_piece) {
      continue;
    }

    printf(" %ld", i);
  }

  printf("\n");

  return 0;
}
