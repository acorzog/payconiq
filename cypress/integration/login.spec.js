import {
  loginSelectors,
  productsPageSelectors,
  navigationSelectors
} from '../selectors/testPage';

context('Login with different users', () => {
  describe('login with standard user', () => {
    before(() => {
      cy.visit('/');
      Cypress.on('uncaught:exception', (err, runnable) => {
        return false
      })
    });

    it('Validate Login UI is visible', () => {
      cy.get(loginSelectors.logo).should('be.visible');
      cy.get(loginSelectors.form).should('be.visible');
      cy.get(loginSelectors.botImage).should('be.visible');
    });

    it('Login succesfully', () => {
      const USERNAME = 'standard_user';
      const PASSWORD = 'secret_sauce';

      cy.get(loginSelectors.username).type(USERNAME);
      cy.get(loginSelectors.password).type(PASSWORD);
      cy.get(loginSelectors.loginBtn).click();
      cy.url().should('include', '/inventory.html');
    });
    it('validate invntory page is displayed', () => {
      cy.url().should('include', '/inventory.html');
      cy.get(productsPageSelectors.inventoryItem).should('have.length', '6');
      cy.get(navigationSelectors.shoppingCart).should('be.visible');
    });
  });

  describe('login with locked out user', () => {
    before(() => {
      cy.visit('https://www.saucedemo.com');
    });

    it('Validate Login UI is visible', () => {
      cy.get(loginSelectors.logo).should('be.visible');
      cy.get(loginSelectors.form).should('be.visible');
      cy.get(loginSelectors.botImage).should('be.visible');
    });

    it('Login unsuccessfully', () => {
      const USERNAME = 'locked_out_user';
      const PASSWORD = 'secret_sauce';

      cy.get(loginSelectors.username).type(USERNAME);
      cy.get(loginSelectors.password).type(PASSWORD);
      cy.get(loginSelectors.loginBtn).click();
    });
    it('Validate error message when login', () => {
      const errorMessage =
        'Epic sadface: Sorry, this user has been locked out.';

      cy.get(loginSelectors.errorMessageWrapper).invoke(
        'css',
        'backgroud-color',
        'rgb(226, 35, 26)'
      );
      cy.get(loginSelectors.errorMessage).invoke('text').as('errorMessageText');
      cy.get('@errorMessageText').should('contain', errorMessage);
    });
  });
});
