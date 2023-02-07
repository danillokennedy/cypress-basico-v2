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
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//Exemplos acima

Cypress.Commands.add('InserirCamposObrigatorioseEnvie', function() {
    cy.get('#firstName').type('Danillo')
    cy.get('#lastName').type('Teste')
    cy.get('#email').type('danillo@teste.com')
    cy.get('#open-text-area').type('textolongo',{delay: 0})
    cy.get('Button[type="submit"]').click()
})


Cypress.Commands.add('InserirCamposObrigatorioseEnvieComParametro', function(nome,sobrenome,email,texto) {
    cy.get('#firstName').type(nome)
    cy.get('#lastName').type(sobrenome)
    cy.get('#email').type(email)
    cy.get('#open-text-area').type(texto,{delay: 0})
    cy.get('Button[type="submit"]').click()
})
