package com.raggesilver.tp1;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

class ScientificCalculatorTest {

  // Testes de comportamento padrão (happy path) ===============================

  // # Questão 4
  //
  // O @BeforeEach poderia ser usado assim:
  //
  //  private ScientificCalculator calculator;
  //  @BeforeEach
  //  void setUp() {
  //    calculator = new ScientificCalculator();
  //  }
  //
  // porém, no nosso caso, não faz sentido.
  //
  // O @BeforeEach é útil quando o set up de todos os testes em um arquivo (ou
  // classe) são iguais (ou compartilham uma parte comum) e não podem ser
  // reutilizados — precisam ser criados e destruídos para cada teste. Esse não
  // é o caso dos testes dessa classe, já que poderíamos facilmente declarar
  // uma instância estática e final para uso comum em todos os testes. Exemplo:
  //
  //  private static final ScientificCalculator calculator = new ScientificCalculator();
  //
  // O exemplo mais simples que consigo pensar para BeforeEach e AfterEach é a
  // criação de um banco de dados novo e sua destruição, respectivamente. Isso
  // garante que cada teste terá um banco de dados novo e limpo!

  @Test
  void testAddition() {
    var calculator = new ScientificCalculator();

    assertEquals(20, calculator.add(10, 10));
  }

  @Test
  void testSubtraction() {
    // Setup
    var calculator = new ScientificCalculator();

    // Execution
    var result = calculator.subtract(15, 5);

    // Assertion
    assertEquals(10, result);

    // Teardown não é necessário
  }

  @Test
  void testSquareRootPositive() {
    var calculator = new ScientificCalculator();

    var result = calculator.squareRoot(16);

    assertEquals(4, result);
  }

  @ParameterizedTest
  @CsvSource({
    "0, 0.0",      // sin(0)   =  0
    "30, 0.5",     // sin(30)  =  0.5
    "45, 0.7071",  // sin(45)  ≈ √2/2
    "60, 0.8660",  // sin(60)  ≈ √3/2
    "90, 1.0",     // sin(90)  =  1
    "180, 0.0",    // sin(180) =  0
    "270, -1.0",   // sin(270) = -1
    "360, 0.0"     // sin(360) =  0
  })
  void testSin(double degrees, double expected) {
    var calculator = new ScientificCalculator();

    var result = calculator.sin(degrees);

    assertEquals(expected, result, 0.0001);
  }

  @ParameterizedTest
  @CsvSource({
    "1, 0.0",      // log(1)  = 0
    "2, 0.6931",   // log(2)  ≈ 0.6931
    "2.7183, 1.0", // log(e)  = 1
    "10, 2.3026",  // log(10) ≈ 2.3026
    "20, 2.9957"   // log(20) ≈ 2.9957
  })
  void testLog(double num, double expected) {
    var calculator = new ScientificCalculator();

    var result = calculator.log(num);

    assertEquals(expected, result, 0.0001);
  }

  // # Questão 9
  // Conforme o teste de cobertura, os métodos cos, power, e multiply não
  // foram testados ainda. Além desses métodos, algumas partes do código de
  // outras funções não foram testadas — por exemplo, só a parte do IF é
  // testada e não o ELSE.
  //
  // Testes de cobertura nos mostram quais partes do código não foram executadas
  // durante os testes. Isso fornece um alerta muito importante que parte do
  // código nunca foi testada. Em projetos reais, nunca é uma boa ideia "testar"
  // o código somente em produção.

  // # Questão 10
  // Os nomes dos testes, juntamente com o nome dessa classe, deixam bem claro
  // o que está sendo testado. Não vejo necessidade de nomear os testes de forma
  // diferente.


  // Testes de edge cases e mau-uso ============================================

  @Test
  void testSquareRootNegative() {
    // Should throw an exception
    var calculator = new ScientificCalculator();

    assertThrows(IllegalArgumentException.class, () -> calculator.squareRoot(-4));
  }

  @Test
  void testDivideByZero() {
    // Should throw an exception
    var calculator = new ScientificCalculator();

    assertThrows(IllegalArgumentException.class, () -> calculator.divide(10, 0));
  }
}
