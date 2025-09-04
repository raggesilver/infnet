package com.raggesilver.tp2;

import java.util.List;

public interface ConsultationHistory {
  void addConsultation(Consultation consultation);

  List<Consultation> getConsultationsByPatient(Patient patient);

  List<Consultation> getAllConsultations();
}
