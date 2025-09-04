package com.raggesilver.tp2;

public class StubHealthPlan implements HealthPlan {
  private final double coveragePercentage;

  public StubHealthPlan(double coveragePercentage) {
    this.coveragePercentage = coveragePercentage;
  }

  @Override
  public double getCoveragePercentage() {
    return coveragePercentage;
  }
}
