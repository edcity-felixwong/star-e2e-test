// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";
import "cypress-network-idle";

// Alternatively you can use CommonJS syntax:
// require('./commands')

import { oqbLogin, starLogin, starDevLogin } from "./login";

declare global {
  namespace Cypress {
    interface Chainable {
      oqbLogin: typeof oqbLogin;
      starLogin: typeof starLogin;
      starDevLogin: typeof starDevLogin;
    }
  }
}
Cypress.Commands.add("oqbLogin", oqbLogin);
Cypress.Commands.add("starLogin", starLogin);
Cypress.Commands.add("starDevLogin", starDevLogin);
