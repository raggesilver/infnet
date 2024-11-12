#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

// gcc -o out 1006.c -lm -O2 -std=c99

#define BUFF_SIZE 1024 * 1024 // 1MB

int main(void) {
  char buff[BUFF_SIZE];
  size_t length = read(0, buff, BUFF_SIZE);
  buff[length] = '\0';

  float a, b, c;

  char *ptr = buff;
  a = strtod(ptr, &ptr);
  b = strtod(ptr, &ptr);
  c = strtod(ptr, &ptr);

  printf("MEDIA = %.1f\n", (a * 2 + b * 3 + c * 5) / 10);

  return 0;
}
