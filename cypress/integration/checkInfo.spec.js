import {
  productsPageSelectors,
  checkoutPageSelectors,
  form,
  navigationSelectors
} from '../selectors/testPage';

const USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';

describe('Validate Checkout products and fill user information for an Standard User', () => {
  before(() => {
    cy.login(USERNAME, PASSWORD);
    addItem();
    addItem();
    cy.get(navigationSelectors.shoppingCart).scrollIntoView().click();
  });

  it('Go to Checkout Page', () => {
    const itemsAdded = 2;
    cy.url().should('include', '/cart.html');
    cy.get(navigationSelectors.header)
      .find(navigationSelectors.headerTitle)
      .should('contain', 'Your Cart');
    cy.get(checkoutPageSelectors.cartItem).should('have.length', itemsAdded);
    validateItemsInfo(itemsAdded);
    cy.get(checkoutPageSelectors.goToCheckout).click();
  });

  it('should fill user information', () => {
    // fill form to continue the checkout
    cy.url().should('include', '/checkout-step-one.html');
    cy.get('.title')
      .should('be.visible')
      .and('contain', 'Checkout: Your Information');
    cy.get('.checkout_info_wrapper').should('be.visible');
    fillForm('Andrea', 'Corzo', '111111');
  });
});

function addItem() {
  let randomItemSelection = productsPageSelectors.addToCart;
  cy.get(randomItemSelection)
    .should('include.text', 'Add to cart')
    .its('length')
    .then((elementCount) => {
      let selected = Cypress._.random(elementCount - 1);
      cy.get(randomItemSelection).eq(selected).click();
    });
}
function validateItemsInfo(n) {
  for (let i = 0; i < n; i++) {
    cy.get(checkoutPageSelectors.cartItem)
      .eq(i)
      .should('be.visible')
      .within(() => {
        cy.get(checkoutPageSelectors.cartItemName).should('be.visible');
        cy.get(checkoutPageSelectors.cartItemPrice).should('be.visible');
        cy.get(checkoutPageSelectors.removeBtn)
          .should('be.visible')
          .and('be.enabled');
      });
  }
}
function fillForm(FirstName, LastName, ZipCode) {
  cy.get(form.firstName).type(FirstName);
  cy.get(form.lastName).type(LastName);
  cy.get(form.postalCode).type(ZipCode);
}
