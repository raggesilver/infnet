#include <assert.h>
#include <hashtable.h>
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <strings.h>

// https://judge.beecrowd.com/pt/runs/code/39999572
// gcc-14 -o out 07_suspicious_gifts.c -Wall -Wextra -Werror -O2 `pkg-config
// --cflags --libs raggetable`

#define vec(t, v) ((t*)((v)->data))
#define vec_len(v) ((v)->len)

typedef struct {
  void*  data;
  size_t len;
  size_t size;
  void (*free_func)(void*);
} array_t;

array_t* array_new(size_t size)
{
  array_t* self = malloc(sizeof(*self));

  *self = (array_t) { .data      = malloc(sizeof(self->data) * size),
                      .len       = 0,
                      .size      = size,
                      .free_func = free };

  return self;
}

void array_append(array_t* self, void* data)
{
  if (self->len == self->size) {
    self->size *= 2;
    self->data  = realloc(self->data, sizeof(self->data) * self->size);
  }

  ((void**)self->data)[self->len++] = data;
}

void array_free(array_t* self)
{
  if (self->free_func) {
    for (size_t i = 0; i < self->len; i++) {
      self->free_func(((void**)self->data)[i]);
    }
  }

  free(self->data);
  free(self);
}

char* strvstr(char** strv, size_t len, const char* str)
{
  for (size_t i = 0; i < len; i++) {
    if (strcmp(strv[i], str) == 0) {
      return strv[i];
    }
  }

  return NULL;
}

/**
 * @brief Duplicates a string until a character is found
 * @param str The string to duplicate
 * @param c The character to search for
 * @return A new string containing the characters from the beginning of str
 * until c is found
 */
char* strdupchr(const char* str, char c, size_t* out_len)
{
  char* p = strchr(str, c);
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

int main()
{
  int C, K;

  while (scanf("%d %d", &C, &K) != EOF) {
    hashtable_t* gifts_map = hashtable_new();
    gifts_map->free_func   = (hashtable_free_func_t)&array_free;

    for (int i = 0; i < C; i++) {
      char gift[1000];

      scanf("%*[\n]"); // Skip whitespace
      fgets(gift, 1000, stdin);

      int S;

      scanf("%d", &S);

      array_t* suspicious_gifts   = array_new(S);
      suspicious_gifts->free_func = &free;

      char* _gift = strdupchr(gift, '\n', NULL);
      hashtable_set(gifts_map, _gift, suspicious_gifts);
      free(_gift);

      for (int j = 0; j < S; j++) {
        char suspicious_gift[1000];
        scanf("%*[\n]"); // Skip whitespace
        fgets(suspicious_gift, 1000, stdin);

        array_append(suspicious_gifts, strdupchr(suspicious_gift, '\n', NULL));
      }
    }

    for (int i = 0; i < K; i++) {
      char line[1000];
      scanf("%*[\n]"); // Skip whitespace
      fgets(line, 1000, stdin);

      char* _line = strdup(line);
      char* ptr   = _line;

      char* wanted   = strsep(&ptr, ";");
      char* received = strsep(&ptr, "\n");

      array_t* suspicious_gifts = hashtable_get(gifts_map, wanted);

      assert(suspicious_gifts);

      char** gifts = (char**)suspicious_gifts->data;
      size_t len   = suspicious_gifts->len;

      if (strvstr(gifts, len, received)) {
        printf("Y\n");
      } else {
        printf("N\n");
      }

      free(_line);
    }

    hashtable_free(gifts_map);
  }

  return 0;
}
