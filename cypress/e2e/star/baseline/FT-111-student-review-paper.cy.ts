const toChinese = () =>
  cy.get('[data-sui-test="locale-zh"]').then((_) => _.trigger("click"));
describe("", { testIsolation: false }, () => {
  beforeEach(() => {
    if (Cypress.env("starDev")) {
      cy.starDevLogin(Cypress.env("username"), Cypress.env("password"));
      cy.visit("http://localhost:3000");
    } else {
      cy.starLogin(Cypress.env("username"), Cypress.env("password"));
      cy.visit("https://estar.edcity.hk");
    }
    toChinese();
    cy.window().then((w) => cy.stub(w, "open").as("open"));
    cy.waitForNetworkIdle("/load", 1500);
  });
  it("FT111", () => {
    cy.contains("閱卷").click();
    cy.get("@open").should("be.called");
    cy.get("@open").should("be.calledWithMatch", "/home/start");
    // cy.get("@open").should("be.calledWithMatch", (_) => {
    //   cy.request(_)
    //     .then((_) => _.body)
    //     .then((_) => {
    //       return new DOMParser().parseFromString(_, "text/html");
    //     })
    //     .then((_) => cy.wrap(_));
    // });
  });

  it("FT110", () => {
    cy.contains("報告").click();
    cy.get("@open").should("be.called");
    cy.get("@open").should("be.calledWithMatch", "/report");
  });

  it("FT109", () => {
    cy.contains("進行評估").click();
    cy.get("@open").should("be.called");
    cy.get("@open").should("be.calledWithMatch", "/home/start");
    cy.get("@open").its("");
  });
});
