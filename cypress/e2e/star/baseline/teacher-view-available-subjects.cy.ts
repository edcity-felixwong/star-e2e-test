describe("", () => {
  beforeEach(() => {
    cy.starLogin(Cypress.env("username"), Cypress.env("password"));
    cy.visit("https://e.star.hkedcity.net");
  });
  it("FT-003: teacher - View Available Subjects", () => {
    cy.get('[data-package_code="star_chi"]').should("exist");
    cy.get('[data-package_code="star_eng"]').should("exist");
    cy.get('[data-package_code="star_math_zh"]').should("exist");
    cy.get('[data-package_code="star_math_en"]').should("exist");
  });
  [
    '[data-package_code="star_chi"]',
    '[data-package_code="star_eng"]',
    '[data-package_code="star_math_zh"]',
    '[data-package_code="star_math_en"]',
  ].forEach((s) => {
    it(`FT-004: teacher - Create New Paper ${s}`, () => {
      cy.get(s).click();
      cy.get(".jaqp_plist_add").click();
      cy.get(".modal-dialog").should("exist");
    });
  });
});
