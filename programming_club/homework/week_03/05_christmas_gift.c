#include <ctype.h>
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

#define BUF_SIZE 4194304

// https://judge.beecrowd.com/pt/runs/code/39979238
// gcc-14 -o out 05_christmas_gift.c -std=c99 -Wall -Werror -Wextra -O2

typedef struct {
  float price;
  char *name;
  int weight;
} gift_t;

/**
 * @brief Duplicates a string until a character is found
 * @param str The string to duplicate
 * @param c The character to search for
 * @return A new string containing the characters from the beginning of str
 * until c is found
 */
char *strdupchr(const char *str, char c, size_t *out_len) {
  char *p = strchr(str, c);
  if (p == NULL) {
    if (out_len) {
      *out_len = 0;
    }
    return NULL;
  }
  if (out_len) {
    *out_len = p - str;
  }
  return strndup(str, p - str);
}

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

int gift_compare_desc(const void *_a, const void *_b) {
  gift_t *a = (gift_t *)_a;
  gift_t *b = (gift_t *)_b;

  if (a->weight != b->weight) {
    return b->weight - a->weight;
  }
  if (a->price != b->price) {
    return a->price - b->price;
  }
  return strcmp(a->name, b->name);
}

int main(void) {
  char *buf = malloc(BUF_SIZE);
  char *ptr = NULL;
  size_t len;

  buf_seek_and_readjust(buf, ptr, &len);
  ptr = buf;

  while (*ptr) {
    size_t name_length;
    char *name = strdupchr(ptr, ' ', &name_length);
    ptr += name_length;

    long gifts_count = strtol(ptr, &ptr, 10);
    ptr++;

    gift_t *gifts = malloc(sizeof(*gifts) * gifts_count);

    for (long i = 0; i < gifts_count; i++) {
      while (isspace(*ptr)) {
        ptr++;
      }
      size_t name_length;
      char *gift_name = strdupchr(ptr, '\n', &name_length);
      ptr += name_length + 1;

      float price = strtof(ptr, &ptr);
      long weight = strtol(ptr, &ptr, 10);
      ptr++;

      gifts[i] = (gift_t){
          .name = gift_name,
          .price = price,
          .weight = weight,
      };
    }

    qsort(gifts, gifts_count, sizeof(*gifts), gift_compare_desc);

    printf("Lista de %s\n", name);
    for (long i = 0; i < gifts_count; i++) {
      printf("%s - R$%.2f\n", gifts[i].name, gifts[i].price);
      free(gifts[i].name);
    }
    printf("\n");

    free(gifts);
    free(name);

    while (isspace(*ptr)) {
      ptr++;
    }
  }

  free(buf);
  return 0;
}
