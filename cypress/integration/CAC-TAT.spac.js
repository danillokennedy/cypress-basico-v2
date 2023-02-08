//AULA01 - Exercicio 1
/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    const TRES_SEGUNDOS_EM_MS = 3000
    beforeEach(function() {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {  
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')  
    })

    //AULA02 - Exercicio 1 extra
    it('preenche os campos obrigatórios e envia o formulário', function() { //it.only - executar apenas este teste
        const textolongo = Cypress._.repeat('1234567890',20)
        cy.clock()
        cy.get('#firstName').type('Danillo')
        cy.get('#lastName').type('Teste')
        cy.get('#email').type('danillo@teste.com')
        cy.get('#open-text-area').type(textolongo,{delay: 0})
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible').and('contain', 'Mensagem enviada com sucesso.')
        cy.tick(TRES_SEGUNDOS_EM_MS)
        cy.get('.success').should('not.be.visible')
    })

    //Exercicio 2 extra
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.clock()
        cy.get('#firstName').type('Danillo')
        cy.get('#lastName').type('Teste')
        cy.get('#email').type('danillo@teste,com')
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
        cy.tick(TRES_SEGUNDOS_EM_MS)
        cy.get('.error').should('not.be.visible')
    })
    
    //Exercicio 3 extra
    it('Validando campo telefone inserindo um valor não-numerico se continuará vazio', function() {
        cy.get('#phone')
            .type('haksdhfjkashf')        
            .should('have.value', '')
    })

    //Exercicio 4 extra
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.clock()
        cy.get('#firstName').type('Danillo')
        cy.get('#lastName').type('Teste')
        cy.get('#email').type('danillo@teste.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
        cy.tick(TRES_SEGUNDOS_EM_MS)
        cy.get('.error').should('not.be.visible')
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
        cy.clock()
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
        cy.tick(TRES_SEGUNDOS_EM_MS)
        cy.get('.error').should('not.be.visible')
    })

    //Exercicio 7 extra - Comandos customizados
    it('envia o formuário com sucesso usando um comando customizado', function() {
        cy.clock()
        cy.InserirCamposObrigatorioseEnvie()
        cy.get('.success').should('be.visible')
        cy.tick(TRES_SEGUNDOS_EM_MS)
        cy.get('.success').should('not.be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function() {
        cy.clock()
        cy.InserirCamposObrigatorioseEnvieComParametro('Kennedy','Oliveira','oliveira@teste.com','Qaulquer Texto')
        cy.get('.success').should('be.visible')
        cy.tick(TRES_SEGUNDOS_EM_MS)
        cy.get('.success').should('not.be.visible')
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
    //Cypress._.times(5, function() { 
        it('marca cada tipo de atendimento', function() {
            cy.clock()
            cy.get('input[type="radio"]')
                .should('have.length',3)
                .each(function($radio) {
                    cy.wrap($radio).check()
                    cy.wrap($radio).should('have.checked')
                    cy.InserirCamposObrigatorioseEnvie()
                    cy.get('.success').should('be.visible')
                    cy.tick(TRES_SEGUNDOS_EM_MS)
                    cy.get('.success').should('not.be.visible')
                })
        })
    //})

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

    //AULA11
    //Exercicio - Complementar testes anteriores com o .clock() e .tick()
    //Exercicio extra 1 - Complementar testes anteriores com Cypress._.times e Cypress._.repeat
    //Ecercicio extra 2
    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke()', function() {
        cy.get('.success')
            .should('not.be.visible')
            .invoke('show') //Para exibir o elemento visivel
            .should('be.visible')
            .and('contain', 'Mensagem enviada com sucesso.')
            .invoke('hide') //Para esconder o elemento visivel
            .should('not.be.visible')
        cy.get('.error')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Valide os campos obrigatórios!')
            .invoke('hide')
            .should('not.be.visible')
    })

    //Exercicio estra 3
    it('preenche a area de texto usando o comando invoke', function() {
        const text = Cypress._.repeat("1234567890", 20)
        
        cy.get('#open-text-area')
            .should('not.have.value')
            //.type(text, {delay: 0}) // Em comparação com o invoke, ele é mais rapido que delay - 0,27s vs 0,07s
            .invoke('val', text)
            .should('have.value', text)
    })

    //Exercicio extra 4
    it('faz uma requisição HTTP', function() {
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
            .should(function(resposta){
                console.log(resposta)
                const {status, statusText, body} = resposta
                expect(status).to.equal(200)
                expect(statusText).to.equal('OK')
                expect(body).to.include('CAC TAT')
            })
    })
    
    //Desafio - Encontre o gato - AULA12
    it.only("Desafio Encontre o gato", function() {
        cy.get('#cat')
            .invoke('show')
            .should('be.visible')
            .and('contain', '🐈')
        cy.get('#title')
            .invoke('text', 'CAT TAT')
        cy.get('#subtitle')
            .invoke('text', 'Eu encontrei o GATO!! 🐈')
    })

  })