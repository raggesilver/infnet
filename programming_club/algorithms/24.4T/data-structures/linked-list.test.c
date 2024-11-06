#include "linked-list.h"

#include <stdio.h>
#include <stdlib.h>

int main(void) {
  //
  // Inicializar a lista como vazia
  list_node_t *head = NULL;

  char *name1 = "Paulo";
  char *name2 = "Marcelo";

  //
  // Adicionar elementos para a lista
  list_append(&head, name2);
  list_prepend(&head, name1);

  //
  // Percorrer todos os elementos da lista
  list_foreach(head, iter) {
    // ...
    printf("%s\n", (char *)iter->value);
  }

  //
  // Remover um elemento pelo seu índice
  void *removed_value = NULL;
  if (list_remove(&head, 0, &removed_value)) {
    printf("%s\n", (char *)removed_value); // Paulo
  }
  printf("%s\n", (char *)removed_value); // Paulo

  if (list_remove(&head, 200000, NULL)) {
    // Não deve entrar aqui, esse índice não existe
  }

  // Posição 0 depois de remover o primeiro elemento
  printf("%s\n", (char *)list_at(head, 0)->value); // Marcelo

  // Deletar a lista
  list_destroy(&head);
  return 0;
}
