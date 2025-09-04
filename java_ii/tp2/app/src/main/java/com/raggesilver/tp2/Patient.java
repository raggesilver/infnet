package com.raggesilver.tp2;

public class Patient {
  private String name;
  private String id;
  private HealthPlan healthPlan;

  public Patient(String name, String id, HealthPlan healthPlan) {
    this.name = name;
    this.id = id;
    this.healthPlan = healthPlan;
  }

  public String getName() {
    return name;
  }

  public String getId() {
    return id;
  }

  public HealthPlan getHealthPlan() {
    return healthPlan;
  }
}
