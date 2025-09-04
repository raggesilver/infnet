package com.raggesilver.tp2;

import java.time.LocalDateTime;

public class ReimbursementService {
  private final ReimbursementCalculator calculator;
  private final Audit audit;

  public ReimbursementService(ReimbursementCalculator calculator, Audit audit) {
    this.calculator = calculator;
    this.audit = audit;
  }

  public double processConsultation(Patient patient, double consultationValue) {
    double reimbursementAmount = calculator.calculateReimbursement(consultationValue, patient);

    var consultation = new Consultation(patient, consultationValue, LocalDateTime.now());
    consultation.setReimbursementAmount(reimbursementAmount);

    audit.registerConsultation(consultation);

    return reimbursementAmount;
  }
}
