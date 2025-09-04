package com.raggesilver.tp2;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class ReimbursementCalculatorTest {

  @Test
  void shouldCalculateBasicReimbursement() {
    var calculator = new ReimbursementCalculator();
    var healthPlan = new StubHealthPlan(0.70);
    var patient = new Patient("John Doe", "123456", healthPlan);

    double result = calculator.calculateReimbursement(200.0, patient);

    assertEquals(140.0, result);
  }

  @Test
  void shouldHandleZeroCoverage() {
    var calculator = new ReimbursementCalculator();
    var healthPlan = new StubHealthPlan(0.0);
    var patient = new Patient("Jane Smith", "789012", healthPlan);

    double result = calculator.calculateReimbursement(200.0, patient);

    assertEquals(0.0, result);
  }

  @Test
  void shouldHandleFullCoverage() {
    var calculator = new ReimbursementCalculator();
    var healthPlan = new StubHealthPlan(1.0);
    var patient = new Patient("Bob Johnson", "345678", healthPlan);

    double result = calculator.calculateReimbursement(200.0, patient);

    assertEquals(200.0, result);
  }
}
