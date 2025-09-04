package com.raggesilver.tp2;

import java.time.LocalDateTime;

public class ReimbursementService {
  private final ReimbursementCalculator calculator;
  private final Audit audit;
  private final ReimbursementAuthorizer authorizer;

  public ReimbursementService(ReimbursementCalculator calculator, Audit audit, ReimbursementAuthorizer authorizer) {
    this.calculator = calculator;
    this.audit = audit;
    this.authorizer = authorizer;
  }

  public double processConsultation(Patient patient, double consultationValue) {
    if (!authorizer.isAuthorized(patient, consultationValue)) {
      throw new UnauthorizedReimbursementException("Reembolso não autorizado para o paciente");
    }

    double reimbursementAmount = calculator.calculateReimbursement(consultationValue, patient);

    var consultation = new Consultation(patient, consultationValue, LocalDateTime.now());
    consultation.setReimbursementAmount(reimbursementAmount);

    audit.registerConsultation(consultation);

    return reimbursementAmount;
  }
}
