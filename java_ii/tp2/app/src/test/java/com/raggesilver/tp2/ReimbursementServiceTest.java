package com.raggesilver.tp2;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ReimbursementServiceTest {

  @Test
  void shouldCallAuditWhenProcessingConsultation() {
    var calculator = new ReimbursementCalculator();
    var auditSpy = new SpyAudit();
    var authorizerMock = mock(ReimbursementAuthorizer.class);
    when(authorizerMock.isAuthorized(any(), anyDouble())).thenReturn(true);

    var service = new ReimbursementService(calculator, auditSpy, authorizerMock);
    var patient = TestUtils.createPatient();

    double result = service.processConsultation(patient, 200.0);

    assertEquals(140.0, result);
    assertTrue(auditSpy.wasRegisterConsultationCalled());
    assertNotNull(auditSpy.getLastConsultation());
    assertEquals(patient, auditSpy.getLastConsultation().getPatient());
    assertEquals(200.0, auditSpy.getLastConsultation().getValue());
    assertEquals(140.0, auditSpy.getLastConsultation().getReimbursementAmount());
  }

  @Test
  void shouldThrowExceptionWhenAuthorizationDenied() {
    var calculator = new ReimbursementCalculator();
    var auditSpy = new SpyAudit();
    var authorizerMock = mock(ReimbursementAuthorizer.class);
    when(authorizerMock.isAuthorized(any(), anyDouble())).thenReturn(false);

    var service = new ReimbursementService(calculator, auditSpy, authorizerMock);
    var patient = TestUtils.createPatient();

    assertThrows(UnauthorizedReimbursementException.class, () -> {
      service.processConsultation(patient, 200.0);
    });

    assertFalse(auditSpy.wasRegisterConsultationCalled());
  }
}
