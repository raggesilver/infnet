package com.raggesilver.tp2;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class IntegrationTest {

  @Test
  void shouldProcessAuthorizedConsultationWithAllComponents() {
    // Arrange - using stub for health plan
    var patient = TestUtils.createPatient("Maria Silva", "987654", 0.80);

    // Mock for authorization
    var authorizerMock = mock(ReimbursementAuthorizer.class);
    when(authorizerMock.isAuthorized(patient, 180.0)).thenReturn(true);

    // Spy for audit
    var auditSpy = new SpyAudit();

    // Calculator and service setup
    var calculator = new ReimbursementCalculator();
    var service = new ReimbursementService(calculator, auditSpy, authorizerMock);

    // Act
    double result = service.processConsultation(patient, 180.0);

    // Assert
    // Verify reimbursement calculation: 180 * 0.80 = 144 (under ceiling)
    TestUtils.assertEqualsWithMargin(144.0, result);

    // Verify mock was called correctly
    verify(authorizerMock).isAuthorized(patient, 180.0);

    // Verify audit spy was called
    assertTrue(auditSpy.wasRegisterConsultationCalled());
    assertNotNull(auditSpy.getLastConsultation());
    assertEquals(patient, auditSpy.getLastConsultation().getPatient());
    assertEquals(180.0, auditSpy.getLastConsultation().getValue());
    TestUtils.assertEqualsWithMargin(144.0, auditSpy.getLastConsultation().getReimbursementAmount());
  }

  @Test
  void shouldProcessConsultationWithCeilingApplied() {
    // Arrange - using helper to create patient with high coverage
    var patient = TestUtils.createPatient("João Santos", "456789", 0.90);

    // Mock for authorization
    var authorizerMock = mock(ReimbursementAuthorizer.class);
    when(authorizerMock.isAuthorized(patient, 200.0)).thenReturn(true);

    // Spy for audit
    var auditSpy = new SpyAudit();

    // Calculator and service setup
    var calculator = new ReimbursementCalculator();
    var service = new ReimbursementService(calculator, auditSpy, authorizerMock);

    // Act
    double result = service.processConsultation(patient, 200.0);

    // Assert
    // Verify reimbursement calculation: 200 * 0.90 = 180, but ceiling caps at 150
    TestUtils.assertEqualsWithMargin(150.0, result);

    // Verify mock interaction
    verify(authorizerMock).isAuthorized(patient, 200.0);

    // Verify audit captured correct data
    assertTrue(auditSpy.wasRegisterConsultationCalled());
    TestUtils.assertEqualsWithMargin(150.0, auditSpy.getLastConsultation().getReimbursementAmount());
  }

  @Test
  void shouldHandleUnauthorizedConsultationWithAllComponents() {
    // Arrange - using helper for patient creation
    var patient = TestUtils.createPatient("Ana Costa", "321654", 0.75);

    // Mock returns false for authorization
    var authorizerMock = mock(ReimbursementAuthorizer.class);
    when(authorizerMock.isAuthorized(patient, 250.0)).thenReturn(false);

    // Spy for audit
    var auditSpy = new SpyAudit();

    // Calculator and service setup
    var calculator = new ReimbursementCalculator();
    var service = new ReimbursementService(calculator, auditSpy, authorizerMock);

    // Act & Assert
    assertThrows(UnauthorizedReimbursementException.class, () -> service.processConsultation(patient, 250.0));

    // Verify mock was still called
    verify(authorizerMock).isAuthorized(patient, 250.0);

    // Verify audit was NOT called when authorization failed
    assertFalse(auditSpy.wasRegisterConsultationCalled());
  }

  @Test
  void shouldIntegrateMultiplePatientsWithDifferentPlans() {
    // Arrange - multiple patients with different coverage using helpers
    var basicPlan = TestUtils.createPatient("Carlos Lima", "111222", 0.50);
    var premiumPlan = TestUtils.createPatient("Sandra Oliveira", "333444", 1.0);

    // Mock authorizes all consultations
    var authorizerMock = mock(ReimbursementAuthorizer.class);
    when(authorizerMock.isAuthorized(any(Patient.class), anyDouble())).thenReturn(true);

    // Spy for audit
    var auditSpy = new SpyAudit();

    // Service setup
    var calculator = new ReimbursementCalculator();
    var service = new ReimbursementService(calculator, auditSpy, authorizerMock);

    // Act
    double basicResult = service.processConsultation(basicPlan, 120.0);
    double premiumResult = service.processConsultation(premiumPlan, 120.0);

    // Assert
    // Basic plan: 120 * 0.50 = 60
    TestUtils.assertEqualsWithMargin(60.0, basicResult);

    // Premium plan: 120 * 1.0 = 120 (under ceiling)
    TestUtils.assertEqualsWithMargin(120.0, premiumResult);

    // Verify both authorizations were called
    verify(authorizerMock).isAuthorized(basicPlan, 120.0);
    verify(authorizerMock).isAuthorized(premiumPlan, 120.0);
    verify(authorizerMock, times(2)).isAuthorized(any(Patient.class), eq(120.0));
  }
}
