#include "linked-list.h"
#include <stdlib.h>

#define SET_OUT_VALUE(ptr, val)                                                \
  if ((ptr))                                                                   \
    (*(ptr)) = (val);

list_node_t *list_append(list_node_t **head, void *value) {
  list_node_t *self = malloc(sizeof(*self));

  *self = (list_node_t){
      .value = value,
      .next = NULL,
      .prev = NULL,
  };

  if (head && *head) {
    list_node_t *last = *head;

    while (last->next) {
      last = last->next;
    }

    self->prev = last;
    last->next = self;
  } else if (head) {
    *head = self;
  }

  return self;
}

list_node_t *list_prepend(list_node_t **head, void *value) {
  list_node_t *self = malloc(sizeof(*self));

  *self = (list_node_t){
      .value = value,
      .next = NULL,
      .prev = NULL,
  };

  if (head && *head) {
    self->next = *head;
    (*head)->prev = self;
  }

  if (head) {
    *head = self;
  }

  return self;
}

void list_destroy_with_free_func(list_node_t **head,
                                 list_node_value_free_func *func) {
  if (!head || !*head) {
    return;
  }

  list_node_t *iter = *head;
  list_node_t *temp = NULL;

  while (iter) {
    temp = iter->next;

    if (iter->value && func) {
      func(iter->value);
    }

    free(iter);
    iter = temp;
  }

  *head = NULL;
}

inline void list_destroy(list_node_t **head) {
  list_destroy_with_free_func(head, NULL);
}

list_node_t *list_at(list_node_t *head, size_t index) {
  list_node_t *iter = head;

  for (size_t i = 0; i < index; i++) {
    if (!iter) {
      return NULL;
    }

    iter = iter->next;
  }

  return iter;
}

bool list_remove(list_node_t **head, size_t index, void **out_value) {
  SET_OUT_VALUE(out_value, NULL);

  if (!head || !*head) {
    return false;
  }

  list_node_t *node = list_at(*head, index);

  if (!node) {
    return false;
  }

  if (node->prev) {
    node->prev->next = node->next;
  }

  if (node->next) {
    node->next->prev = node->prev;
  }

  SET_OUT_VALUE(out_value, node->value);

  if (node == *head) {
    *head = node->next;
  }

  // Prevent list_destroy from deleting the next nodes on the list
  node->next = NULL;
  list_destroy(&node);

  return true;
}

bool list_delete(list_node_t **head, size_t index,
                 list_node_value_free_func *func) {
  void *value = NULL;
  bool result = list_remove(head, index, &value);

  if (result && value && func) {
    func(value);
  }

  return result;
}
