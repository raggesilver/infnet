#include <stdio.h>
#include <unistd.h>

int main(void) {
  char buf[4];

  while (read(0, buf, 4) > 0) {
    if (buf[2] == 'L') {
      printf("Esse eh o meu lugar\n");
    } else {
      printf("Oi, Leonard\n");
    }
  }
}
