package com.raggesilver.tp2;

public class ReimbursementCalculator {
  public double calculateReimbursement(double consultationValue, Patient patient) {
    return consultationValue * patient.getHealthPlan().getCoveragePercentage();
  }
}
