package com.raggesilver.tp2;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class ReimbursementServiceTest {

  @Test
  void shouldCallAuditWhenProcessingConsultation() {
    var calculator = new ReimbursementCalculator();
    var auditSpy = new SpyAudit();
    var service = new ReimbursementService(calculator, auditSpy);

    var healthPlan = new StubHealthPlan(0.70);
    var patient = new Patient("John Doe", "123456", healthPlan);

    double result = service.processConsultation(patient, 200.0);

    assertEquals(140.0, result);
    assertTrue(auditSpy.wasRegisterConsultationCalled());
    assertNotNull(auditSpy.getLastConsultation());
    assertEquals(patient, auditSpy.getLastConsultation().getPatient());
    assertEquals(200.0, auditSpy.getLastConsultation().getValue());
    assertEquals(140.0, auditSpy.getLastConsultation().getReimbursementAmount());
  }
}
