/// <reference types="cypress" />

import "cypress-localstorage-commands"
import { loginSelectors } from '../selectors/testPage'
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//

Cypress.Commands.add('login', (username, password) => {
  cy.visit('https://www.saucedemo.com')
  cy.get(loginSelectors.username).type(username)
  cy.get(loginSelectors.password).type(password)
  cy.get(loginSelectors.loginBtn).click()
})

Cypress.Commands.add('getSessionStorage', (key) => {
  cy.window().then((window) => window.sessionStorage.getItem(key))
})

Cypress.Commands.add('setSessionStorage', (key, value) => {
  cy.window().then((window) => {
    window.sessionStorage.setItem(key, value)
  })
})