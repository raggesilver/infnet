package com.raggesilver.tp2;

import java.time.LocalDateTime;

public class TestUtils {

  public static Consultation createConsultation() {
    return createConsultation("John Doe", "123456", 0.70, 200.0);
  }

  public static Consultation createConsultation(String patientName, String patientId, double coveragePercentage, double consultationValue) {
    var healthPlan = new StubHealthPlan(coveragePercentage);
    var patient = new Patient(patientName, patientId, healthPlan);
    return new Consultation(patient, consultationValue, LocalDateTime.now());
  }

  public static Patient createPatient() {
    return createPatient("John Doe", "123456", 0.70);
  }

  public static Patient createPatient(String name, String id, double coveragePercentage) {
    var healthPlan = new StubHealthPlan(coveragePercentage);
    return new Patient(name, id, healthPlan);
  }

  public static void assertEqualsWithMargin(double expected, double actual) {
    assertEqualsWithMargin(expected, actual, 0.01);
  }

  public static void assertEqualsWithMargin(double expected, double actual, double margin) {
    if (Math.abs(expected - actual) > margin) {
      throw new AssertionError(String.format("Expected <%f> but was <%f> (margin: %f)", expected, actual, margin));
    }
  }
}
