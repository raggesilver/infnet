describe("US1 — Search/filter events", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("shows all 3 events on initial load", () => {
    cy.get("article").should("have.length", 3);
  });

  it("filters events by title", () => {
    cy.get('input[placeholder*="Buscar"]').type("Workshop");
    cy.get("article").should("have.length", 1);
    cy.get("article").should("contain.text", "Workshop de React e TypeScript");
  });

  it("filters events by city name", () => {
    cy.get('input[placeholder*="Buscar"]').type("Campinas");
    cy.get("article").should("have.length", 1);
    cy.get("article").should("contain.text", "Feira de Produtos Orgânicos");
  });

  it("shows empty state when no events match", () => {
    cy.get('input[placeholder*="Buscar"]').type("xyznonexistent");
    cy.get("article").should("have.length", 0);
    cy.contains("Nenhum evento encontrado").should("be.visible");
  });

  it("shows all events again after clearing search", () => {
    cy.get('input[placeholder*="Buscar"]').type("Workshop");
    cy.get("article").should("have.length", 1);
    cy.get('input[placeholder*="Buscar"]').clear();
    cy.get("article").should("have.length", 3);
  });
});
