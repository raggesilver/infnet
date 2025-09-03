package com.raggesilver.tp2;

public class ReimbursementCalculator {
  public double calculateReimbursement(double consultationValue, double coveragePercentage, Patient patient) {
    return consultationValue * coveragePercentage;
  }
}
