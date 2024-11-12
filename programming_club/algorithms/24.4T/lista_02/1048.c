#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

// gcc -o out 1048.c -lm -O2 -std=c99

#define BUFF_SIZE 1024 * 1024 // 1MB

double adjust_salary(double salary) {
  if (salary > 2000) {
    return salary * 1.04;
  } else if (salary > 1200) {
    return salary * 1.07;
  } else if (salary > 800) {
    return salary * 1.1;
  } else if (salary > 400) {
    return salary * 1.12;
  } else {
    return salary * 1.15;
  }
}

int main(void) {
  char buff[BUFF_SIZE];
  size_t length = read(0, buff, BUFF_SIZE);
  buff[length] = '\0';

  float salary = strtod(buff, NULL);
  float new_salary = adjust_salary(salary);

  printf("Novo salario: %.2f\n", new_salary);
  printf("Reajuste ganho: %.2f\n", new_salary - salary);
  printf("Em percentual: %.0f %%\n", (new_salary - salary) / salary * 100);

  return 0;
}
