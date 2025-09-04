package com.raggesilver.tp2;

import java.time.LocalDateTime;

public class Consultation {
  private final Patient patient;
  private final double value;
  private final LocalDateTime dateTime;
  private double reimbursementAmount;

  public Consultation(Patient patient, double value, LocalDateTime dateTime) {
    this.patient = patient;
    this.value = value;
    this.dateTime = dateTime;
  }

  public Patient getPatient() {
    return patient;
  }

  public double getValue() {
    return value;
  }

  public LocalDateTime getDateTime() {
    return dateTime;
  }

  public double getReimbursementAmount() {
    return reimbursementAmount;
  }

  public void setReimbursementAmount(double reimbursementAmount) {
    this.reimbursementAmount = reimbursementAmount;
  }
}
