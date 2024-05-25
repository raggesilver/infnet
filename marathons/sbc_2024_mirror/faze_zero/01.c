#include <stdio.h>
#include <unistd.h>

// https://judge.beecrowd.com/pt/submissions/code/852/344910

int main(void) {
  char buf[5];
  char numbers[4] = {0};

  read(STDIN_FILENO, buf, 5);

  for (int i = 0; i < 5; i++) {
    if (buf[i] == ' ')
      continue;
    int index = buf[i] - '0';
    numbers[index] = 1;
  }

  for (int i = 0; i < 4; i++) {
    if (numbers[i] == 0) {
      printf("%d\n", i);
      break;
    }
  }

  return 0;
}
