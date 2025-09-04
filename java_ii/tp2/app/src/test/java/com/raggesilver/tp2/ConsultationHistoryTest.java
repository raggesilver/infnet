package com.raggesilver.tp2;

import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class ConsultationHistoryTest {

  @Test
  void shouldStoreAndRetrieveConsultations() {
    var history = new FakeConsultationHistory();
    var healthPlan = new StubHealthPlan(0.70);
    var patient = new Patient("John Doe", "123456", healthPlan);
    var consultation = new Consultation(patient, 200.0, LocalDateTime.now());

    history.addConsultation(consultation);
    var consultations = history.getAllConsultations();

    assertEquals(1, consultations.size());
    assertEquals(consultation, consultations.get(0));
  }

  @Test
  void shouldFilterConsultationsByPatient() {
    var history = new FakeConsultationHistory();
    var healthPlan1 = new StubHealthPlan(0.70);
    var healthPlan2 = new StubHealthPlan(0.80);
    var patient1 = new Patient("John Doe", "123456", healthPlan1);
    var patient2 = new Patient("Jane Smith", "789012", healthPlan2);

    var consultation1 = new Consultation(patient1, 200.0, LocalDateTime.now());
    var consultation2 = new Consultation(patient2, 150.0, LocalDateTime.now());
    var consultation3 = new Consultation(patient1, 300.0, LocalDateTime.now());

    history.addConsultation(consultation1);
    history.addConsultation(consultation2);
    history.addConsultation(consultation3);

    var patient1Consultations = history.getConsultationsByPatient(patient1);

    assertEquals(2, patient1Consultations.size());
    assertTrue(patient1Consultations.contains(consultation1));
    assertTrue(patient1Consultations.contains(consultation3));
  }

  @Test
  void shouldReturnEmptyListForPatientWithNoConsultations() {
    var history = new FakeConsultationHistory();
    var healthPlan = new StubHealthPlan(0.70);
    var patient = new Patient("John Doe", "123456", healthPlan);

    var consultations = history.getConsultationsByPatient(patient);

    assertTrue(consultations.isEmpty());
  }
}
