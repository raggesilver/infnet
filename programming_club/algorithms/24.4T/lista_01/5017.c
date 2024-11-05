// gcc -o 5017 5017.c -std=c99 -O2 -lm

#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(void) {
  char buffer[128];
  fgets(buffer, sizeof(buffer) - 1, stdin);
  char *ptr = buffer;

  int len = strtol(ptr, &ptr, 10);

  char str[len + 1];

  fgets(buffer, sizeof(buffer) - 1, stdin);

  memcpy(str, buffer, len);
  str[len] = '\0';

  bool easy_to_pronounce = true;
  int previous_consonants = 0;
  for (size_t i = 0; i < len; i++) {
    if (strchr("aeiou", str[i]) == NULL) {
      previous_consonants++;
      if (previous_consonants >= 4) {
        easy_to_pronounce = false;
        break;
      }
    } else {
      previous_consonants = 0;
    }
  }

  printf("%s\n", easy_to_pronounce ? "YES" : "NO");

  return 0;
}
