package com.raggesilver.tp2;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class ReimbursementCalculationTest {

  @Test
  void shouldCalculateBasicReimbursement() {
    double consultationValue = 200.0;
    double coveragePercentage = 0.70;

    double expectedReimbursement = 140.0;
    double actualReimbursement = calculateReimbursement(consultationValue, coveragePercentage);

    assertEquals(expectedReimbursement, actualReimbursement);
  }

  @Test
  void shouldHandleZeroCoverage() {
    double consultationValue = 200.0;
    double coveragePercentage = 0.0;

    double expectedReimbursement = 0.0;
    double actualReimbursement = calculateReimbursement(consultationValue, coveragePercentage);

    assertEquals(expectedReimbursement, actualReimbursement);
  }

  @Test
  void shouldHandleFullCoverage() {
    double consultationValue = 200.0;
    double coveragePercentage = 1.0;

    double expectedReimbursement = 200.0;
    double actualReimbursement = calculateReimbursement(consultationValue, coveragePercentage);

    assertEquals(expectedReimbursement, actualReimbursement);
  }

  @Test
  void shouldHandleZeroConsultationValue() {
    double consultationValue = 0.0;
    double coveragePercentage = 0.70;

    double expectedReimbursement = 0.0;
    double actualReimbursement = calculateReimbursement(consultationValue, coveragePercentage);

    assertEquals(expectedReimbursement, actualReimbursement);
  }

  // Mock implementation
  private double calculateReimbursement(double consultationValue, double coveragePercentage) {
    return consultationValue * coveragePercentage;
  }
}
