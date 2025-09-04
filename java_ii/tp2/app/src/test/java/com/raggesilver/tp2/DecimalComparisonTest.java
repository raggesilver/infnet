package com.raggesilver.tp2;

import org.junit.jupiter.api.Test;

class DecimalComparisonTest {

  @Test
  void shouldCalculateReimbursementWithDecimalPrecision() {
    var calculator = new ReimbursementCalculator();
    var patient = TestUtils.createPatient("John Doe", "123456", 0.333);

    double result = calculator.calculateReimbursement(100.0, patient);

    TestUtils.assertEqualsWithMargin(33.3, result);
  }

  @Test
  void shouldHandleComplexDecimalCalculations() {
    var calculator = new ReimbursementCalculator();
    var patient = TestUtils.createPatient("Jane Smith", "789012", 0.666);

    double result = calculator.calculateReimbursement(150.0, patient);

    TestUtils.assertEqualsWithMargin(99.9, result);
  }

  @Test
  void shouldPassWithExactMatch() {
    var calculator = new ReimbursementCalculator();
    var patient = TestUtils.createPatient("Bob Johnson", "345678", 0.75);

    double result = calculator.calculateReimbursement(200.0, patient);

    TestUtils.assertEqualsWithMargin(150.0, result);
  }
}
