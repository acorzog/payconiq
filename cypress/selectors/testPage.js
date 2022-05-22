export const navigationSelectors = {
    header: '.header_secondary_container',
    headerTitle: '.title',
    shoppingCart: '.shopping_cart_link',
    shoppingCartBadge: '.shopping_cart_badge',
}

export const loginSelectors = {
    logo: '.login_logo',
    form: '#login_button_container',
    botImage: '.bot_column',
    username: '[data-test="username"]',
    password: '[data-test="password"]',
    loginBtn: '[data-test="login-button"]',
    errorMessageWrapper: '.error-message-container',
    errorMessage: '[data-test="error"]',
    closeErrorMessage: '.error-button',
}
export const productsPageSelectors = {
    inventoryItem: '.inventory_item',
    addToCart: '.btn_inventory',
    removeFromCart: '[data-test="remove-sauce-labs-bike-light"]',
    getPrice: '.inventory_item_price',
    sortSelector: '[data-test="product_sort_container"]',
}
export const checkoutPageSelectors = {

    cartItem: '.cart_item',
    cartQuantity: '.cart_quantity',
    cartItemName: '.inventory_item_name',
    cartItemPrice: 'div > .inventory_item_price',
    removeBtn: '.btn_secondary.btn_small.cart_button',
    goToCheckout: '[data-test="checkout"]',
}
export const form = {
    firstName: '[data-test="firstName"]',
    lastName: '[data-test="lastName"]',
    postalCode: '[data-test="postalCode"]',
    submitBtn: '[data-test="continue"]',
}
export const checkoutOverview = {
    itemTotal: '.summary_subtotal_label',
    finishBtn: '[data-test="finish"]',
}
export const checkoutCompleted = {
    confirmationContainer: '.checkout_complete_container',
    thankYouMessage: '.complete-header',
    completeText: '.complete-text',
    image: '.pony_express',
    backHome: '[data-test="back-to-products"]',
}