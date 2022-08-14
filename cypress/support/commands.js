Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('John')
    cy.get('#lastName').type('Winchester')
    cy.get('#email').type('jw@email.com')
    cy.get('#open-text-area').type("Test", {delay:30})
    cy.get('.button[type="submit"]').click()

    
}) 

