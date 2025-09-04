package com.raggesilver.tp2;

import java.util.ArrayList;
import java.util.List;

public class FakeConsultationHistory implements ConsultationHistory {
  private final List<Consultation> consultations = new ArrayList<>();

  @Override
  public void addConsultation(Consultation consultation) {
    consultations.add(consultation);
  }

  @Override
  public List<Consultation> getConsultationsByPatient(Patient patient) {
    return consultations.stream()
      .filter(c -> c.getPatient().getId().equals(patient.getId()))
      .toList();
  }

  @Override
  public List<Consultation> getAllConsultations() {
    return new ArrayList<>(consultations);
  }
}
