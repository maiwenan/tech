/// <reference types="cypress" />
import Tpl from '../../../library/template/index'

function renderUser(userTpl) {
  const data = {
    users: [{
      name: 'bob',
      url: 'bobUrl'
    }, {
      name: 'alice',
      url: 'aliceUrl'
    }]
  }

  cy.get('#user').then(el => {
    el.html(Tpl(userTpl)(data))
  })
}

describe('/library/template/index.simple Test', () => {
  beforeEach(() => {
    cy.visit('/library/template/demo/index.html')
  })

  it('simple template', () => {
    cy.get('li').should('have.length', 2)
    cy.get('a').eq(0).should('have.attr', 'href', 'bobUrl')
  })

  it('render with line terminators', () => {
    const userTpl = `
    <%for ( var i = 0; i < users.length; i++ ) { %>
      <li>
        <a href="<%=users[i].url%>">
          <%=users[i].name%>
        </a>
        <span>test \n 换行符</span>
        <span>test \r 回车符</span>
        <span>test \u2028 行分隔符</span>
        <span>test \u2029 段落分隔符</span>
      </li>
    <% } %>
    `

    renderUser(userTpl)
    cy.get('li').should('have.length', 2)
    cy.get('a').eq(0).should('have.attr', 'href', 'bobUrl')
  })

  it('render with special char', () => {
    const userTpl = `
    <%for ( var i = 0; i < users.length; i++ ) { %>
      <li>
        <a href="<%=users[i].url%>">
          <%=users[i].name%>
        </a>
        <span>test \123 </span>
        <span>test 'content' </span>
      </li>
    <% } %>
    `

    renderUser(userTpl)
    cy.get('li').should('have.length', 2)
    cy.get('a').eq(0).should('have.attr', 'href', 'bobUrl')
  })

  it('render with undefined placeholder', () => {
    const userTpl = `
    <%for ( var i = 0; i < users.length; i++ ) { %>
      <li>
        <a href="<%=users[i].url%>">
          <%=users[i].name%>
        </a>
        <span><%=users[i].xxx%></span>
      </li>
    <% } %>
    `

    renderUser(userTpl)
    cy.get('li').should('have.length', 2)
    cy.get('span').eq(0).should('have.text', '')
  })
})
