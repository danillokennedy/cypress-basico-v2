//AULA01 - Exercicio 1
/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {  
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')  
    })

    //AULA02 - Exercicio 1 extra
    it('preenche os campos obrigatórios e envia o formulário', function() { //it.only - executar apenas este teste
        const textolongo = 'teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste'
        cy.get('#firstName').type('Danillo')
        cy.get('#lastName').type('Teste')
        cy.get('#email').type('danillo@teste.com')
        cy.get('#open-text-area').type(textolongo,{delay: 0})
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
        //cy.get('[data-top="121"]').should('be.equal','Mensagem enviada com sucesso.')
    })

    //Exercicio 2 extra
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('#firstName').type('Danillo')
        cy.get('#lastName').type('Teste')
        cy.get('#email').type('danillo@teste,com')
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })
    
    //Exercicio 3 extra
    it('Validando campo telefone inserindo um valor não-numerico se continuará vazio', function() {
        cy.get('#phone')
            .type('haksdhfjkashf')        
            .should('have.value', '')
    })

    //Exercicio 4 extra
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName').type('Danillo')
        cy.get('#lastName').type('Teste')
        cy.get('#email').type('danillo@teste.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    //Exercicio 5 extra
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName')
            .type('Danillo')
            .should('have.value','Danillo')
            .clear()
            .should('have.value','')
        cy.get('#lastName')
            .type('Teste')
            .should('have.value','Teste')
            .clear()
            .should('have.value','')
        cy.get('#email')
            .type('danillo@teste.com')
            .should('have.value','danillo@teste.com')
            .clear()
            .should('have.value','')
        cy.get('#phone')
            .type('922334455')
            .should('have.value','922334455')
            .clear()
            .should('have.value','')
    })
    
    //Exercicio 6 extra
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    //Exercicio 7 extra - Comandos customizados
    it('envia o formuário com sucesso usando um comando customizado', function() {
        cy.InserirCamposObrigatorioseEnvie()
        cy.get('.success').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function() {
        cy.InserirCamposObrigatorioseEnvieComParametro('Kennedy','Oliveira','oliveira@teste.com','Qaulquer Texto')
        cy.get('.success').should('be.visible')
    })

    //Exercicio 8 extra - Exercicio alterar o .get para .contains parar clicar o botão

    //AULA03 - Exxercicio 1
    it('seleciona um produto (YouTube) por seu texto', function() {
        cy.get('#product') //Seleciona o elemento do tipo Select
            .select('YouTube') //Seleciona o texto da opção
            .should('have.value', 'youtube')
    })

    //Exercicio 1 extra
    it('seleciona um produto (Mentoria) por seu valor (value)', function() {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })

    //Exercicio 2 extra
    it('seleciona um produto (Blog) por seu índice', function() {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })

    //AULA04 - Exercicio
    it('marca o tipo de atendimento "Feedback"', function() {
        cy.get('input[type="radio"][value="feedback"]')
            .click()
            .should('have.value', 'feedback')
    })

    //Exercicio extra
    it('marca cada tipo de atendimento', function() {
        cy.get('input[type="radio"]')
            .should('have.length',3)
            .each(function($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('have.checked')
            })
    })

    //AULA05 - Exercicio
    it('marca ambos checkboxes, depois desmarca o último', function() {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })
    
    //AULA06 - Exercicio
    it('seleciona um arquivo da pasta fixtures', function() {
        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json')
            .should(function($input) {
                console.log($input)
                expect($input[0].files[0].name).to.equal('example.json')
            })

    })

    //Exercicio extra 1
    it('seleciona um arquivo simulando um drag-and-drop', function() {
        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })

    })

    //Exerciocio extra 2
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('@sampleFile', {action: 'drag-drop'})
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })

    })

    //AULA07 Exercicio
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    //Exercicio extra 1
    it('acessa a página da política de privacidade removendo o target e então clicanco no link', function() {
        cy.get('#privacy a')
        .invoke( 'removeAttr', 'target')
        .should('not.have.attr', 'target', '_blank')
        .click()
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT - Política de privacidade')
        cy.contains('Talking About Testing').should('be.visible')
    })

    //exercicio extra 2 - desafio - Em boas praticas, como é outra pagina, cria-se outro arquivo de teste no Interation
    it('testa a página da política de privavidade de forma independente', function() {
        const Texto = 'Não salvamos dados submetidos no formulário da aplicação CAC TAT. Utilzamos as tecnologias HTML, CSS e JavaScript, para simular uma aplicação real. No entanto, a aplicação é um exemplo, sem qualquer persistência de dados, e usada para fins de ensino. Talking About Testing'
       
        cy.visit('./src/privacy.html')
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT - Política de privacidade')
        cy.contains('#white-background', Texto).should('be.visible')

    })

  })