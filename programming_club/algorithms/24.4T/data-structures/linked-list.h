#pragma once

#include <stdbool.h>
#include <stddef.h>

typedef void(list_node_value_free_func)(void *);

typedef struct s_list_node {
  void *value;

  struct s_list_node *next;
  struct s_list_node *prev;
} list_node_t;

/**
 * @brief Append a new node to the list
 *
 * @param head The head of the list. The head of the list will be
 * updated if the list is empty.
 * @param value The value to be stored in the node
 * @return list_node_t* The new node
 */
list_node_t *list_append(list_node_t **head, void *value);

/**
 * @brief Prepend a new node to the list
 *
 * @param head The head of the list. The head of the list will be
 * updated if the list is empty.
 * @param value The value to be stored in the node
 * @return list_node_t* The new node
 */
list_node_t *list_prepend(list_node_t **head, void *value);

/**
 * @brief Destroy the list and free the memory of each node
 *
 * @param head The head of the list
 */
void list_destroy_with_free_func(list_node_t **head,
                                 list_node_value_free_func *func);

/**
 * @brief Destroy the list and free the memory of each node. The
 * values will not be freed.
 *
 * @param head The head of the list
 */
void list_destroy(list_node_t **head);

/**
 * @brief Get the node at the specified index
 *
 * @param head The head of the list
 * @param index The index of the node
 * @return list_node_t* The node at the specified index or NULL if
 * the index is out of bounds.
 */
list_node_t *list_at(list_node_t *head, size_t index);

/**
 * @brief Remove the node at the specified index
 *
 * @param head The head of the list. The head will be updated if the
 * first node is removed.
 * @param index The index of the node to be removed
 * @param out_value The value of the removed node
 * @return whether the node was removed
 */
bool list_remove(list_node_t **head, size_t index, void **out_value);

/**
 * @brief Delete the node at the specified index
 *
 * @param head The head of the list. The head will be updated if the
 * first node is removed.
 * @param index The index of the node to be deleted
 * @param func The function to free the value of the node
 * @return whether the node was deleted
 */
bool list_delete(list_node_t **head, size_t index,
                 list_node_value_free_func *func);

#define list_foreach(head, iter)                                               \
  for (list_node_t *iter = (head); iter; iter = iter->next)
