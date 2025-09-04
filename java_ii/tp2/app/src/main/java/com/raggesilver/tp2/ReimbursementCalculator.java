package com.raggesilver.tp2;

public class ReimbursementCalculator {
  private static final double MAX_REIMBURSEMENT = 150.0;

  public double calculateReimbursement(double consultationValue, Patient patient) {
    double calculatedReimbursement = consultationValue * patient.getHealthPlan().getCoveragePercentage();
    return Math.min(calculatedReimbursement, MAX_REIMBURSEMENT);
  }
}
