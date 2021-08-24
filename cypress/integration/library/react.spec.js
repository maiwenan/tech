/// <reference types="cypress" />

describe('/library/react.js Test', () => {
  beforeEach(() => {
    cy.visit('/library/react/demo/index.html')
  })

  it('test render', () => {
    cy.get('h1').should('have.text', 'Count: 1')
  })

  it('test update render', () => {
    cy.get('h1').click()
    cy.get('h1').should('have.text', 'Count: 2')
  })
})
