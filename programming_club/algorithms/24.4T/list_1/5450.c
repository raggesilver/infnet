#include <ctype.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdio.h>
#include <stdlib.h>

// 700k items processed in 0.157s
// gcc-14 -o out 5450.c -O2 -lm

typedef struct {
  int key;          // Integer key
  int value;        // Integer value
  bool is_occupied; // To distinguish empty slots
} item_t;

typedef struct {
  item_t *items;   // Array of items
  size_t capacity; // Maximum number of items
  size_t length;   // Current number of items
} hashtable_t;

#define HASHTABLE_DEFAULT_CAPACITY 769

// Hash function
static size_t hash(int key, size_t capacity) { return key % capacity; }

// Create a new hashtable with a specific initial capacity
hashtable_t *hashtable_new_with_capacity(size_t initial_capacity) {
  hashtable_t *self = malloc(sizeof(*self));
  self->items = calloc(initial_capacity, sizeof(*self->items));
  self->capacity = initial_capacity;
  self->length = 0;
  return self;
}

// Create a new hashtable with default capacity
hashtable_t *hashtable_new() {
  return hashtable_new_with_capacity(HASHTABLE_DEFAULT_CAPACITY);
}

// Free the hashtable
void hashtable_free(hashtable_t *self) {
  if (self) {
    free(self->items);
    free(self);
  }
}

// Resize and rehash the hashtable
static void hashtable_resize(hashtable_t *self) {
  size_t new_capacity = self->capacity * 2;
  hashtable_t *new_table = hashtable_new_with_capacity(new_capacity);

  for (size_t i = 0; i < self->capacity; i++) {
    if (self->items[i].is_occupied) {
      size_t index = hash(self->items[i].key, new_capacity);
      size_t probe = 0;
      while (new_table->items[index].is_occupied) {
        ++probe;
        index = (index + probe * probe) % new_capacity;
      }
      new_table->items[index] = self->items[i];
    }
  }

  free(self->items);
  self->items = new_table->items;
  self->capacity = new_capacity;
  free(new_table);
}

// Add or update a key-value pair in the hashtable
void hashtable_set(hashtable_t *self, int key, int value) {
  if ((float)self->length / self->capacity >= 0.7) {
    hashtable_resize(self);
  }

  size_t index = hash(key, self->capacity);
  size_t probe = 0;

  while (self->items[index].is_occupied && self->items[index].key != key) {
    ++probe;
    index = (index + probe * probe) % self->capacity;
  }

  if (!self->items[index].is_occupied) {
    self->length++;
  }

  self->items[index].key = key;
  self->items[index].value = value;
  self->items[index].is_occupied = true;
}

// Retrieve a value by its key
bool hashtable_get(hashtable_t *self, int key, int *value) {
  size_t index = hash(key, self->capacity);
  size_t probe = 0;

  while (self->items[index].is_occupied) {
    if (self->items[index].key == key) {
      *value = self->items[index].value;
      return true;
    }
    ++probe;
    index = (index + probe * probe) % self->capacity;
  }

  return false;
}

// Check if a key exists in the hashtable
bool hashtable_exists(hashtable_t *self, int key) {
  int value;
  return hashtable_get(self, key, &value);
}

// Remove a key-value pair from the hashtable
bool hashtable_remove(hashtable_t *self, int key) {
  size_t index = hash(key, self->capacity);
  size_t probe = 0;

  while (self->items[index].is_occupied) {
    if (self->items[index].key == key) {
      self->items[index].is_occupied = false;
      self->length--;
      return true;
    }
    index = (index + (probe + 1) * probe) % self->capacity;
    probe++;
  }

  return false;
}

/**
 * Note: The returned array must be malloced, assume caller calls free().
 */
int *twoSum(int *nums, int numsSize, int target, int *returnSize) {
  hashtable_t *dict = hashtable_new_with_capacity(6151); // Create hash table

  *returnSize = 2; // Define return size

  for (int i = 0; i < numsSize; i++) {
    int diff = target - nums[i];

    // Check if `diff` exists in the hash table
    if (hashtable_exists(dict, diff)) {
      // Get the index corresponding to `diff`
      int index;
      hashtable_get(dict, diff, &index);

      // Allocate result array and return
      int *result = malloc(sizeof(int) * 2);
      result[0] = index;
      result[1] = i;

      hashtable_free(dict); // Free the hash table
      return result;
    }

    // Insert `nums[i]` with its index into the hash table
    hashtable_set(dict, nums[i], i);
  }

  hashtable_free(dict); // Free the hash table if no solution is found
  return NULL;          // Return NULL if no solution exists
}

void read_input(int *nums, int *numsSize) {
  int num = 0;
  int sign = 1;
  char c;
  int state = 0; // 0: looking for number, 1: reading number

  *numsSize = 0;

  while ((c = getchar()) != EOF) {
    if (c == '[') {
      continue; // Ignore non-essential characters
    } else if (c == '-') {
      sign = -1; // Handle negative numbers
    } else if (isdigit(c)) {
      num = num * 10 + (c - '0');
      state = 1; // Now reading a number
    } else if (c == ']' || c == '\n') {
      if (state == 1) { // If we were reading a number, finalize it
        nums[*numsSize] = num * sign;
        (*numsSize)++;
        state = 0;
      }
      break; // End of input
    } else {
      if (state == 1) { // If we encounter a delimiter after a number
        nums[*numsSize] = num * sign;
        (*numsSize)++;
        num = 0;
        sign = 1;
        state = 0; // Reset for next number
      }
    }
  }

  if (state == 1) { // If input ends while reading a number
    nums[*numsSize] = num * sign;
    (*numsSize)++;
  }
}

int main(void) {
  int *nums = malloc(sizeof(*nums) * 700000);
  int count;

  read_input(nums, &count);

  int target;

  scanf("%d", &target);

  int result_size;
  int *response = twoSum(nums, count, target, &result_size);

  printf("[%d,%d]\n", response[0], response[1]);

  free(nums);
  free(response);

  return 0;
}
