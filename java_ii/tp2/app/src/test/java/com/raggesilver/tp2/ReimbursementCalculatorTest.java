package com.raggesilver.tp2;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class ReimbursementCalculatorTest {

  @Test
  void shouldCalculateBasicReimbursement() {
    var calculator = new ReimbursementCalculator();
    var patient = TestUtils.createPatient();

    double result = calculator.calculateReimbursement(200.0, patient);

    assertEquals(140.0, result);
  }

  @Test
  void shouldHandleZeroCoverage() {
    var calculator = new ReimbursementCalculator();
    var patient = TestUtils.createPatient("Jane Smith", "789012", 0.0);

    double result = calculator.calculateReimbursement(200.0, patient);

    assertEquals(0.0, result);
  }

  @Test
  void shouldHandleFullCoverage() {
    var calculator = new ReimbursementCalculator();
    var patient = TestUtils.createPatient("Bob Johnson", "345678", 1.0);

    double result = calculator.calculateReimbursement(200.0, patient);

    assertEquals(200.0, result);
  }
}
