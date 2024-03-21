const _stagingSession = () => {
  cy.request(
    `https://${Cypress.env("stagingModeUsername")}:${Cypress.env(
      "stagingModePassword"
    )}@www.hkedcity.net/version/?action=set&project=OQB`
  ).then(() => {
    cy.getCookie("secret_oqb")
      .should("have.property", "value", "captainhero")
      .log("^^^ validation");
  });
};
const toStaging = () => {
  return cy.session(["staging", `staging-${Cypress.env("staging")}`], () => {
    cy.oqbLogin(Cypress.env("username"), Cypress.env("password")).then(() => {
      if (Cypress.env("staging")) {
        _stagingSession();
      }
    });
  });
};

const changeToChinese = () => {
  cy.contains("中")?.click();
};
const toCreatePaperPage = () => {
  cy.contains("新增評估").click();
  cy.waitForNetworkIdle("/api/get_usable_packages", 1500);
};
describe("", () => {
  beforeEach(() => {
    toStaging();
    cy.visit("https://oqb.hkedcity.net/");
    changeToChinese();
  });
  it("The originally existed custom group should stay.", () => {
    const EXISTED_GROUP_NAME = "gp-me-from-prd";
    toCreatePaperPage();
    // cy.get("button").contains("管理群組").click();
    cy.get(".tree-arrow").each((_) => _.trigger("click"));
    cy.contains(EXISTED_GROUP_NAME).should("exist");
  });
});
