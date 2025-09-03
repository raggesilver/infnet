package com.raggesilver.tp2;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

class ReimbursementCalculationTest {

  @Test
  void shouldCalculateBasicReimbursement() {
    double consultationValue = 200.0;
    double coveragePercentage = 0.70;

    double expectedReimbursement = 140.0;
    double actualReimbursement = calculateReimbursement(consultationValue, coveragePercentage);

    assertEquals(expectedReimbursement, actualReimbursement);
  }

  // Mock implementation
  private double calculateReimbursement(double consultationValue, double coveragePercentage) {
    return consultationValue * coveragePercentage;
  }
}
