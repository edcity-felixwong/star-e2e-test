// interface Cypress {
//   env(key: string): any;
// }
declare global {
  namespace Cypress {
    interface Cypress {
      env(key: "username"): string;
      env(key: "password"): string;
    }
  }
}
export {};
