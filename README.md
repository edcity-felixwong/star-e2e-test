# End2End tests for 23/03/2024

To start:
```bash
npm install
```
To use GUI:
```bash
npm run cypress:open
```
Run on headless:
```bash
npm run cypress:run
```

create a `cypress.env.json` to put your testing `username` and `password`:
```json
{
    "username": "<username>",
    "password": "<password>"
}
```
## Create new test
Create new test inside `cypress/e2e/...`,  
use `cy.starLogin()` or `cy.oqbLogin()` for specific test you needed.
