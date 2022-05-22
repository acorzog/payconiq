import {
  productsPageSelectors,
  navigationSelectors
} from '../selectors/testPage';

const USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';

describe('Sort and add products to cart for an Standard User', () => {
  before(() => {
    cy.login(USERNAME, PASSWORD);
  });

  it('Sort by price Low to High', () => {
    cy.url().should('include', '/inventory.html');
    cy.get(productsPageSelectors.sortSelector)
      .should('be.visible')
      .select('lohi');
    cy.get(productsPageSelectors.getPrice).then(($prices) => {
      const innerText = (el) => el.innerText;
      const firstWord = (text) => text.split(' ')[0];
      const justDigits = (str) => str.replace(/[^0-9.]/g, '');
      const prices = Cypress._.map($prices, (el) =>
        parseFloat(justDigits(firstWord(innerText(el))))
      );
      // confirm the "prices" array is already sorted
      const sorted = Cypress._.sortBy(prices);
      expect(sorted).to.deep.equal(prices);
      return prices;
    });
  });

  it('add products to cart', () => {
    cy.url().should('include', '/inventory.html');
    cy.get(productsPageSelectors.inventoryItem).should('have.length', '6');
    cy.get(navigationSelectors.shoppingCart).should('be.visible');
    addItem();
    addItem();
    cy.get(navigationSelectors.shoppingCartBadge)
      .scrollIntoView()
      .should('include.text', '2');
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
