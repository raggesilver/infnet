#include "hashtable.h"

#include <stdio.h>

int main(void)
{
    hashtable_t* table = hashtable_new();
    int n = 42;
    hashtable_set(table, "num", &n);
    hashtable_set(table, "num2", &n);
    hashtable_set(table, "num3", &n);
    hashtable_set(table, "num4", &n);
    hashtable_set(table, "num5", &n);
    hashtable_set(table, "num6", &n);

    hashtable_foreach(
        table, { printf("key: %4s, value: %d\n", key, *(int*)value); });

    hashtable_free(table);
    return 0;
}
