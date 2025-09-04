package com.raggesilver.tp2;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class ConsultationHistoryTest {

  @Test
  void shouldStoreAndRetrieveConsultations() {
    var history = new FakeConsultationHistory();
    var consultation = TestUtils.createConsultation();

    history.addConsultation(consultation);
    var consultations = history.getAllConsultations();

    assertEquals(1, consultations.size());
    assertEquals(consultation, consultations.get(0));
  }

  @Test
  void shouldFilterConsultationsByPatient() {
    var history = new FakeConsultationHistory();
    var patient1 = TestUtils.createPatient("John Doe", "123456", 0.70);
    var patient2 = TestUtils.createPatient("Jane Smith", "789012", 0.80);

    var consultation1 = TestUtils.createConsultation("John Doe", "123456", 0.70, 200.0);
    var consultation2 = TestUtils.createConsultation("Jane Smith", "789012", 0.80, 150.0);
    var consultation3 = TestUtils.createConsultation("John Doe", "123456", 0.70, 300.0);

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
    var patient = TestUtils.createPatient();

    var consultations = history.getConsultationsByPatient(patient);

    assertTrue(consultations.isEmpty());
  }
}
