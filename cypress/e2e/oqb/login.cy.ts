describe("", () => {
  beforeEach(() => {
    cy.oqbLogin(Cypress.env("username"), Cypress.env("password"));
    cy.visit("https://oqb.hkedcity.net/");
  });
  it("visit /", () => {
    cy.get(".navbar-brand").should("exist");
  });
});
