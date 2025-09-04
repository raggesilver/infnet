package com.raggesilver.tp2;

public interface ReimbursementAuthorizer {
  boolean isAuthorized(Patient patient, double consultationValue);
}
