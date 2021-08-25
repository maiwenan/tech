/// <reference types="cypress" />

describe('/util/throttle Test', () => {
  beforeEach(() => {
    cy.visit('/util/throttle/demo/index.html')
  })

  it('throttle default action', () => {
    cy.get('#app').should('have.text', '0')
    cy.get('#container').trigger('mousemove')
    cy.get('#app').should('have.text', '1')
    cy.get('#container').trigger('mousemove')
    cy.get('#container').trigger('mouseleave')
    cy.wait(1000)
    cy.get('#app').should('have.text', '2')
  })

  it('throttle with leading=false', () => {
    cy.get('#leading').uncheck()
    cy.get('#container').trigger('mousemove')
    cy.get('#app').should('have.text', '0')
    cy.get('#container').trigger('mousemove')
    cy.get('#container').trigger('mouseleave')
    cy.wait(1000)
    cy.get('#app').should('have.text', '1')
  })

  it('debounce with trailing=false', () => {
    cy.get('#trailing').uncheck()
    cy.get('#container').trigger('mousemove')
    cy.get('#app').should('have.text', '1')
    cy.get('#container').trigger('mousemove')
    cy.get('#container').trigger('mouseleave')
    cy.wait(1000)
    cy.get('#app').should('have.text', '1')
  })

  it('debounce with cancel', () => {
    cy.get('#container').trigger('mousemove')
    cy.get('#app').should('have.text', '1')
    cy.get('#container').trigger('mousemove')
    cy.get('#container').trigger('mouseleave')
    cy.get('#cancel').click()
    cy.wait(1000)
    cy.get('#app').should('have.text', '1')
  })
})
