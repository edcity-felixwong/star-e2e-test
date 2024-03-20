/// <reference types="cypress" />

type LoginFn = (username: string, password: string) => void;

/**
 * lower level login function for different platform
 */
function _login(loginUrl: string, options?: Cypress.SessionOptions): LoginFn {
  return (username: string, password: string) => {
    if (!username) throw new Error("Please enter a username");
    if (!password) throw new Error("Please enter a password");
    cy.session(
      [username],
      () => {
        /** Append the cookie `TGC` for CAS */
        cy.request(loginUrl).then((res) => {
          if (!res.isOkStatusCode) {
            cy.log("Can't retrieve login page");
            return;
          }
          const dom = new DOMParser().parseFromString(
            res.body as string,
            "text/html"
          );
          cy.wrap(dom)
            .find("input[name=execution]")
            .invoke("attr", "value")
            .then((_) => {
              if (!_) {
                cy.log(
                  "The `execution` attribute isn't found, something may changed."
                );
                return;
              }
              /** Literally all hidden form <input>, plus `password` */
              const _loginForm = new FormData();
              _loginForm.append("lt", "");
              _loginForm.append("execution", _);
              _loginForm.append("_eventId", "submit");
              _loginForm.append("username", username);
              _loginForm.append("password", password);
              cy.request({
                method: "POST",
                url: loginUrl,
                headers: {
                  "content-type": "multipart/form-data",
                },
                body: _loginForm,
              });
            });
        });
        /** GET this url to redirect but I don't know why */
        cy.request(loginUrl);
        cy.getAllCookies();
      },
      { ...options }
    );
  };
}

export const oqbLogin: LoginFn = _login(
  "https://wapps1.hkedcity.net/cas/login?service=https%3A%2F%2Fwapps1.hkedcity.net%2Fcas%2Foauth2.0%2FcallbackAuthorize%3Fclient_id%3DOqb%26redirect_uri%3Dhttps%253A%252F%252Foqb.hkedcity.net%252F%26response_type%3Dcode%26state%3Db8ddb983f74779d8813e91ad30c7fa96%26client_name%3DCasOAuthClient",
  {
    validate: () => {
      cy.request("https://oqb.hkedcity.net/")
        .its("body")
        .should("include", "Online Question Bank");
    },
  }
);
export const starLogin: LoginFn = _login(
  "https://wapps1.hkedcity.net/cas/login?service=https://e.star.hkedcity.net/",
  {
    validate: () => {
      cy.request("https://e.star.hkedcity.net/jwt.php")
        .its("body")
        .then((_) => _.result)
        .should("not.equal", null);
    },
  }
);
