package com.raggesilver.tp2;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class ReimbursementCalculatorTest {
  @Test
  void shouldCalculateBasicReimbursement() {
    var calculator = new ReimbursementCalculator();

    double result = calculator.calculateReimbursement(200.0, 0.70);

    assertEquals(140.0, result);
  }

  @Test
  void shouldHandleZeroCoverage() {
    var calculator = new ReimbursementCalculator();

    double result = calculator.calculateReimbursement(200.0, 0.0);

    assertEquals(0.0, result);
  }

  @Test
  void shouldHandleFullCoverage() {
    var calculator = new ReimbursementCalculator();

    double result = calculator.calculateReimbursement(200.0, 1.0);

    assertEquals(200.0, result);
  }

  @Test
  void shouldHandleZeroConsultationValue() {
    var calculator = new ReimbursementCalculator();

    double result = calculator.calculateReimbursement(0.0, 0.70);

    assertEquals(0.0, result);
  }
}
