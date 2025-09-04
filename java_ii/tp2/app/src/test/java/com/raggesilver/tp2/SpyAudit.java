package com.raggesilver.tp2;

public class SpyAudit implements Audit {
  private boolean registerConsultationCalled = false;
  private Consultation lastConsultation;

  @Override
  public void registerConsultation(Consultation consultation) {
    this.registerConsultationCalled = true;
    this.lastConsultation = consultation;
  }

  public boolean wasRegisterConsultationCalled() {
    return registerConsultationCalled;
  }

  public Consultation getLastConsultation() {
    return lastConsultation;
  }
}
