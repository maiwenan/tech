/// <reference types="cypress" />

describe('/util/debounce.js Test', () => {
  beforeEach(() => {
    cy.visit('/util/debounce/demo/index.html')
  })

  it('debounce default action', () => {
    cy.get('#add').click().click()
    cy.get('#app').should('have.text', '0')
    cy.wait(3000)
    cy.get('#app').should('have.text', '1')
  })

  it('debounce with immediate', () => {
    cy.get('#toggle').check()
    cy.get('#add').click()
    cy.get('#app').should('have.text', '1')
    cy.get('#add').click()
    cy.get('#app').should('have.text', '1')
    cy.wait(3000)
    cy.get('#add').click()
    cy.get('#app').should('have.text', '2')
  })

  it('debounce with cancel', () => {
    cy.get('#add').click()
    cy.get('#app').should('have.text', '0')
    cy.get('#cancel').click()
    cy.wait(3000)
    cy.get('#app').should('have.text', '0')
  })
})
