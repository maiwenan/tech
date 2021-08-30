/// <reference types="cypress" />

describe('/library/template/index.simple Test', () => {
  beforeEach(() => {
    cy.visit('/library/template/demo/index.html')
  })

  it('simple template', () => {
    cy.get('li').should('have.length', 2)
    cy.get('a').eq(0).should('have.attr', 'href', 'bobUrl')
  })
})
