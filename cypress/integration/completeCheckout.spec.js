import {
  productsPageSelectors,
  checkoutPageSelectors,
  form,
  checkoutOverview,
  navigationSelectors,
  checkoutCompleted
} from '../selectors/testPage';

const USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';

describe('Complete Checkout and validate completition response', () => {
  before(() => {
    cy.login(USERNAME, PASSWORD);
    addItem();
    addItem();
    cy.get(navigationSelectors.shoppingCart).scrollIntoView().click();
    cy.get(checkoutPageSelectors.goToCheckout).click();
    fillForm('Andrea', 'Corzo', '111111');
    cy.get(form.submitBtn).click();
  });

  it('Validate checkout information items added should sum the same value of Item Total', () => {
    let itemTotalArray = [];
    let itemTotalValue = 0;

    cy.url().should('include', '/checkout-step-two.html');

    cy.get(checkoutOverview.itemTotal)
      .invoke('text')
      .then((price) => {
        const splitPriceTotal = parseFloat(price.replace('Item total: $', ''));
        itemTotalValue = splitPriceTotal;
      });
    cy.get(checkoutPageSelectors.cartItem)
      .each((card) => {
        cy.wrap(card)
          .find(checkoutPageSelectors.cartItemPrice)
          .invoke('text')
          .then((price) => {
            const splitPrice = parseFloat(price.replace(/\$/g, ''));
            itemTotalArray.push(splitPrice);
          });
      })
      .then(() => {
        expect(itemTotalValue).to.be.eq(itemTotalArray.reduce((p, c) => p + c));
      });
    cy.get(checkoutOverview.finishBtn).click();
  });

  it('Validate Checkout Somplete Status', () => {
    cy.get(navigationSelectors.headerTitle).should(
      'include.text',
      'Checkout: Complete!'
    );
    cy.get(checkoutCompleted.thankYouMessage).should(
      'include.text',
      'THANK YOU FOR YOUR ORDER'
    );
    cy.get(checkoutCompleted.completeText).should(
      'include.text',
      'Your order has been dispatched, and will arrive just as fast as the pony can get there!'
    );
    cy.get(checkoutCompleted.image).should('be.visible');
    cy.get(checkoutCompleted.backHome)
      .should('include.text', 'Back Home')
      .and('be.enabled')
      .click();
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

function fillForm(FirstName, LastName, ZipCode) {
  cy.get(form.firstName).type(FirstName);
  cy.get(form.lastName).type(LastName);
  cy.get(form.postalCode).type(ZipCode);
}
