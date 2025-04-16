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

Cypress.Commands.add('PreencheFOrmulario' , () => {

    cy.get('#firstName').type('paulo')
    cy.get('#lastName').type('pinheiro')
    cy.get('#email').type('fredysoh@gmail.com')
    cy.get('#open-text-area').type('teste')
    cy.get('button[type="submit"]').click()
    

})
//Cypress.Commands.add('PreencheFOrmulario2' , (data) formato original para puxar o data
Cypress.Commands.add('PreencheFOrmulario2' , (data ={  //esse formato faz com que caso não use a const data  os campos serão preenchidos automaticamente com os valores abaixo.
    
    firstName : 'j',
    lastName  : 'jj',
    email     : 'fred@gmail.com',
    text      : 'olá tudo bem'
}) => {

    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('#open-text-area').type(data.text)
    cy.get('button[type="submit"]').click()
    

})