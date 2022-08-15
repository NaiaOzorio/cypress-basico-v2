/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(() => cy.visit('./src/index.html'))


    Cypress._.times(3, () => {
        it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
     })
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
        const longText='Test, test, test, test, test, test, test, test, test'

        cy.clock()

        cy.get('#firstName').type('John')
        cy.get('#lastName').type('Winchester')
        cy.get('#email').type('jw@email.com')
        cy.get('#open-text-area').type(longText, {delay:50})
        cy.get('.button[type="submit"]').click()

        cy.get('.success').should('be.visible')

        cy.tick(3000)

        cy.get('.success').should('not.be.visible')
    }) 

 
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('#firstName').type('John')
        cy.get('#lastName').type('Winchester')
        cy.get('#email').type('jwemail.com', {delay:50})
        cy.get('.button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('valida o campo numerico do telefone', function() {
        cy.get('#phone')
        .type('abc')
        .should('be.empty') 
    })

    it('exibe msg de erro quando o tel se torna obrigatório mas não é preenchido antes do envio do form', function() {
        cy.get('#phone-checkbox').check()
        cy.get('.button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName').type('John').should('have.value','John').clear().should('have.value','')
        cy.get('#lastName').type('Winchester').should('have.value','Winchester').clear().should('have.value','')
        cy.get('#email').type('jw@email.com', {delay:50}).should('have.value','jw@email.com').clear().should('have.value','')
        cy.get('#phone').type ('111111111').should('have.value','111111111').clear().should('have.value','')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.get('.button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    }) 

    it('comando customizado para envia o formuário', function(){
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })

    it('clica no botao submit com a funcao cy.contain', function() {
        cy.get('#firstName').type('John')
        cy.get('#lastName').type('Winchester')
        cy.get('#email').type('jw@email.com')
        cy.get('#open-text-area').type("Test", {delay:50})
        cy.contains('button', 'Enviar').click()
    })

    it('seleciona um produto (YouTube) por seu texto', function() {
        cy.get('#product')
          .select('YouTube')
          .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function() {
        cy.get('#product')
          .select('mentoria')
          .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function() {
        cy.get('#product')
          .select(1)
          .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function() {
        cy.get('input [type="radio"][value="feedback"]')
        .check()
    
    })

    it('marca cada tipo de atendimento', function() {
        cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio) {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    
    })
    it('marca ambos checkboxes, depois desmarca o último', function() {
        cy.get('input[type="checkbox"]')
        .should('have.length', 2)
        .each(function($checkbox) {
            cy.wrap($checkbox).check()
            cy.wrap($checkbox).should('be.checked')
        })
        cy.get('input[type="checkbox"]').last().uncheck()
        .should('not.be.checked')
    })
    
    it('seleciona um arquivo da pasta fixtures', function() {
        cy.get('input[type="file"]')
         .should('not.have.value')
         .selectFile('./cypress/fixtures/example.json')
    })

    it('seleciona um arquivo simulando um drag-and-drop', function() {
        cy.get('input[type="file"]')
         .should('not.have.value')
         .selectFile('./cypress/fixtures/example.json', {action:'drag-drop'})
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
         .selectFile('@sampleFile')
    })
    
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('a[href="privacy.html"]')
         .should('have.attr','target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicanco no link', function(){
        cy.get('a[href="privacy.html"]')
         .invoke('removeAttr', 'target')
         .click()
        
         cy.contains('CAC TAT - Política de privacidade').should('be.visible')
    })

    it('testa a página da política de privacidade de forma independente', function(){
        cy.get('a[href="privacy.html"]')
         .invoke('removeAttr', 'target')
         .click()

         cy.contains('CAC TAT - Política de privacidade').should('be.visible')
    })

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', function() {
        cy.get('.success')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Mensagem enviada com sucesso.')
          .invoke('hide')
          .should('not.be.visible')
        cy.get('.error')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Valide os campos obrigatórios!')
          .invoke('hide')
          .should('not.be.visible')
      })
     
    it.only('preenche a area de texto usando o comando invoke', function () {
        const longText = Cypress._.repeat('0123456789', 20)

    cy.get('#open-text-area')
      .invoke('val', longText) //val = valor dentro do open text area e inclui a var longtext// 
      .should('have.value', longText)

    })

})