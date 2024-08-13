#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

#define BUF_SIZE 1024 * 1024

void buf_seek_and_readjust(char* buf, char* ptr, size_t* new_length)
{
  // If ptr is not NULL and not the beginning of the buffer
  if (ptr && ptr != buf && *ptr != '\0') {
    // Handle remainder
    size_t len = strlen(ptr);
    // Move remainder to the beginning of the buffer
    memmove(buf, ptr, len);
    // Read more data from stdin
    ssize_t read_size    = read(STDIN_FILENO, buf + len, BUF_SIZE - len - 1);
    buf[len + read_size] = '\0';
    *new_length          = len + read_size;
  } else {
    // Read more data from stdin
    ssize_t read_size = read(STDIN_FILENO, buf, BUF_SIZE - 1);
    buf[read_size]    = '\0';
    *new_length       = read_size;
  }
}

int main(void)
{
  char   buf[BUF_SIZE];
  char*  ptr = NULL;
  size_t len;

  buf_seek_and_readjust(buf, ptr, &len);

  int a = strtol(buf, &ptr, 10);

  for (int i = 0; i < 1000; i++) {
    printf("N[%d] = %d\n", i, i % a);
  }

  return 0;
}
