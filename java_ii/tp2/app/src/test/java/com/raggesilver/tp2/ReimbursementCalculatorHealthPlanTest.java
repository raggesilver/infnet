package com.raggesilver.tp2;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class ReimbursementCalculatorHealthPlanTest {

  @Test
  void shouldCalculateReimbursementWithFiftyPercentPlan() {
    var calculator = new ReimbursementCalculator();
    var healthPlan = new StubHealthPlan(0.50);
    var patient = new Patient("John Doe", "123456", healthPlan);

    double result = calculator.calculateReimbursement(200.0, patient);

    assertEquals(100.0, result);
  }

  @Test
  void shouldCalculateReimbursementWithEightyPercentPlan() {
    var calculator = new ReimbursementCalculator();
    var healthPlan = new StubHealthPlan(0.80);
    var patient = new Patient("Jane Smith", "789012", healthPlan);

    double result = calculator.calculateReimbursement(150.0, patient);

    assertEquals(120.0, result);
  }

  @Test
  void shouldCalculateReimbursementWithZeroPercentPlan() {
    var calculator = new ReimbursementCalculator();
    var healthPlan = new StubHealthPlan(0.0);
    var patient = new Patient("Bob Johnson", "345678", healthPlan);

    double result = calculator.calculateReimbursement(300.0, patient);

    assertEquals(0.0, result);
  }

  @Test
  void shouldCalculateReimbursementWithFullCoveragePlan() {
    var calculator = new ReimbursementCalculator();
    var healthPlan = new StubHealthPlan(1.0);
    var patient = new Patient("Alice Brown", "901234", healthPlan);

    double result = calculator.calculateReimbursement(250.0, patient);

    assertEquals(250.0, result);
  }
}
