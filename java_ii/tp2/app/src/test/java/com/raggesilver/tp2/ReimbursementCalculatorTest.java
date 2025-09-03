package com.raggesilver.tp2;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class ReimbursementCalculatorTest {

  @Test
  void shouldCalculateBasicReimbursement() {
    var calculator = new ReimbursementCalculator();
    var dummyPatient = new Patient("John Doe", "123456");

    double result = calculator.calculateReimbursement(200.0, 0.70, dummyPatient);

    assertEquals(140.0, result);
  }

  @Test
  void shouldHandleZeroCoverage() {
    var calculator = new ReimbursementCalculator();
    var dummyPatient = new Patient("Jane Smith", "789012");

    double result = calculator.calculateReimbursement(200.0, 0.0, dummyPatient);

    assertEquals(0.0, result);
  }

  @Test
  void shouldHandleFullCoverage() {
    var calculator = new ReimbursementCalculator();
    var dummyPatient = new Patient("Bob Johnson", "345678");

    double result = calculator.calculateReimbursement(200.0, 1.0, dummyPatient);

    assertEquals(200.0, result);
  }

  @Test
  void shouldHandleZeroConsultationValue() {
    var calculator = new ReimbursementCalculator();
    var dummyPatient = new Patient("Alice Brown", "901234");

    double result = calculator.calculateReimbursement(0.0, 0.70, dummyPatient);

    assertEquals(0.0, result);
  }
}
